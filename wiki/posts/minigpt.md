---
type: post
slug: minigpt
title: "MiniGPT (Part 1)"
date: "2026-10-05"
part: 1
builds_on: [minigpt-grown, minigpt2, minigpt3, minigpt4, minigpt5]
topics: [large-language-models, transformer-architecture, attention-mechanisms, hyperparameter-tuning]
tools: [PyTorch, MiniGPT, llama.cpp]
status: current
checked: "2026-11-05"
source_hash: "79f4f1849ea8"
generated_by: gemma4:12b
---

**Summary.** I take apart a trained MiniGPT model to show how it generates text one letter at a time. I trace the logic through Jibin Joseph's notebook code to explain how internal components like the MLP and attention work.

## What I did
- I explained the mechanics of the 'wheel of chances' used to select the next letter.
- I walked through the code of the `generate_text` loop.
- I analyzed the internal layers including the MLP and attention heads.
- I provided the trained model weights for others to run.

## Claims
- The model predicts the next character by assigning a score to each possible letter.
  > "Before the model can draw the wheel, it gives each of the 65 letters in its vocabulary a *score*: a plain number for how likely that letter is to come next."
- The temperature setting changes the distribution of the chances before the model picks a letter.
  > "A setting called *temperature* changes how big every slice is compared with the others."
- The top_k setting trims the list of possible letters to a specific number.
  > "In Jibin Joseph's notebook, the writing loop, `generate_text`, takes `top_k` as a setting, with a default of 200."
- The MLP provides the model with specific knowledge like correct spelling.
  > "After `thoug`, `h` gets 99.4%: knowing that *thoug* ends in `h` is just the kind of spelling knowledge the MLP holds."
- Attention allows the model to focus on previous positions to determine the next character.
  > "Query × key gives −2.19, 15.60, and −3.62, and the shares are 4.0%, 92.9%, and 3.1%: almost all of the attention goes one position back."
- The model's weights are fixed after training and cannot change during inference.
  > "Other things are fixed when the model is built, and they cannot change without training it again."

## Outcome
I built a transparent look into the inner workings of a GPT model. I demonstrated how specific mathematical operations result in coherent text generation.

## Caveats
The model only predicts the next piece of text and does not possess external capabilities like checking the weather or running programs.
