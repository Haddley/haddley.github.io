---
title: "MiniGPT"
part: 5
description: "Knowledge-distillation pre-training at toy scale — training a small MiniGPT against a larger model's token probabilities, why the teacher cannot be Qwen3 or Llama, and the finding that a 33M model that knows the domain beats a 1.5B model that does not"
date: "2026-09-10"
categories: ["AI"]
image: "/assets/images/minigpt5/posts-meta.svg"
tags: "knowledge-distillation, llama, logit-distillation, mlx, machine-learning"
hidden: false
slug: "minigpt5"
---

Every model in this series so far has learned the same way: predict the next token, compare to the one-hot truth, take the cross-entropy. Meta's Llama 3.2 1B and 3B were not trained only that way. The [Llama 3.2 announcement](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/) says that "logits from the Llama 3.1 8B and 70B models were used as targets" during pre-training — the small models learned from the full probability distribution the big models put over the vocabulary, not just the single correct token.

The intuition: the one-hot label says "the next word is *cat*". The teacher's distribution says "*cat* 0.6, *dog* 0.2, *kitten* 0.1, *the* 0.001, …" — which also tells the student that *dog* and *kitten* were reasonable and *the* was not. A richer signal per token, and the reason a distilled small model can learn faster than the same model trained from scratch on raw text.

This post does the same thing at a scale that runs on a Mac.

## Why the teacher is not Qwen3, or Llama, or anything current

The obvious idea is to grab the best model you can run — Qwen3-8B, say — and distil from that. It does not work here, for two reasons, and the first is absolute.

**Logit distillation needs the teacher and student to share the exact same tokeniser.** The distillation loss is a KL divergence between the teacher's probability vector over the vocabulary and the student's, compared slot by slot:

```python
kl = (exp(log_softmax(teacher_logits / T)) *
      (log_softmax(teacher_logits / T) - log_softmax(student_logits / T))).sum(-1)
```

For that sum to mean anything, the teacher's entry `i` and the student's entry `i` have to be the *same token*. This student has used the GPT-2 byte-level BPE — 50,257 tokens — since [part 2](/posts/minigpt2/). Qwen3 uses its own tokeniser (~151,000 tokens, different merges, different order); Llama 3 uses a 128,000-token tiktoken; Gemma, Mistral and Phi each have their own. None of their logit vectors line up with this student's. Using one would mean either re-tokenising the whole project with that model's tokeniser and giving the 30M student a 128–150k-row embedding table — larger than the rest of the model, and a redo of parts 2–4 — or doing cross-tokeniser distillation, which matches tokens by their text and projects one probability space onto the other, and is a research area in its own right.

**The teacher runs a forward pass on every training batch, in the same 64 GB.** Even with the tokeniser solved: a frozen Qwen3-8B forward on every step, sharing unified memory with the student, its optimiser state, and two `[batch, 256, vocab]` logit tensors, would dominate the step. As it is, swapping GPT-2 small (124M) for GPT-2 XL (1.5B) stretched the run from 25 minutes to nearly two hours. Qwen3-8B is five times larger again; Qwen3-32B would not fit for training-loop use at all.

So the teacher had to be a model in the **GPT-2 tokeniser family**, small enough to run every step. That family is larger than just GPT-2: GPT-Neo, GPT-J, Cerebras-GPT and the released TinyStories models all use the same 50,257-token vocabulary. Whether any of them is *good enough at the task to teach* is the actual experiment.

## The lineup

- **Student**: the [part 3](/posts/minigpt3/) MiniGPT with the GPT-2 tokeniser — 30M parameters.
- **GPT-2 small (124M)** and **GPT-2 XL (1.5B)** — generalists trained on web text, loaded frozen through `mlx-lm`.
- **`roneneldan/TinyStories-33M`** — the largest model released with the TinyStories paper, trained to convergence on the whole dataset. GPT-Neo architecture, GPT-2 vocabulary. `mlx-lm` has no GPT-Neo loader, so it runs as a frozen Torch teacher and its logits are handed across to the MLX student.
- **MiniGPT-512 (51M)** — a wider MiniGPT I trained here on the same TinyStories slice for 5,000 steps. This is the Llama 3.1→3.2 setup: same family, same data, more capacity.

The loss adds the distillation term to the ordinary cross-entropy:

```python
loss = alpha * cross_entropy(student, next_token)
     + (1 - alpha) * T**2 * KL(softmax(teacher / T) || softmax(student / T))
```

with `alpha = 0.5` and temperature `T = 2`. Everything is scored the same way as the rest of the series — cross-entropy on held-out text, in bits per byte.

## Memory

Both models produce a `[16, 256, 50257]` logit tensor — about 0.8 GB each in float32 — and the teacher runs every step. Peak memory went from 5.4 GB for the plain run to 11 GB with GPT-2 small, and 17 GB with GPT-2 XL. Inside 64 GB, but it is why distillation pre-training runs on clusters at full scale: you are running two models to train one.

## What happened

Five runs, 3,000 iterations each, same student, same data.

![](assets/images/minigpt5/distill-runs.png)
*The five runs. "Teacher bits/byte" is how well each teacher itself does on the held-out split*

![](assets/images/minigpt5/distill-curves.png)
*Validation bits per byte from step 300. The two generalist teachers sit near the no-teacher baseline; the two domain-trained teachers pull the student well below it*

