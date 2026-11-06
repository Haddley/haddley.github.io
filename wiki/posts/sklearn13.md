---
type: post
slug: sklearn13
title: "Scikit-Learn (Part 13)"
date: "2026-10-13"
part: 13
builds_on: [sklearn12, sklearn10, sklearn2, sklearn4, minigpt-grown]
topics: [data-pipelines, feature-engineering, batch-processing, preprocessing-layers]
tools: [TensorFlow, Keras, tf.data, TFRecord, NumPy]
status: current
checked: "2026-11-06"
source_hash: "afe28fecb233"
generated_by: gemma4:12b
---

**Summary.** I explain how to use the tf.data pipeline to handle large datasets that do not fit in memory. I also show how to use Keras layers to transform raw data into numbers as part of the model architecture.

## What I did
- I built a tf.data pipeline to read, shuffle, and batch data from multiple files.
- I implemented Keras layers to convert raw features like city names into numbers.
- I demonstrated how to use the TFRecord format for binary data storage.
- I showed how to use prefetch to improve training speed on GPUs.

## Claims
- A training loop only requires a stream of batches to function.
  > "**The lesson:** a training loop only needs a stream of batches."
- The model achieved a typical error of about $65,000 on unseen districts.
  > "The small network from Part 10 trained on data read this way, in batches of 32, and ended with a typical error of about $65,000 on districts that it had never seen."
- The initial high loss was caused by a large step size rather than a faulty data pipeline.
  > "The model trains with plain gradient descent at its default step size, and in the first epoch a step was too big."
- The prefetch function allows the model to work on one batch while the next is prepared.
  > "A: It prepares the next batch while the model works on the current one."
- TFRecord files are faster to read and can store complex structures like images.
  > "A: TFRecord files are binary, so they read faster and store images and other structures that do not fit in a CSV row."
- Keras preprocessing layers remain fixed after they are adapted to the training data.
  > "The notebook turns each into numbers with a layer, and the layer's settings are learned from the training data once, with `adapt()`, and then fixed, much like the scaling in Part 2."

## Outcome
I built a robust data pipeline that ensures the model receives a fair sample of data in batches. I also integrated preprocessing layers so that the transformation of raw data into numbers happens consistently during both training and inference.

## Caveats
The specific implementation details for data pipelines are specific to TensorFlow and differ from other frameworks like PyTorch.
