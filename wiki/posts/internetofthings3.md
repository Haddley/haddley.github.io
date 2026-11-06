---
type: post
slug: internetofthings3
title: "Internet of Things (Part 3)"
date: "2025-03-01"
part: 3
builds_on: []
topics: [edge-computing, machine-learning, internet-of-things, audio-processing]
tools: [Edge Impulse, Arduino Nano 33 BLE Sense, Arduino IDE, EON Tuner]
status: current
checked: "2026-11-05"
source_hash: "13fa31f54576"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to use the Arduino Nano 33 BLE Sense with Edge Impulse to create machine learning models for edge devices. I show the process of preparing audio data, optimizing models with EON Tuner, and deploying the final model to the microcontroller.

## What I did
- I installed Edge Impulse firmware on the Arduino Nano 33 BLE Sense.
- I split and organized audio samples into training and testing sets.
- I used the EON Tuner to find the optimal model configuration.
- I deployed the trained model to the hardware using the Arduino IDE.

## Claims
- Edge Impulse provides a platform for creating machine learning models for low-power hardware.
  > "It allows developers to collect data, train ML models, and deploy them on low-power hardware such as microcontrollers, IoT devices, and embedded systems."
- The specific firmware for the Arduino Nano 33 BLE Sense supports a sampling frequency of 16,000 Hz.
  > "The Edge Impulse firmware for the Arduino Nano 33 BLE Sense supports a sampling frequency of 16,000 Hz."
- The EON Tuner balances accuracy, latency, and memory usage to find the best configuration.
  > "It evaluates different model architectures, balancing accuracy, latency, and memory usage, to ensure the best possible performance on resource-constrained hardware."
- I successfully added the mfcc-conv1d-8f2 configuration as an Impulse.
  > "*I confirmed that mfcc-conv1d-8f2 was added as an Impulse*"
- I deployed the model to the Arduino Nano 33 BLE Sense after the training process.
  > "After training the model I was able to deploy it to the Arduino Nano 33 BLE Sense."

## Outcome
I successfully deployed a trained machine learning model onto the Arduino Nano 33 BLE Sense. This setup allows for real-time audio processing on a compact microcontroller.

## Caveats
The post does not detail the specific environmental factors that might affect the accuracy of the audio recognition in real-world settings.
