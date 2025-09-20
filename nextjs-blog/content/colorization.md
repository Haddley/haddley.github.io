---
title: "Colorization"
description: "A comprehensive guide covering colorization"
date: "2025-09-20"
category: "Development"
image: "/assets/images/colorization/hero.png"
tags: []
---

# Colorization

## Colorization

![](/assets/images/colorization/jupyter.svg)
*Cameron Oelsen, BSD, via Wikimedia Commons*


## Colorization

I used the instructions from this ["Black and white image colorization with OpenCV and Deep Learning"](https://www.geeksforgeeks.org/black-and-white-image-colorization-with-opencv-and-deep-learning/) post to add color to a black and white image

![](/assets/images/colorization/364196815-152009791251390-5668419463329752519-n-1836x1153.png)
*Color image generated from a black and white photograph*


## colorization.ipynb

```text
!pip install opencv-python
!pip install Pillow

import numpy as np
import cv2
from cv2 import dnn
from PIL import Image

#--------Model file paths--------#
proto_file = 'colorization_deploy_v2.prototxt'
model_file = 'colorization_release_v2.caffemodel'
hull_pts = 'pts_in_hull.npy'
img_path = 'img1.jpg'
#--------------#--------------#
 
#--------Reading the model params--------#
# net = dnn.readNetFromCaffe(proto_file,model_file)
net = dnn.readNetFromCaffe(proto_file,model_file)

dnn.readNetFromCaffe

kernel = np.load(hull_pts)
#-----------------------------------#---------------------#


#-----Reading and preprocessing image--------#
img = cv2.imread(img_path)
scaled = img.astype("float32") / 255.0
lab_img = cv2.cvtColor(scaled, cv2.COLOR_BGR2LAB)
#-----------------------------------#---------------------#

# add the cluster centers as 1x1 convolutions to the model
class8 = net.getLayerId("class8_ab")
conv8 = net.getLayerId("conv8_313_rh")
pts = kernel.transpose().reshape(2, 313, 1, 1)
net.getLayer(class8).blobs = [pts.astype("float32")]
net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype="float32")]
#-----------------------------------#---------------------#

# we'll resize the image for the network
resized = cv2.resize(lab_img, (224, 224))
# split the L channel
L = cv2.split(resized)[0]
# mean subtraction
L -= 50
#-----------------------------------#---------------------#

# predicting the ab channels from the input L channel

net.setInput(cv2.dnn.blobFromImage(L))
ab_channel = net.forward()[0, :, :, :].transpose((1, 2, 0))
# resize the predicted 'ab' volume to the same dimensions as our
# input image
ab_channel = cv2.resize(ab_channel, (img.shape[1], img.shape[0]))


# Take the L channel from the image
L = cv2.split(lab_img)[0]
# Join the L channel with predicted ab channel
colorized = np.concatenate((L[:, :, np.newaxis], ab_channel), axis=2)

# Then convert the image from Lab to BGR
colorized = cv2.cvtColor(colorized, cv2.COLOR_LAB2BGR)
colorized = np.clip(colorized, 0, 1)

# change the image to 0-255 range and convert it from float32 to int
colorized = (255 * colorized).astype("uint8")

# Let's resize the images and show them together
img = cv2.resize(img,(640,640))
colorized = cv2.resize(colorized,(640,640))

result = cv2.hconcat([img,colorized])
cv2.imshow("Grayscale -> Colour", result)
cv2.waitKey(0)

color_coverted = cv2.cvtColor(colorized, cv2.COLOR_BGR2RGB)

img = Image.fromarray(color_coverted, 'RGB')
img.save('img1_converted.jpg')
img
```

