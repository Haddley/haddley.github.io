---
type: post
slug: sklearn16
title: "Scikit-Learn (Part 16)"
date: "2026-10-13"
part: 16
builds_on: [sklearn15, minigpt-grown, sklearn14, sklearn17]
topics: [natural-language-processing, attention-mechanisms, transformer-architecture, sentiment-analysis, machine-translation]
tools: [Scikit-Learn, Keras, TensorFlow, Hugging Face, Python]
status: current
checked: "2026-11-06"
source_hash: "464c2d440b33"
generated_by: gemma4:12b
---

**Summary.** I explore natural language processing using recurrent networks and the attention mechanism. I demonstrate how attention improves translation and sentiment analysis while introducing the Transformer architecture and pretrained models from Hugging Face.

## What I did
- I built a Shakespeare character model using a gated recurrent unit.
- I trained a sentiment analysis model to classify movie reviews.
- I developed a translation model to convert English into Spanish.
- I implemented a Transformer model using positional encodings.
- I explored pretrained models and the Hugging Face library.

## Claims
- A small fix to the padding mask improved the sentiment model score from 50.0% to 87.5%.
  > "Telling the layer to ignore the padding, with `mask_zero=True`, took the same model to 87.5% at best."
- The translation model with attention outperformed the model without it.
  > "And a translation model that could look back at every English word beat one that could not, 61.9% to 52.9% of Spanish words right."
- The Shakespeare model produced mostly nonsense because it only achieved 54.3% accuracy.
  > "The Shakespeare model got 54.3% of the next letters right and wrote mostly nonsense."
- Pretrained models can reflect the biases of their training data.
  > "The notebook shows this on purpose, as a warning: the same sentence frame got POSITIVE with a score of 0.990 for India, and NEGATIVE with a score of 0.981 for Iraq."
- The Transformer uses positional encodings to maintain word order since it lacks a recurrent memory.
  > "The notebook adds a pattern of sine and cosine waves to each word, different for each position, so that word order is in the numbers."
- The translation results I reported are from shortened training runs.
  > "The translation results above come from the shortened runs, and the book's are better."

## Outcome
I built several models to demonstrate the transition from recurrent networks to attention-based architectures. I concluded that attention is a superior way to handle long-range dependencies in text.

## Caveats
The translation results I reported are from shortened training runs, so the book's results are better.
