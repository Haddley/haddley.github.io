---
type: post
slug: sklearn15
title: "Scikit-Learn (Part 15)"
date: "2026-10-13"
part: 15
builds_on: [sklearn14, sklearn11, sklearn13, minigpt-grown, sklearn16]
topics: [recurrent-neural-networks, time-series-forecasting, backpropagation-through-time, sequence-modeling]
tools: [Scikit-Learn, Keras, TensorFlow, JupyterLab]
status: current
checked: "2026-11-06"
source_hash: "edf771ab2b3d"
generated_by: gemma4:12b
---

**Summary.** I explore how to process sequences and forecast daily train ridership using recurrent neural networks and convolutional neural networks. I compare these models against a naive forecast and a statistical SARIMA model to determine when complex architectures are necessary.

## What I did
- I processed Chicago Transit Authority data to forecast train boardings.
- I implemented a SimpleRNN to learn patterns from a 56-day window.
- I compared the RNN performance against a naive guess and a SARIMA model.
- I tested the impact of multi-day forecasting and different input features.
- I analyzed the limitations of small networks and the benefits of LSTM/GRU cells.

## Claims
- A simple forecast provides a necessary baseline to determine if a complex model is worth the effort.
  > "**The lesson:** work out what a simple guess scores before building a model, because it is hard to beat by much, and it tells me whether a clever model is worth having."
- The best performing model used five inputs including bus counts and the day type.
  > "The 5-input model is the best: besides the rail history, it sees the bus history and the type of the next day, which tells it whether to expect a weekday or a weekend."
- A single-neuron RNN performed worse than a naive guess because it lacked sufficient memory.
  > "A `SimpleRNN` with a single neuron scored 102,752, worse than doing nothing clever."
- The SARIMA statistical model performed nearly as well as the RNN on train counts.
  > "A statistical forecasting method called SARIMA, which models weekly patterns directly, scored 32,041, close to the network's 29,979 on the train counts alone."
- Training a model to predict all future days at once prevents errors from accumulating.
  > "Training it to forecast all 14 days at once avoids that: its error grew from 23,219 for tomorrow to between 32,000 and 38,000 from the fifth day onwards."
- Backpropagation through time makes long sequences difficult to train due to unstable gradients.
  > "A long run of steps is also why RNNs are hard to train: the slopes can shrink to almost nothing or grow wildly, the problem from Part 11, and why the chapter introduces LSTM and GRU cells and layer normalization."

## Outcome
I built a system that successfully forecasts train ridership and concluded that simpler models are often sufficient for small forecasting problems.

## Caveats
The results for LSTM and GRU cells are not a fair comparison because those models only ran for five passes.
