---
title: "Object Detection"
description: "A comprehensive guide covering object detection"
date: "2025-09-20"
category: "Development"
image: "/assets/images/opencv.png"
tags: ["python","git","github"]
---

# Object Detection

Raspberry Pi (Part 4) Object Detection Raspberry Pi is a trademark of Raspberry Pi Ltd Raspberry Pi Object Detection using OpenCV and TensorFlow Lite Installation of OpenCV $ sudo apt update $ sudo apt upgrade $ sudo apt install python3-opencv $ python >>> import cv2 >>> print(cv2.__version__) sudo apt install python3-opencv Installation of TensorFlow Lite $ sudo apt-get update $ sudo apt-get dist-upgrade $ git clone https://github.com/EdjeElectronics/TensorFlow-Lite-Object-Detection-on-Android-and-Raspberry-Pi.git $ mv TensorFlow-Lite-Object-Detection-on-Android-and-Raspberry-Pi tflite1 $ cd tflite1 $ sudo pip3 install virtualenv $ python3 -m venv tflite1-env $ source tflite1-env/bin/activate $ bash get_pi_requirements.sh Using Google's sample TFLite model $ wget https://storage.googleapis.com/download.tensorflow.org/models/tflite/coco_ssd_mobilenet_v1_1.0_quant_2018_06_29.zip $ unzip coco_ssd_mobilenet_v1_1.0_quant_2018_06_29.zip -d Sample_TFLite_model $ python TFLite_detection_video.py --modeldir=Sample_TFLite_model --video=test.mp4 $ python TFLite_detection_video.py --modeldir=Sample_TFLite_model --video=dog.mp4 python TFLite_detection_video.py --modeldir=Sample_TFLite_model --video=dog.mp4 TFLite_detection_video.py raspi-config The TFLite_detection_webcam.py program worked (with line self.stream = cv2.VideoCapture( 0 )) after I enabled Interface Options | Legacy camera using raspi-config. $ sudo raspi-config TFLite_detection_webcam.py Logitech QuickCam for Notebooks (from Goodwill ) Performance improvement from 5.17 frames per second to 28.59 frames per second Coral USB Accelerator References OpenCV drawing on pictures Object Detection using OpenCV How To Run TensorFlow Lite on Raspberry Pi for Object Detection How to Use the Coral USB Accelerator with the Raspberry Pi - Increase TensorFlow Lite FPS! How to Run TensorFlow Lite Object Detection Models on the Raspberry Pi (with Optional Coral USB Accelerator)
