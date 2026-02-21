---
title: "Machine Learning (Part 1)"
description: "Hexapawn and Yolo"
date: "2022-06-05"
categories: ["AI","ML"]
tags: "hexapawn,yolo"
slug: "machinelearning1"
image: "/assets/images/machinelearning1/tensorflow-logo.svg"
---



For a science fair in 2019 I helped two of my children build an [instructables.com project](https://www.instructables.com/Matchbox-Mini-Chess-Learning-Machine/?fbclid=IwAR0g2mf_HQBxdJJIuQaeSfAbF3Hui4QoTPBuI18YoYVlKFIr4Bv8OX0diTw) using matchboxes and colored beads.


## Hexapawn Educable Robot

The project is based on the matchbox computer described by Martin Garner.

In [his article](https://www.cs.williams.edu/~freund/cs136-073/GardnerHexapawn.pdf) Martin explains that learning machines are computers that improve with experience.

This learning machine improves over time through [reinforcement learning](https://www.techtarget.com/searchenterpriseai/definition/reinforcement-learning).

Reinforcement learning is a training method based on rewarding desired behaviors and/or punishing undesired ones (by removing a colored bead in this case).

![](/assets/mp4/machinelearning1/machinelearning.mp4)
*Matchbox Mini Chess Learning Machine*

## YOLO (you only look once)

For the same science fair I helped my children to configure a Raspberry Pi to track objects using the [YOLO](https://www.v7labs.com/blog/yolo-object-detection) v3 Tiny model.

Details of the Raspberry Pi setup are provided in Xiang Zhai's article [Deep Learning with Raspberry Pi -- Real-time object detection with YOLO v3 Tiny!](https://funofdiy.blogspot.com/2018/08/deep-learning-with-raspberry-pi-real.html)

The YOLO v3 Tiny model was trained using [Supervised learning](https://www.ibm.com/cloud/learn/supervised-learning). A labelled set of photographs was used to train the model.

The people at the science fair were less interested in the computer vision demonstration.

![](/assets/mp4/machinelearning1/video-1654454580.mp4)
*Yolo demonstration*