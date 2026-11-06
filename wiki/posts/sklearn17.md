---
type: post
slug: sklearn17
title: "Scikit-Learn (Part 17)"
date: "2026-10-13"
part: 17
builds_on: [sklearn16, sklearn10, sklearn8, minigpt-grown, sklearn18]
topics: [autoencoders, generative-adversarial-networks, diffusion-models, dimensionality-reduction]
tools: [scikit-learn, TensorFlow, Keras, t-SNE]
status: current
checked: "2026-11-06"
source_hash: "1a5e2a98aed7"
generated_by: gemma4:12b
---

**Summary.** I explore how networks can squeeze data into compact summaries and reconstruct it as new images. I compare autoencoders, generative adversarial networks, and diffusion models to show how different architectures approach the problem of image generation.

## What I did
- I trained autoencoders to compress images into a small number of dimensions.
- I trained a GAN to generate new clothing images by pitting a forger against a detective.
- I trained a diffusion model to create images by removing noise step by step.
- I compared the stability and output quality of these three different methods.

## Claims
- The narrow middle of an autoencoder forces the network to learn a compact summary of the input.
  > "The narrow middle is the point: a network that could pass everything through would learn nothing."
- My first GAN attempt suffered from mode collapse by producing the same shirt shape repeatedly.
  > "In my first run, which I cut to 10 epochs, the plain GAN, built from ordinary layers, produced the same black shirt shape for every one of the 32 random inputs I gave it."
- Diffusion models are more stable than GANs because they learn a simple, fixed task.
  > "A diffusion model avoids that."
- The 30 numbers in the middle of an autoencoder can be used for tasks like finding similar items or as a smaller input for a classifier.
  > "They are a compact description of each picture, and they can be used for other jobs: drawing the clothing pictures in 2D so similar items sit together, finding odd pictures that rebuild badly, or giving a classifier a smaller input."
- A variational autoencoder ensures that random numbers in the middle can produce new, meaningful images.
  > "Afterwards, I can throw away the encoder, draw 10 random numbers, give them to the decoder, and get a new picture."
- Diffusion models have largely replaced GANs in modern image generation.
  > "A: Diffusion models, with larger networks and text prompts added, are behind much of today's image generation, and they have largely replaced GANs."

## Outcome
I built several models that generate clothing images and concluded that while GANs are powerful, diffusion models offer more stability for generating high-quality images.

## Caveats
The notebook uses a small scale of data and networks, so the results do not represent the full scale of modern image generation systems.
