---
type: post
slug: sklearn19
title: "Scikit-Learn (Part 19)"
date: "2026-10-13"
part: 19
builds_on: [sklearn18, minigpt-grown, sklearn20]
topics: [model-serving, distributed-training, mobile-optimization, api-protocols]
tools: [TensorFlow, Docker, TensorFlow Serving, TensorFlow Lite, gRPC]
status: current
checked: "2026-11-06"
source_hash: "d288fb42e0eb"
generated_by: gemma4:12b
---

**Summary.** I explore how to move a model from a training script to a production environment where other programs can use it. I demonstrate how to serve models using Docker, optimize them for mobile devices, and distribute the training workload across multiple machines.

## What I did
- I served a handwritten-digit classifier using Docker and TensorFlow Serving.
- I tested both REST and gRPC protocols to fetch predictions from the server.
- I converted a model to TensorFlow Lite to reduce its size for mobile use.
- I implemented MirroredStrategy to demonstrate how training scales across devices.

## Claims
- A saved model contains its own description of inputs and outputs so a server can use it without my specific code.
  > "**The lesson:** a saved model is a folder that describes its own inputs and outputs, so a server can use it without any of my code."
- The TensorFlow Lite conversion reduced the model size by about 3.6 times.
  > "Converting for a phone with TensorFlow Lite made the same model about 3.6 times smaller, 171,748 bytes to 47,928."
- The server automatically detects and switches to a new version when a new numbered folder appears.
  > "Each numbered subfolder is a version, and by default the server serves the highest number, so saving `0002` next to `0001` is enough."
- gRPC is faster than REST because it uses a compact binary format but requires a client-side library.
  > "A: REST is simple: any program that can send text to a web address can use it. gRPC is faster, because it sends numbers in a compact binary form, but it needs a library on the client's side."
- Data parallelism distributes the batch across devices while model parallelism splits a large model into pieces.
  > "In data parallelism, each device holds a copy of the model, each takes a share of the batch, and the slopes are averaged before every copy makes the same nudge."
- The training accuracy reached 98.30% on the validation set during the multi-device test.
  > "The weights became `MirroredVariable` objects, special variables that keep copies in step, and the training ran as usual: 10 epochs of about 70 seconds each, ending at 96.35% training accuracy and 98.30% validation accuracy."

## Outcome
I built a system that serves a model via REST and gRPC and demonstrated how to shrink models for mobile devices. I also showed how to scale training across multiple processors using distribution strategies.

## Caveats
I did not run the sections involving Google Cloud, high-performance clusters, or NVIDIA GPUs.
