---
type: post
slug: mlx1
title: "MLX 1"
date: "2025-11-06"
builds_on: []
topics: [mlx-framework, apple-silicon, model-quantization, llm-fine-tuning]
tools: [MLX, Claude, Ollama, llama.cpp, Python]
status: current
checked: "2026-11-05"
source_hash: "ae01701e0c2f"
generated_by: gemma4:12b
---

**Summary.** I explore how to use the MLX framework to run and fine-tune large language models on Apple Silicon. I demonstrate the process of fusing models and converting them for use with Ollama.

## What I did
- I utilized the MLX array framework for machine learning research.
- I prompted Claude to fuse the model and add it to ollama.
- I executed the fuse command to create the fused model.
- I converted the fused model to GGUF format.
- I added the final model to the ollama library.

## Claims
- MLX is a framework designed for Apple silicon.
  > "MLX is an array framework designed for efficient and flexible machine learning research on Apple silicon."
- I used Claude to determine the fusion and integration steps.
  > "*I prompted Claude to fuse the model and add it to ollama*"
- I used a specific python command to fuse the model.
  > "*I ran python -m mlx_lm fuse to create the fused model*"
- I converted the model to GGUF format for compatibility.
  > "*I ran convert_hf_to_gguf.py to convert the fused model to GGUF format*"

## Outcome
I built a workflow to fuse and convert MLX models for use in Ollama. I demonstrated how to optimize large language models for Apple hardware.

## Caveats
The post does not detail the specific hardware specifications of the Mac used for the fine-tuning process.
