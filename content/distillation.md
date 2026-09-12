---
title: "Distillation"
part: 1
description: "Building a small language model from scratch using nothing but a larger model's answers — response-level distillation, why it is different from the logit-level kind, and what Phi-3, Alpaca, and (allegedly) DeepSeek have in common"
date: "2026-09-12"
categories: ["AI"]
image: "/assets/images/distillation/posts-meta.svg"
tags: "gpt, mlx, knowledge-distillation, qwen, machine-learning"
hidden: true
slug: "distillation"
---

[MiniGPT Part 5](/posts/minigpt5/) built distillation the "textbook" way: cache a teacher's full probability distribution over its vocabulary at every position, and train a student to match that whole distribution with a KL-divergence loss. That technique has a hard requirement most people asking about "distillation" do not realise: it needs the teacher's own weights, running locally, so you can read its logits. It cannot touch GPT-4, Claude, or any other model you only get to call.

Almost every well-known "distilled" model was not built that way. Alpaca, Self-Instruct, WizardLM, Orca, Microsoft's Phi series, and — per a widely reported but never fully confirmed accusation — possibly DeepSeek, all used a technique that needs nothing but a teacher's *output text*. This post builds one from scratch to show exactly how it differs, and what a from-scratch model can and cannot learn from it.

## Hard-label vs. soft-label distillation

![](assets/images/distillation/hard-vs-soft-label.svg)
*Same idea — a small model learning from a large one — two different training signals, with two different hardware requirements.*

**Soft-label (logit) distillation**, the kind already built on this blog, trains the student to reproduce the teacher's *whole probability distribution* over the next token — not just the token the teacher would pick, but how confident it was in every alternative. The loss is KL divergence, and matching a whole distribution requires having that distribution to match, which means running the teacher yourself.

**Hard-label (response) distillation** — this series — is much cruder and much more widely used in practice. Ask the teacher a question, keep only the one answer it actually wrote, and train the student on that text with ordinary cross-entropy, the same loss every model in every series on this blog has used for plain next-token prediction. The teacher's uncertainty, its second-best guesses, everything except the words it actually output, is thrown away. All you need is the text — which means it works identically whether the teacher is a model you downloaded or an API you called ten thousand times.

The name "distillation" covers both, and the ambiguity is not just pedantic. It is the entire reason the DeepSeek accusation and the Phi series' methodology can both be called "distillation" while being, legally and technically, completely different situations: Microsoft has a direct licence to GPT-4o's outputs for exactly this purpose; the accusation against DeepSeek is that it harvested OpenAI's outputs without one. Response-level distillation is the technique in both cases — what differs is permission, not mechanism.

## Why build one from scratch

Every guide to this technique — including the one that prompted this series — assumes you start with an already-pretrained model and fine-tune it. That skips the most interesting question this blog's whole approach is built around: what does a model with *no* prior training actually learn from nothing but a few thousand of a teacher's answers? No raw-text pretraining stage, no borrowed base model — a random initialisation, trained purely on (prompt, teacher-response) pairs.

This is a real risk, not just a framing device. Learning basic fluency from a random initialisation is normally not cheap: the [TinyStories paper](https://arxiv.org/abs/2305.07759) that inspired the MiniGPT series used a training corpus of several hundred million tokens even for its smallest models, precisely because a model with no prior exposure to language needs a lot of raw text before it reliably strings a sentence together. This experiment's entire training set, as built below, is only a few million tokens of nothing but short Q&A pairs — two orders of magnitude short of that, with no broader raw-text exposure to fall back on. Whether that is enough to learn basic English at all, before it even gets to answering questions well, is genuinely open, and the point of writing this as I go.

## Choosing a teacher

Response-level distillation's whole appeal is that it works with any teacher you can call — including closed, paid APIs, which is how Alpaca (text-davinci-003), Orca and WizardLM (GPT-4), and Phi-3/4 (GPT-4o) were actually built. I used a free, local, open-weight teacher instead, [`Qwen2.5-32B-Instruct`](https://huggingface.co/Qwen/Qwen2.5-32B-Instruct) (4-bit, via [mlx-community](https://huggingface.co/mlx-community/Qwen2.5-32B-Instruct-4bit)), to keep this series' pattern of zero-dollar experiments running entirely on this Mac Studio.

Generation throughput matters much more here than it did for logit caching, because every example needs the teacher to actually *write* a full answer, token by token, not just score one. I benchmarked `mlx-lm`'s batched generation at a few batch sizes before committing to a multi-hour run:

| Batch | Aggregate tok/s | Wall-clock per prompt |
|---|---|---|
| 16 | 41.9 | 6.5s |
| **32** | **87.3** | **3.4s** |
| 64 | 74.3 | 4.0s |
| 96 | 64.6 | 4.6s |

Throughput peaks at batch 32 and gets *worse* beyond it — a batch has to wait for its slowest response to finish, and response lengths vary enough that larger batches spend more time idle. Batch 32 generating 8,000 examples comes to roughly 7.6 hours.

## Building the dataset

I needed a diverse set of prompts, not diverse answers — the answers all come fresh from the teacher above. [Alpaca's 52k instructions](https://huggingface.co/datasets/tatsu-lab/alpaca) are free, well-covered across task types, and exactly the kind of ready-made prompt diversity Self-Instruct-style bootstrapping is designed to produce from scratch — so I used Alpaca's instructions and discarded its original answers entirely (those were written by text-davinci-003 in 2023; every answer in this dataset is regenerated by Qwen2.5-32B-Instruct today).

I sampled 8,000 instructions, deduplicated, capped at 400 characters so the teacher's context stays short and generation stays fast, and ran all 8,000 through the teacher at batch 32.

## Sizing the tokenizer to the data

8,000 short answers is on the order of a few million tokens. Dividing that by GPT-2's 50,257-token vocabulary — already used elsewhere on this blog, and the obvious default to reach for — means most tokens would appear only a handful of times across the entire training run, nowhere near enough for their embedding rows to learn anything.

Instead I trained a small byte-level BPE — 8,192 tokens, the same size MiniGPT Part 2 used for TinyStories — directly on the generated (prompt, response) text, with three special tokens marking turn structure: `<|user|>`, `<|assistant|>`, and `<|endoftext|>`.

## Masking the loss to the response

Each example is tokenised as:

```
<|user|> {prompt} <|assistant|> {response} <|endoftext|>
```

concatenated back to back into one long stream, the same way GPT-2 itself concatenates documents separated by `<|endoftext|>`. But unlike every previous model on this blog, the loss here is *masked*: cross-entropy is computed only over the response and its closing `<|endoftext|>`, never over the prompt or the turn markers. The model is being trained to answer well, not to get better at predicting questions it did not write.

```python
def masked_loss(model, x, y, m):
    logits = model(x)
    ce = nn.losses.cross_entropy(logits.reshape(-1, logits.shape[-1]), y.reshape(-1), reduction="none")
    m = m.reshape(-1)
    return (ce * m).sum() / mx.maximum(m.sum(), 1.0)
```

This is the technical heart of instruction tuning, response-level distillation, and ordinary supervised fine-tuning alike — they are all this same masked cross-entropy loss, differing only in whose answers the model is being shown.

---

*Training is running now — a from-scratch model, sized to this much smaller corpus, learning from nothing but the masked (prompt, response) stream above. The next section covers what came out.*
