---
title: "Object Detection"
description: "A comprehensive guide covering object detection"
date: "2025-09-20"
category: "Development"
image: "/assets/images/raspberry-pi-logo.svg"
tags: ["python","git","github"]
---

# Object Detection

## Object Detection

![](/assets/images/opencv/raspberry-pi-logo.svg)
*Raspberry Pi is a trademark of Raspberry Pi Ltd*


## Raspberry Pi Object Detection using OpenCV and TensorFlow Lite


## Installation of OpenCV

$ sudo apt update
$ sudo apt upgrade
$ sudo apt install python3-opencv
$ python
>>> import cv2
>>> print(cv2.__version__)

![](/assets/images/opencv/screen-shot-2023-07-24-at-11.00.04-am-1134x740.png)
*sudo apt install python3-opencv*


## Installation of TensorFlow Lite

$ sudo apt-get update
$ sudo apt-get dist-upgrade

$ git clone https://github.com/EdjeElectronics/TensorFlow-Lite-Object-Detection-on-Android-and-Raspberry-Pi.git
$ mv TensorFlow-Lite-Object-Detection-on-Android-and-Raspberry-Pi tflite1
$ cd tflite1

$ sudo pip3 install virtualenv
$ python3 -m venv tflite1-env
**$ source tflite1-env/bin/activate**

$ bash get_pi_requirements.sh


## Using Google's sample TFLite model

$ wget https://storage.googleapis.com/download.tensorflow.org/models/tflite/coco_ssd_mobilenet_v1_1.0_quant_2018_06_29.zip

$ unzip coco_ssd_mobilenet_v1_1.0_quant_2018_06_29.zip -d Sample_TFLite_model

$ python TFLite_detection_video.py --modeldir=Sample_TFLite_model --video=test.mp4

$ python TFLite_detection_video.py --modeldir=Sample_TFLite_model --video=dog.mp4

![](/assets/images/opencv/screen-shot-2023-07-25-at-11.58.01-am-1446x928.png)
*python TFLite_detection_video.py --modeldir=Sample_TFLite_model --video=dog.mp4*


## raspi-config

The TFLite_detection_webcam.py program worked (with line self.stream = cv2.VideoCapture(**0**)) after I enabled **Interface Options | Legacy camera** using raspi-config.

$ sudo raspi-config

![](/assets/images/opencv/screen-shot-2023-07-25-at-1.42.15-pm-1434x928.png)
*TFLite_detection_webcam.py*

![](/assets/images/opencv/20230725-img-3382-1836x1377.jpg)
*Logitech QuickCam for Notebooks (from Goodwill)*

![](/assets/images/opencv/screen-shot-2023-07-27-at-12.55.11-pm-1441x924.png)
*Performance improvement from 5.17 frames per second to 28.59 frames per second*

![](/assets/images/opencv/20230727-img-3458-1836x1377.jpg)
*Coral USB Accelerator*
