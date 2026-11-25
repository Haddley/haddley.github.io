---
title: "LLM Benchmarking"
part: 2
description: "I gave 282 accounting exam questions to fifteen models, from a 3B model on my Mac to hosted DeepSeek, and worked out what to run, what to skip, and which settings matter."
date: "2026-11-13"
categories: ["AI", "Python"]
image: "/assets/images/llmbenchmark2/poster.svg"
tags: "benchmarking, evaluation, ollama, deepseek, accounting, qwen"
hidden: true
slug: "llmbenchmark2"
---
In [LLM Benchmarking](/posts/llmbenchmark/) I had AI generate a set of 30 questions with answers, so that a few lines of code could mark them. This post runs the same idea on something bigger: 282 multiple-choice questions from a professional accounting exam, answered by fifteen models. Thirteen ran on my own Mac and two were hosted by DeepSeek.

:::brain-power Before you read the answer
Two guesses, before I tell you. Would you expect a model with more parameters to get more of these questions right? Would you expect a model that is allowed to think to do better than one that must answer at once? Make a guess for each, then read on.
:::

I wanted to know what to run, so the answer comes first.

:::bullet-points The short answer
- **If I can use a hosted model, use `deepseek-flash`.** It got 97% to 98% right, finished the 282 questions in 15 minutes, and cost about 15 cents. `deepseek-v4-pro` scored about the same and cost about a dollar.
- **If it has to run on my Mac, use Qwen3.8 27B.** It got 94.0% right. If memory is short, Qwen3 14B got 86%, which matched a model five times its size.
- **Let the model think.** Asking for a reasoning step before the answer added 10 to 25 points for most models.
- **Give a thinking model a large token allowance.** Raising it gained 3 to 10 right answers for five of the six models where I tried it.
- **Skip the small and the old.** Llama 3.1 8B and Llama 3.2 3B got about half right, and the 70B models were slow and no better than Qwen3 14B.
:::

## How I tested