| Teacher | Size | Teacher's own bits/byte | Student's best bits/byte | Minutes |
|---|---|---|---|---|
| none (baseline) | — | — | 0.7555 | 12.8 |
| GPT-2 small | 124M | 0.965 | 0.7469 | 25.1 |
| GPT-2 XL | 1.5B | 0.799 | 0.7382 | 113.9 |
| TinyStories-33M | 33M | **0.467** | 0.7204 | 23.5 |
| MiniGPT-512 (trained here) | 51M | 0.644 | **0.6936** | 20.1 |

**Scaling the generalist barely helped.** GPT-2 XL has twelve times the parameters of GPT-2 small. As a teacher it moved the student from 0.7469 to 0.7382 bits per byte — for four and a half times the training time. And the reason is in the third column: **GPT-2 XL, at 1.5B parameters, is still worse at TinyStories (0.799) than the 30M student trained on it (0.756).** A web-text generalist does not know this domain, and making it bigger does not fix that. A frontier model like Qwen3 would be a better generalist still — but the GPT-2 → GPT-2 XL step says the payoff from generalist scale, on this task, is small, quite apart from the tokeniser wall.

**A domain-trained teacher helped a lot — even a tiny one.** `TinyStories-33M` is *smaller* than the student's transformer, but it read the whole TinyStories corpus to convergence, and it scores 0.467 bits per byte. Distilling from it pulled the student to 0.7204 — past both generalists, in 23 minutes.

**The best teacher was the one built like the student, on the student's own training split.** `MiniGPT-512` scores 0.644 — a *worse* model than `TinyStories-33M` on paper — but distilling from it gave the best student, 0.6936. Two things it has that `TinyStories-33M` does not: the same architecture family as the student, so its probability distribution is a natural target to imitate, and training only on the 90% split, so the held-out set is genuinely held out for it too rather than partly memorised.

The distilled `MiniGPT-512` student also learned faster — it passed the baseline's *final* (step 3,000) loss at around step 1,700, roughly 1.7× sooner, and kept improving. Not the "10× faster" of the big-model literature, which comes from teachers vastly more capable than the student; here, with a teacher about twice the student's effective capacity, it was a 1.7× speed-up and an 8% lower final loss.

The lesson the table makes unavoidable: **distillation is worth the teacher's advantage on your data, not its size.** A 33M model that knows the domain out-taught a 1.5B model that does not.

## Generating text

![](assets/images/minigpt5/generation.png)
*The baseline student and the `MiniGPT-512`-distilled student, same prompt*

The baseline student loses the thread — "he wanted to take his melon home from his eyes", a second character also called Tim, a melon that talks. The distilled student holds a scene: Tim, a friend called Sam, a lost cake, a search, a resolution, and then "the moral of the story is …", the closing formula TinyStories examples use and the baseline never picked up. Both are still small models making small-model mistakes, but the distilled one writes a more coherent story, because it spent 3,000 steps being nudged toward the choices of a model that already could.

## What I took from it

- **You cannot distil from a model with a different tokeniser** without re-tokenising your whole project or doing cross-tokeniser distillation. That rules out every current frontier model as a drop-in teacher — the field of eligible teachers is "models that use your student's exact vocabulary".
- **A bigger generalist is not a better teacher.** GPT-2 XL is 12× GPT-2 small and still worse at the task than the student; distilling from it barely moved the loss and cost hours.
- **A domain-matched teacher is worth it even when it is small.** The two on-domain teachers — one smaller than the student — both beat both generalists.
- **Same architecture, same training split beats a stronger but mismatched teacher.** The best result came from the teacher most like the student.
- **The student stays a small model.** Distillation changed how fast and how well it learned; it did not turn 30M parameters into something they are not.

## Try it yourself

The code is in [github.com/Haddley/minigpt-series](https://github.com/Haddley/minigpt-series) under `part5/`:

```bash
python train_distill.py --tag baseline --teacher none    --alpha 1.0
python train_distill.py --tag gpt2     --teacher gpt2     --alpha 0.5
python train_distill.py --tag gpt2xl   --teacher gpt2-xl  --alpha 0.5
python train_distill.py --tag ts33m    --teacher torch:roneneldan/TinyStories-33M --alpha 0.5
python train_teacher.py --dim 512 --layers 8 --iters 5000
python train_distill.py --tag big      --teacher runs/teacher.safetensors --alpha 0.5
python eval_teacher.py  --teacher gpt2-xl     # each teacher's own bits/byte
python figures.py
```

Requires Apple Silicon; the GPT-2 teachers download from Hugging Face on first run.

[Part 6](/posts/minigpt6/) is the last one: sliding-window attention, to train on a longer context on the same Mac without the attention matrix filling memory.

## References

- [Llama 3.2: revolutionizing edge AI and vision — Meta AI, 2024](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/)
- [The Llama 3 Herd of Models — Meta AI, 2024](https://arxiv.org/abs/2407.21783)
- [Distilling the Knowledge in a Neural Network — Hinton, Vinyals & Dean, 2015](https://arxiv.org/abs/1503.02531)
- [TinyStories: How Small Can Language Models Be and Still Speak Coherent English? — Eldan & Li, 2023](https://arxiv.org/abs/2305.07759)
- [mlx-lm](https://github.com/ml-explore/mlx-lm)
