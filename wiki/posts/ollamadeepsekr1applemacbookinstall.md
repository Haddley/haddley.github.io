---
type: post
slug: ollamadeepsekr1applemacbookinstall
title: "DeepSeek R1"
date: "2025-05-24"
builds_on: []
topics: [local-llms, model-benchmarking, deepseek-r1, hardware-optimization]
tools: [DeepSeek-R1, M2 MacBook Air, M4 MacBook Air, M1 Max Mac Studio]
status: current
checked: "2026-11-06"
source_hash: "e3ea3ea6b4e4"
generated_by: gemma4:12b
---

**Summary.** I tested the DeepSeek-R1 model across various hardware configurations to evaluate local performance. I found that larger models provide superior reasoning but require more time and memory.

## What I did
- I installed the DeepSeek-R1 model.
- I tested the 7B, 14B, 32B, and 70B variants.
- I measured generation times on different Mac hardware.
- I categorized each model size by its ideal use case.

## Claims
- The 7B model is suitable for general-purpose chatbots and content moderation.
  > "**7B Model:** Suited for general-purpose chatbots, content moderation, and mid-tier automation."
- The 14B model serves as an effective tool for enterprise-grade applications.
  > "**14B Model:** Suited for enterprise-grade applications such as advanced chatbots, research tools, and code assistants."
- The 32B model is ideal for tasks where accuracy is more important than speed.
  > "**32B Model:** Suited for applications prioritising accuracy over speed, such as advanced research or long-form content."
- The 70B model is best for advanced reasoning and long-context processing.
  > "**70B Model:** Suited for advanced reasoning, multilingual understanding, and long-context processing."
- The 7B variant produced output in 25 seconds on an M2 MacBook Air.
  > "The 7 billion parameter variant generated output in approximately 25 seconds on my M2 MacBook Air with 16 GB of unified memory."
- The 70B variant produced output in 1 minute and 28 seconds on an M1 Max Mac Studio.
  > "The 70 billion parameter variant generated output in approximately 1 minute 28 seconds on my M1 Max Mac Studio with 64 GB of unified memory."

## Outcome
I established a performance baseline for DeepSeek-R1 on local Mac hardware. I determined which model sizes best suit specific use cases based on speed and capability.

## Caveats
The post does not provide data on the performance of the 1.5B model.
