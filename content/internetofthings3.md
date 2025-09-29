---
title: "Internet of Things (Part 3)"
description: "Arduino Nano 33 BLE Sense"
date: "2025-03-01"
categories: ["AI"]
tags: []
slug: "internetofthings3"
image: "/assets/images/iot-microchip.svg"
---

![](/assets/images/internetofthings3/iot-microchip.svg)
*iot microchip by Philipp Petzka is licensed under CC*


Edge Impulse is a development platform for creating machine learning (ML) models optimized for edge devices. It allows developers to collect data, train ML models, and deploy them on low-power hardware such as microcontrollers, IoT devices, and embedded systems. The platform is particularly useful for applications in **industrial automation, healthcare, predictive maintenance, and smart devices**.

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-9.04.25am-2136x1234.png)
*I navigated to https://studio.edgeimpulse.com/*


The Arduino Nano 33 BLE Sense is a compact, microcontroller board designed for Artificial Intelligence (AI) and Internet of Things (IoT) applications, featuring built-in sensors and Bluetooth Low Energy (BLE) connectivity. 

The Arduino Nano 33 BLE Sense can be used in edge computing, AI/ML applications, and sensor-based projects.

![](/assets/images/internetofthings3/nano33-ble-sense-650x374.png)
*Nano 33 BLE Sense User Manual*


## Edge Impulse firmware

I installed the Edge Impulse firmware on the Arduino Nano 33 BLE Sense to improve its connectivity with Edge Impulse Studio for data collection.

![](/assets/images/internetofthings3/482410156-627953613276540-5451296773514265879-n-859x450.png)
*I followed these instructions https://docs.edgeimpulse.com/docs/edge-ai-hardware/mcu/arduino-nano-33-ble-sense*


## Sampling Frequency

The Edge Impulse firmware for the Arduino Nano 33 BLE Sense supports a sampling frequency of 16,000 Hz.

Audio files recorded with this firmware can be previewed and edited in Edge Impulse Studio.

I noticed that the play, pause, and volume media controls in Edge Impulse Studio only appeared when the selected audio file had been recorded using an Arduino Nano 33 BLE Sense with the Edge Impulse firmware installed.

![](/assets/images/internetofthings3/482435269-1145132687404726-4716611611337756326-n-1102x688.png)
*The Edge Impulse firmware for the Arduino Nano 33 BLE Sense supports a sampling frequency of 16,000 Hz.*

![](/assets/images/internetofthings3/476496236-1162144762281696-6300659400931351561-n-1359x645.png)
*When the dog was barking I clicked the Start sampling button*

![](/assets/images/internetofthings3/476504697-664391085933372-6833322121764778224-n-1366x673.png)
*The button text updated to Waiting to start...*

![](/assets/images/internetofthings3/476492243-9287067184705791-2599704835014173228-n-1365x696.png)
*The button text updated to Sampling... (Xs left)*

![](/assets/images/internetofthings3/476497092-484165971427295-7355111782948313514-n-1366x690.png)
*The button text updated to Reading data from device (XX%)...*

![](/assets/images/internetofthings3/476497322-1578815952747483-1090199327499510722-n-1366x680.png)
*The button text updated to Uploading...*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-1.08.35pm-2136x911.png)
*I selected a 10 second sample and selected the Split sample menu option*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-1.10.25pm-2136x1344.png)
*Edge Impulse highlighted 6 interesting segments. I clicked the Split button*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-1.55.50pm-2136x1100.png)
*I reviewed each of the newly created 1 second segment keeping every sample that was useful.*


## Training and Testing groups

Data is split into **Training** and **Testing** groups to ensure that a machine learning model generalizes well to new, unseen data. This separation helps prevent overfitting, where a model performs well on the training data but poorly on new inputs.

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-5.44.44pm-2136x712.png)
*I clicked the Perform train / test split button*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-5.45.21pm-2136x1103.png)
*I clicked the Yes, perform the train / test split button*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-5.45.49pm-2136x1099.png)
*I typed perform split and clicked the Perform train / test split button*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-5.46.10pm-2136x1110.png)
*I clicked the OK button*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-5.47.22pm-2136x1173.png)
*The samples were divided into a training set and a test set*


## EON Tuner

The Edge Impulse EON Tuner is a machine learning optimization tool that helps developers find the best ML model configuration for edge devices. It evaluates different model architectures, balancing accuracy, latency, and memory usage, to ensure the best possible performance on resource-constrained hardware.

[https://www.youtube.com/watch?v=c3R9w7R_tRw](https://www.youtube.com/watch?v=c3R9w7R_tRw)

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-5.54.42pm-2136x481.png)
*EON Tuner*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-5.55.55pm-2136x344.png)
*I selected Audible events*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.22.47pm-2136x1261.png)
*Audible events. Listen for short one-time occurrences of non-voice audio*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-5.58.09pm-2136x1173.png)
*EON Tuner is running...*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.07.06pm-2136x1165.png)
*EON Tuner results*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.27.34pm-2136x1001.png)
*I clicked the + Add button on the best looking model configuration*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.28.07pm-2136x1088.png)
*mfcc-conv1d-8f2 was added as an Impulse*


## Deployment

After training the model I was able to deploy it to the Arduino Nano 33 BLE Sense.

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.29.25pm-2136x1177.png)
*I clicked the Deployment menu item. I clicked the Build button*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.30.56pm-2136x966.png)
*An Arduino library .zip file was generated*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.31.41pm-1758x204.png)
*I copied the .zip file from the Downloads folder*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.33.14pm-1754x324.png)
*I copied the .zip file to the Arduino libraries folder*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.37.25pm-1758x1150.png)
*I unzipped the library*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.35.20pm-2136x292.png)
*I ran the Arduino Integrated Development Environment (IDE)*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.38.40pm-2136x1288.png)
*I selected the nano_ble33_sense_microphone example*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.39.38pm-2136x237.png)
*I clicked the Upload button*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.40.32pm-2136x1241.png)
*I waited for the sketch to compile*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.44.58pm-2136x1200.png)
*I waited for the sketch to be uploaded to the Arduino Nano 33 BLE Sense*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.45.39pm-2136x347.png)
*I started the Serial Monitor*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-6.47.04pm-2136x1232.png)
*With no barking the model correctly predicted: Background*

![](/assets/images/internetofthings3/screenshot-2025-03-01-at-7.20.55pm-2136x1238.png)
*With barking the model correctly predicted: Bark*

## References

- [Arduino Nano 33 BLE Sense](https://docs.edgeimpulse.com/docs/edge-ai-hardware/mcu/arduino-nano-33-ble-sense) - Edge Impulse documentation for Arduino Nano 33 BLE Sense development
- [TinyML Dog Bark Stopper](https://www.hackster.io/NathanielF/tinyml-dog-bark-stopper-77e436) - Hackster.io project tutorial for creating a dog bark detection system
- [The Bark Stopper GitHub](https://github.com/NathanielFelleke/The-Bark-Stopper) - GitHub repository with source code for the bark stopper project
- [Wio Terminal TinyML Course #2 Audio Scene Recognition - ML on Microcontrollers with Arduino IDE](https://www.youtube.com/watch?v=2BISspenUng&t=1194s) - YouTube tutorial on audio scene recognition with TinyML
- [Connecting Arduino Nano 33 BLE Sense to Edge Impulse](https://www.youtube.com/watch?v=wOkMZUaPLUM) - YouTube tutorial on connecting Arduino Nano to Edge Impulse platform