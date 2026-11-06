---
type: post
slug: opencv
title: "Object Detection"
date: "2023-07-25"
builds_on: []
topics: [object-detection, computer-vision, raspberry-pi, tensorflow-lite]
tools: [OpenCV, Raspberry Pi, Python, TensorFlow Lite, Virtualenv]
status: current
checked: "2026-11-06"
source_hash: "0ab5eef453bd"
generated_by: gemma4:12b
---

**Summary.** I built a computer vision object detection pipeline on a Raspberry Pi. I installed OpenCV and used Google's sample TFLite model to detect objects in video files and via a webcam.

## What I did
- I installed OpenCV on the Raspberry Pi.
- I cloned and prepared the TensorFlow Lite repository.
- I set up a virtual environment and downloaded the TFLite model.
- I ran the detection scripts on sample videos.
- I configured the legacy camera interface for webcam support.

## Claims
- I installed the OpenCV library on the Raspberry Pi hardware.
  > "I installed OpenCV on a Raspberry Pi."
- I downloaded and executed the sample TFLite model from Google.
  > "I downloaded and ran Google's sample TFLite model."
- The webcam program functioned after I enabled the legacy camera interface.
  > "The TFLite_detection_webcam.py program worked (with line self.stream = cv2.VideoCapture(**0**)) after I enabled **Interface Options | Legacy camera** using raspi-config."
- I used the TFLite_detection_video.py script to process a video of a dog.
  > "$ python TFLite_detection_video.py --modeldir=Sample_TFLite_model --video=dog.mp4"

## Outcome
I built a functional object detection pipeline that identifies objects in both pre-recorded video files and live webcam feeds.

## Caveats
The post does not specify the exact hardware specifications of the Raspberry Pi used for the installation.
