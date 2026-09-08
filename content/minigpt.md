---
title: "MiniGPT"
description: "Running Jibin Joseph's MiniGPT notebook in Colab — rebuilding a GPT-style character-level language model from first principles and reproducing the Tiny Shakespeare results"
date: "2026-09-09"
categories: ["AI"]
image: "/assets/images/minigpt/posts-meta.svg"
tags: "gpt, transformers, pytorch, nanogpt, machine-learning"
hidden: true
slug: "minigpt"
---

I spend most of my time using language models, not building them. So when I found the paper [MiniGPT: Rebuilding GPT from First Principles](https://arxiv.org/pdf/2605.17398) by Jibin Joseph, I wanted to run it myself. MiniGPT is a single Jupyter notebook that reconstructs the whole GPT training pipeline — tokenisation, embeddings, causal self-attention, Transformer blocks, next-token training, validation tracking, checkpoint selection, and text generation — in plain PyTorch. It does not introduce a new architecture. It makes an existing one legible.

The paper is explicit about its lineage: the author studied Andrej Karpathy's [nanoGPT](https://github.com/karpathy/nanoGPT) and then wrote the model and training code independently in one notebook. That matched how I like to learn a system, so I opened the notebook in Google Colab and worked through it top to bottom.

## Opening the notebook

The repository is [github.com/jibin10/MiniGPT](https://github.com/jibin10/MiniGPT). The README gives three steps: click the "Open in Colab" badge, select a GPU runtime, and run the cells from top to bottom. Local setup is a `pip install -r requirements.txt` away — the only dependencies are `torch`, `matplotlib`, and `requests` — but the notebook is designed to run in Colab with no local setup at all.

![](assets/images/minigpt/colab-open.png)
*I opened MiniGPT_Notebook.ipynb from the repository using the Open in Colab badge*

![](assets/images/minigpt/gpu-runtime.png)
*I switched the runtime to GPU under Runtime → Change runtime type — the paper's timings were measured on a Colab A100*

## The dataset

MiniGPT trains on Tiny Shakespeare, the ~1 MB concatenation of Shakespeare's plays that Karpathy used for his original char-rnn examples. The notebook downloads the raw text, then builds a character-level tokeniser: every unique character becomes one token, which gives a vocabulary of exactly 65 symbols. Two dictionaries map characters to integer IDs and back. There is no external tokeniser and nothing to train.

```python
chars = sorted(set(text))
vocab_size = len(chars)            # 65
stoi = {c: i for i, c in enumerate(chars)}
itos = {i: c for i, c in enumerate(chars)}
encode = lambda s: [stoi[c] for c in s]
decode = lambda ids: "".join(itos[i] for i in ids)

data = torch.tensor(encode(text), dtype=torch.long)
n = int(0.9 * len(data))
train_data, val_data = data[:n], data[n:]   # 90 / 10 split
```

Character-level tokenisation keeps the preprocessing trivial to inspect. The cost, which the paper is careful to name, is that the model has to learn spelling, word boundaries, and punctuation from individual characters, and every sequence covers fewer words than a subword tokeniser would.

![](assets/images/minigpt/tiny-shakespeare.png)
*The notebook printed the vocabulary, the 65-character token set, and the train/validation split*

## Batches

Each training example is a fixed-length block of characters. The input is a window of `block_size` tokens; the target is the same window shifted one position to the right, so at every position the model predicts the next character.

```python
def get_batch(split):
    d = train_data if split == "train" else val_data
    ix = torch.randint(len(d) - block_size, (batch_size,))
    x = torch.stack([d[i : i + block_size] for i in ix])
    y = torch.stack([d[i + 1 : i + block_size + 1] for i in ix])
    return x.to(device), y.to(device)
```

If the input is `hell`, the target is `ello`. That shift is the whole of autoregressive language modelling.

## The architecture, one piece at a time

The high-level shape is the standard decoder-only stack:

```
Token IDs → Token Embedding + Positional Embedding → Transformer Block × L → Final LayerNorm → Linear LM Head
```

**Embeddings.** A token embedding table turns each of the 65 IDs into a learned vector. A separate learned positional embedding is added so the model can tell where each token sits in the window — self-attention on its own has no sense of order.

**Causal self-attention.** For each position the model computes query, key, and value vectors, splits them across several heads, and computes scaled dot-product attention. Because the model is autoregressive, a lower-triangular mask sets every future position to `-∞` before the softmax, so a token can only attend to itself and the tokens before it.

```python
att = (q @ k.transpose(-2, -1)) / math.sqrt(head_dim)
att = att.masked_fill(mask[:T, :T] == 0, float("-inf"))
att = F.softmax(att, dim=-1)
out = att @ v
```

**Transformer block.** Each block is attention and a feed-forward MLP, each wrapped in a residual connection, with layer normalisation applied *before* each sub-module — the pre-LayerNorm arrangement that tends to train more stably as depth grows:

```python
x = x + self.attn(self.ln1(x))
x = x + self.mlp(self.ln2(x))
```

**MLP.** `Linear(d, 4d) → GELU → Linear(4d, d) → Dropout`. The four-times expansion is the usual Transformer ratio; dropout matters here because Tiny Shakespeare is small enough to overfit quickly.

**Head and loss.** After a final LayerNorm, a linear head maps each hidden state to 65 logits. When targets are supplied, the notebook flattens the logits to `(B·T, V)` and the targets to `(B·T)` and takes the cross-entropy — one next-character prediction for every position in every sequence.

In the larger configuration the token embedding matrix and the output head share weights. With a vocabulary of 65 and an embedding dimension of 384 that tie saves 65 × 384 = 24,960 parameters, and weight tying is known to help language models in some settings.

## Baseline run — verifying the pipeline

The first configuration is deliberately tiny, just enough to prove the training and validation loops work.

| Setting | Baseline |
|---|---|
| Layers / heads / embedding dim | 4 / 4 / 128 |
| Context length | 128 |
| Parameters | 826,433 |
| Batch size | 32 |
| Optimiser | AdamW, fixed learning rate 3 × 10⁻⁴ |
| Iterations | 3,000 |
| Checkpoint | final step |

Both losses start near 4.20 — which is roughly `ln(65)`, exactly what you expect from a model guessing uniformly across 65 characters. They then fall steadily.

![](assets/images/minigpt/baseline-training-log.png)
*The baseline training log — loss estimated on both splits every few hundred steps*

![](assets/images/minigpt/baseline-loss.png)
*Figure 1 from the paper reproduced in the notebook: training and validation loss both falling to roughly 1.53 and 1.72 by step 3,000, with no clear overfitting*

By step 3,000 the baseline reached a training loss of **1.5304** and a validation loss of **1.7236**, a validation perplexity of about **5.60**. The whole run took **50.79 seconds** on the A100. Nothing about the output is good Shakespeare yet, but every part of the pipeline is now known to work.

## Stronger run — capacity, schedule, and checkpoint selection

The second configuration is close to nanoGPT's small Shakespeare setup.

| Setting | Stronger |
|---|---|
| Layers / heads / embedding dim | 6 / 6 / 384 |
| Context length | 256 |
| Parameters | 10.77M |
| Batch size | 64 |
| Dropout | 0.2 |
| Optimiser | AdamW, betas (0.9, 0.99), weight decay 0.1 on 2‑D tensors only |
| Learning rate | 100 warmup steps to 10⁻³, cosine decay to 10⁻⁴ over 5,000 steps |
| Also | gradient clipping at 1.0, mixed precision on CUDA, weight tying |
| Checkpoint | best validation loss |

The notebook splits parameters into two groups — 38 decayed tensors (the weight matrices) and 63 non-decayed (biases and LayerNorm terms) — so weight decay only touches the matrices.

Validation loss starts at 4.2879 and drops fast. The best checkpoint is **1.4780 at step 1,750** (perplexity about **4.38**), where training loss is 1.0990. The full run took **4.76 minutes**.

![](assets/images/minigpt/stronger-loss.png)
*Figure 2 from the paper: validation loss bottoms out at step 1,750, then rises while training loss keeps falling — textbook overfitting*

What happens after step 1,750 is the most useful part of the experiment. Training loss keeps falling — down to 0.6105 by step 5,000 — but validation loss climbs back to 1.7055, no better than the tiny baseline. The model is memorising the training text rather than learning to generalise. The final step is not the best model. This is why the stronger configuration selects its checkpoint by lowest validation loss, and it is a lesson that scales all the way up.

## Generating text

Generation is autoregressive: feed in a prompt, predict the next character, sample from the distribution, append it, repeat. The notebook uses the best stronger checkpoint with `max_new_tokens=800`, `temperature=0.8`, and `top_k=200`.

```python
@torch.no_grad()
def generate(idx, max_new_tokens, temperature=0.8, top_k=200):
    for _ in range(max_new_tokens):
        idx_cond = idx[:, -block_size:]
        logits = model(idx_cond)[:, -1, :] / temperature
        v, _ = torch.topk(logits, top_k)
        logits[logits < v[:, [-1]]] = float("-inf")
        probs = F.softmax(logits, dim=-1)
        idx = torch.cat([idx, torch.multinomial(probs, 1)], dim=1)
    return idx
```

Prompted with `ROMEO:`, the paper's checkpoint produced this (shortened):

```
ROMEO:
Nay, fie, I'll plead it, I have the indeed,
Go to the deed! I think it was a back!
BRUTUS:
So did let us continue them home.
SICINIUS:
Only, brawling not
The common 'twixt him, where enter'd his eyes...
```

It is not coherent, but the shape is unmistakable: speaker names in capitals, colons, line breaks, verse-like line lengths, plausible Shakespearean vocabulary. A character-level model with no notion of a "word" has picked all of that up from 1 MB of text in under five minutes.

![](assets/images/minigpt/generation-romeo.png)
*I generated 800 characters from the "ROMEO:" prompt using the best checkpoint*

Temperature changes the character of the output. The paper reports that at 0.7 the samples are steadier and more readable but repeat themselves; at 1.2 they are more varied but full of broken spellings and invented names. I saw the same thing.

![](assets/images/minigpt/generation-temperature.png)
*The same prompt at temperature 0.7 and 1.2 — stability against variety*

## What I took from it

Running MiniGPT end to end took an afternoon and cost nothing. A few things stuck with me:

- **The pieces are small.** Causal attention is a matrix multiply, a mask, a softmax, and another matrix multiply. The block is two residual adds. The training objective is a shifted copy and a cross-entropy. Seeing them written out plainly, with no distributed-training machinery around them, made the architecture feel much less mysterious.
- **Overfitting is not an edge case.** The stronger model's best validation loss arrived at step 1,750 out of 5,000. Without validation-based checkpoint selection the notebook would have shipped a worse model that scored well on its own training text.
- **Character-level is a genuine trade-off.** It removes the tokeniser entirely, which is great for a teaching notebook, but a 256-character context is only a few dozen words, and the model pays for it in long-range coherence.
- **Scale is doing the heavy lifting elsewhere.** MiniGPT is honest that it is a reproducibility study, not a competitive model. The same training idea, with far more data, compute, and parameters, is what produces the models I use every day.

The value of a paper like this is not a benchmark number. It is that the path from raw text to generated samples is now something I have run rather than something I have read about.

## Try it yourself

- The paper: [MiniGPT: Rebuilding GPT from First Principles](https://arxiv.org/pdf/2605.17398) (arXiv:2605.17398)
- The notebook: [github.com/jibin10/MiniGPT](https://github.com/jibin10/MiniGPT) — open `MiniGPT_Notebook.ipynb` in Colab, choose a GPU runtime, and run every cell

## References

- [MiniGPT: Rebuilding GPT from First Principles — Jibin Joseph, 2026](https://arxiv.org/abs/2605.17398)
- [nanoGPT — Andrej Karpathy](https://github.com/karpathy/nanoGPT)
- [minGPT — Andrej Karpathy](https://github.com/karpathy/minGPT)
- [char-rnn and the Tiny Shakespeare dataset — Andrej Karpathy](https://github.com/karpathy/char-rnn)
- [Attention Is All You Need — Vaswani et al., 2017](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models — Kaplan et al., 2020](https://arxiv.org/abs/2001.08361)
- [The Curious Case of Neural Text Degeneration — Holtzman et al., 2020](https://arxiv.org/abs/1904.09751)