The questions are the MMLU professional accounting test ([`cais/mmlu`](https://huggingface.co/datasets/cais/mmlu/viewer/professional_accounting), subject `professional_accounting`, test split). Each has four options and one right answer, which the dataset supplies with the question. I call that supplied correct answer the **key**. A letter checker can mark every question against its key.

All the local runs were on one Mac Studio with an Apple M1 Max chip and 64 GB of memory, through [Ollama](https://ollama.com). The two DeepSeek models ran through DeepSeek's API.

Each model answered twice:

- **One letter.** The prompt ends with "Reply with only the letter of the correct option". The model gets no room to work anything out.
- **Brief reasoning.** The prompt ends with "Think it through briefly, then end your reply with a final line in exactly this form: ANSWER: X". The model can reason, and the checker reads the last `ANSWER:` line.

An answer with no clear letter counts as wrong. All runs used temperature 0.

## The results

| Model | Where | Right of 282 | Time for 282 |
|---|---|---|---|
| deepseek-v4-pro | hosted | **97.5% to 98.6%** | 41 min |
| deepseek-flash | hosted | **96.8% to 97.9%** | 15 min |
| Qwen3.8 27B | my Mac | 94.0% | 2 h 9 min |
| QwQ 32B | my Mac | 89.0% | 13 h |
| Qwen3 14B | my Mac | 86.2% | 2 h 45 min |
| Qwen2.5 72B | my Mac | 85.1% | 4 h 45 min |
| Llama 3.3 70B | my Mac | 85.1% | 9 h 25 min |
| Qwen3 8B | my Mac | 83.7% | 2 h 15 min |
| DeepSeek-R1 32B | my Mac | 83.3% | 8 h |
| Qwen2.5 14B | my Mac | 79.4% | 53 min |
| Gemma 3 27B | my Mac | 78.4% | 1 h 45 min |
| gpt-oss 20B | my Mac | 78.4% | 38 min |
| Gemma 3 12B | my Mac | 63.5% | 43 min |
| Llama 3.1 8B | my Mac | 51.4% | 34 min |
| Llama 3.2 3B | my Mac | 46.8% | 14 min |

Chance is 25%. The two hosted models show a range because I ran them twice, and they moved by a few questions. For the models that think in a hidden field (QwQ, Qwen3, DeepSeek-R1 and gpt-oss), the score is after I raised their token allowance, as described below. I also redid the few cut-off answers of the other models with a 4,000-token allowance. That gained one right answer each for Qwen3.8 27B and Llama 3.3 70B and nothing for the small Llamas, which repeat themselves until the allowance runs out. Times are rough: I sometimes ran other jobs on the same machine, and the times do not include the cut-off reruns.

## What the results mean

### Thinking is worth the wait

| Model | One letter | With reasoning | Gain (points) |
|---|---|---|---|
| Qwen3 14B | 61.7% | 86.2% | +24 |
| Qwen3.8 27B | 73.0% | 94.0% | +21 |
| Qwen2.5 14B | 63.1% | 79.4% | +16 |
| Gemma 3 27B | 62.4% | 78.4% | +16 |
| Llama 3.3 70B | 69.9% | 85.1% | +15 |
| Qwen2.5 72B | 70.9% | 85.1% | +14 |
| deepseek-flash | 84.0% | 97% | +13 |
| Gemma 3 12B | 52.8% | 63.5% | +11 |
| Llama 3.2 3B | 41.1% | 46.8% | +6 |
| Llama 3.1 8B | 47.9% | 51.4% | +4 |

The thinking models QwQ, DeepSeek-R1 and gpt-oss could not answer in one letter at all. They spent the few tokens I allowed thinking and returned an empty reply.

Most models gained 10 to 25 points from a short reasoning step, and the tiny Llamas gained little because they had little to reason with. If an application cannot wait for reasoning, choose a newer model before choosing a bigger one: Qwen3.8 27B scored 73% in one letter, more than either 70B model.

### A newer 14B matched an older 72B

Qwen3 14B (86.2%) matched Qwen2.5 72B (85.1%) and used about a fifth of the parameters. (A parameter is one of the numbers a model learned in training; "72B" means 72 billion of them.) It also finished in 2 hours 45 minutes against 4 hours 45 minutes. Llama 3.3 70B matched Qwen2.5 72B at 85.1% and took 9 hours 25 minutes.

Size also cost me on the machine. The 70B and 72B models took about 58 of my 64 GB of memory, which left little for anything else, and my browser reloaded pages while they ran.

The hosted DeepSeek models are probably much larger than anything I ran locally, so the test cannot say how much of their lead is size. They also differ in training and in how much they think.

### The cheap hosted model is enough

`deepseek-flash` and `deepseek-v4-pro` swap places between my runs: flash got 276 right and then 273, and pro got 275, 272 and then 278 once I raised its allowance. I cannot rank them. Flash is cheaper: DeepSeek's price list at the time of writing ([api-docs.deepseek.com](https://api-docs.deepseek.com/quick_start/pricing)) charges $0.30 per million input tokens and $1.20 per million output tokens at peak times for flash, and $1.32 and $3.96 for pro. Pro also wrote about twice as many tokens per answer. By my estimate, all 282 questions cost about 15 cents with flash and about a dollar with pro at peak prices. I worked that out from the token counts and did not read a bill.

### Thinking models need a big allowance

A model that thinks can spend its whole allowance thinking and never write an answer. My first allowances were 1,500 tokens for gpt-oss, 4,000 for Qwen3 and 6,000 for QwQ and DeepSeek-R1. I redid only the cut-off answers with larger ones:

| Model | Allowance before | Allowance after | Right before | Right after |
|---|---|---|---|---|
| deepseek-v4-pro | 8,000 | 32,000 | 272 | 278 |
| QwQ 32B | 6,000 | 16,000 | 244 | 251 |
| Qwen3 8B | 4,000 | 12,000 | 226 | 236 |
| gpt-oss 20B | 1,500 | 8,000 | 214 | 221 |
| Qwen3 14B | 4,000 | 12,000 | 240 | 243 |
| DeepSeek-R1 32B | 6,000 | 16,000 | 235 | 235 |

Five models gained 3 to 10 right answers. DeepSeek-R1 32B gained nothing: all eleven of its cut-off answers ran past 16,000 tokens again. If I were setting this up again, I would start with at least 16,000 tokens for any model that thinks, and count how many replies ended without an answer before I trusted a score.

:::no-dumb-questions
**Q: Should I run the biggest model that fits in memory?**

A: Not on this evidence. The two 70B-class models were slower and scored no better than Qwen3 14B. A model from a newer family was the better use of the memory.

**Q: Is 97% real? Could the test be in the training data?**

A: It could be. MMLU is a public test that has been online for years, and I cannot rule out that a model saw these questions. Read the table as a ranking on this test, not as a promise about your own books.

**Q: What are the 2% to 3% it still gets wrong?**

A: Mostly questions about a specific rule or its exception, in auditing, tax and contract law. [Part 3](/posts/llmbenchmark3/) looks at them.
:::

## What I would do with this

- **For an accounting assistant that handles real questions,** start with `deepseek-flash`, or Qwen3.8 27B if the data cannot leave the machine. Do not rely on the answer alone: ask the model to name the standard or section it used, and check that against the source before acting. In the replies I read, the wrong answers sounded as sure as the right ones.
- **For a cheap first filter,** use Qwen3 14B with reasoning switched on.
- **For an application that must answer in one word,** do not use a small model. The best one-letter score among the local models was 73%.
- **For any model that thinks,** raise the token allowance, and count how many answers ended without a letter.

[Part 3](/posts/llmbenchmark3/) looks at the questions that models get wrong, and whether giving the model the relevant rule helps. [Part 4](/posts/llmbenchmark4/) looks at how far I trust these numbers, including a judge model that marks the thinking.

## References

- [LLM Benchmarking](/posts/llmbenchmark/): part 1, with 30 questions and a checker
- [llm-accounting-benchmark](https://github.com/Haddley/llm-accounting-benchmark): the original project, now with a DeepSeek provider
- [cais/mmlu](https://huggingface.co/datasets/cais/mmlu): the test, `professional_accounting` subject
- The code and every answer file are in [llmbenchmark2](/assets/files/llmbenchmark2/README.md)
