---
type: post
slug: sklearn14
title: "Scikit-Learn (Part 14)"
date: "2026-10-13"
part: 14
builds_on: [sklearn13, sklearn10, sklearn11, minigpt-grown, sklearn16]
topics: [convolutional-neural-networks, transfer-learning, image-processing, overfitting, pooling-layers]
tools: [Scikit-Learn, Keras, TensorFlow, ResNet50, Xception]
status: current
checked: "2026-11-06"
source_hash: "c308cebc3db1"
generated_by: gemma4:12b
---

**Summary.** I explore convolutional neural networks (CNNs) as the primary architecture for processing images. I demonstrate how these models use filters and pooling to identify patterns and how transfer learning allows for high accuracy on new tasks using pre-trained weights.

## What I did
- I built a small CNN to classify clothing images.
- I implemented a flower classifier using a pre-trained ResNet model.
- I demonstrated the difference between manual filters and learned filters.
- I performed transfer learning using the Xception network.
- I compared the performance of CNNs against standard fully connected networks.

## Claims
- A small CNN outperformed the previous network on clothing images.
  > "A small CNN looked at the same clothing pictures as Part 10 and was right on 90.5% of the test pictures, about three points better than the earlier network."
- The flower network memorized its training data almost perfectly.
  > "And an existing network, trained by someone else on a million pictures, was retrained a little to tell five kinds of flowers apart, reaching 91.8% on pictures that it had not seen, though it had memorised its training pictures almost perfectly (99.9%)."
- The CNN had more parameters than the previous network but learned faster.
  > "But it learned faster, after only 10 passes, and got about 3 percentage points more of the test pictures right."
- The flower classifier showed a significant gap between training and validation accuracy.
  > "When I trained the flower classifier, the training accuracy reached 99.85% and the validation accuracy only 91.83%."
- The training process for the flower classifier resulted in overfitting.
  > "That gap is called overfitting: the network had started to remember its 2,752 training pictures instead of learning flowers."
- The Xception model achieved 91.8% accuracy after a two-step transfer learning process.
  > "Then it unfreezes the network from layer 56 on, and continues for 10 epochs with a step size ten times smaller (0.01): that gave 91.8% by the end."

## Outcome
I built a flower classifier using transfer learning and a CNN for clothing classification. I concluded that starting from a pre-trained network is a superior way to handle image tasks.

## Caveats
The notebook does not use data augmentation to narrow the gap caused by overfitting.
