---
type: post
slug: minigpt2
title: "MiniGPT (Part 3)"
date: "2026-10-05"
part: 3
builds_on: [minigpt-grown, minigpt3]
topics: [byte-pair-encoding, tokenization, weight-tying, information-theory]
tools: [tiktoken, tokenizers, Colab, PyTorch, MLX]
status: current
checked: "2026-11-05"
source_hash: "ccbff27b3c88"
generated_by: gemma4:12b
---

**Summary.** I investigate why large language models use byte-pair encoding instead of reading one character at a time. I compare three different tokenizers to show how larger pieces of text improve performance while increasing the size of the model's internal tables.

## What I did
- I compared three different tokenizers on the same machine.
- I implemented a custom byte-pair encoding (BPE) system.
- I calculated a fair score for the models by measuring bits per byte.
- I trained the models on the TinyStories dataset.

## Claims
- The letters tokenizer performs poorly when the score is normalized to the actual length of the text.
  > "But its tokens are single bytes, so 0.7214 ÷ 0.693 × 1.00 = **1.040 bits per byte**, the worst of the three."
- My custom 8,192 piece tokenizer matches the performance of the much larger GPT-2 tokenizer.
  > "**My 8,192 pieces match GPT-2's 50,257.** Bits per byte of 0.697 against 0.700, with under half the numbers (13.9 million against 30.0 million) and in 12.7 minutes against 41.8."
- The large supply of pieces in the GPT-2 tokenizer did not provide any extra benefit on these stories.
  > "GPT-2's huge supply cost a lot of arithmetic and bought nothing on these stories."
- Weight tying allows the model to use one table for both token embeddings and the language model head.
  > "The trick is called *weight tying*."
- The letters tokenizer requires one token for every single character of text.
  > "On the stories I held back for testing, the letters tokeniser needs 1.00 token per *byte* of text (a byte is the computer's unit for one ordinary character, so think of it as one letter), one per letter."
- BPE builds its pieces by gluing the most common neighboring pair repeatedly.
  > "BPE builds its pieces by gluing the most common neighbouring pair, again and again."

## Outcome
I built a system that demonstrates how BPE allows models to process larger chunks of text efficiently. I concluded that my 8,192 piece tokenizer achieves the same results as GPT-2 with significantly fewer parameters.

## Caveats
The study shows that the large supply of pieces in GPT-2 did not provide any benefit on the specific TinyStories dataset.
