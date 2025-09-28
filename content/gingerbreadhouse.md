---
title: "Gingerbread House"
description: "holiday.py"
date: "2025-09-20"
category: "Development"
image: "/assets/images/gingerbreadhouse/hero.png"
tags: ["python","ai"]
hidden: true
---

![](/assets/images/gingerbreadhouse/raspberry-pi-logo.svg)
*Raspberry Pi is a trademark of Raspberry Pi Ltd*


$ sudo apt-get update
$ sudo  apt-get dist-upgrade

$ python -m venv my-env
$ source my-env/bin/activate

[$ pip install --upgrade pip setuptools wheel](https://singleboardblog.com/install-python-opencv-on-raspberry-pi/?fbclid=IwAR1BtOgVIk8SzhOmEIcPJk_73dkW8a9rc5bsi54KpVDr1vuCB6jnxBgWVqk)
$ pip install opencv-contrib-python

$ python
>>> import cv2
>>> print(cv2.__version__)

$ pip install --upgrade luma.oled
$ sudo raspi-config

$ curl -o holiday.mp4 https://download-video.akamaized.net/...

$ vi holiday.py
$ python holiday.py

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-10.44.44-am-1362x956.png)
*Raspberry Pi Imager*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-10.44.54-am-1360x952.png)
*I selected the Micro SD card*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-10.45.04-am-1354x954.png)
*I clicked YES to include WIFI and logon credentials*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-10.45.11-am-1358x952.png)
*I clicked YES*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-10.48.35-am-1362x954.png)
*SD card was moved from Macbook to Raspberry Pi*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.33.59-pm-1144x744.png)
*I plugged in the Raspberry Pi and used ping to access*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.36.24-pm-1132x732.png)
*I connected to the Raspberry Pi using secure shell (ssh)*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.38.15-pm-1138x740.png)
*I executed $ sudo apt-get update*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.39.14-pm-1132x734.png)
*I executed $ sudo apt-get dist-upgrade*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-27-at-5.56.06-am-1140x746.png)
*I created a python environment, activated the environment and ran pip install$ python -m venv my-env$ source my-env/bin/activate$ pip install --upgrade pip setuptools wheel*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-27-at-5.58.01-am-1128x744.png)
*I ran $ pip install opencv-contrib-pythonI ran import cv2 to ensure that OpenCV was properly installed*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-27-at-5.59.24-am-1130x740.png)
*I ran $ pip install --upgrade luma.oledlibrary for the mini oled display*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.52.14-pm-1140x734.png)
*I ran $ sudo raspi-configI selected the Interface Options menu option*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.52.29-pm-1138x742.png)
*I selected the I2C menu option*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.52.42-pm-1138x736.png)
*I selected Yes*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.52.52-pm-1136x744.png)
*I selected Ok*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-26-at-1.53.05-pm-1140x734.png)
*I selected Finish*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-27-at-6.01.01-am-1134x738.png)
*I downloaded video file from https://pixabay.com/videos/girl-child-snow-snowflakes-window-191152/*

![](/assets/images/gingerbreadhouse/screenshot-2023-12-27-at-6.01.59-am-1138x742.png)
*I created and ran holiday.pyNotice that the cv.imshow("Img", frame) line is commented out*

![](/assets/images/gingerbreadhouse/img-5336-1380x1840.jpg)
*I wired up two displays*

![](/assets/images/gingerbreadhouse/414614983-3592654821010285-4862293336907881210-n-1532x1149.jpg)
*Sweet tooth*

![](/assets/images/gingerbreadhouse/413991968-3592654847676949-8340720245653303904-n-1134x2016.jpg)
*Edible Leaves*

![](/assets/images/gingerbreadhouse/414650583-3592654754343625-1719951648167488634-n-2048x1536.jpg)
*Raspberry Pi*

![](/assets/images/gingerbreadhouse/414450418-3592654787676955-2853045504914548798-n-1536x2048.jpg)
*Invader Zim*

![](/assets/images/gingerbreadhouse/414438799-3592654771010290-8300621329522910848-n-2048x1536.jpg)
*Traditional*

![](/assets/images/gingerbreadhouse/414472361-3592654111010356-258204729919225997-n-960x720.jpg)
*Bluey*


```text
from luma.core.interface.serial import i2c, spi, pcf8574
from luma.core.interface.parallel import bitbang_6800
from luma.core.render import canvas
from luma.oled.device import ssd1306, ssd1309, ssd1325, ssd1331, sh1106, sh1107

from time import sleep

import cv2

# OpenCV follows BGR color convention and PIL follows RGB color convention

# Python Imaging Library
from PIL import Image

serial = i2c(port=1, address=0x3C)
device = sh1106(serial)

width =  device.width
height = device.height

cap = cv2.VideoCapture("holiday.mp4")
while True:
    ret, frame = cap.read()
    if not ret:
        break
#    cv2.imshow("Img", frame)
    
    color_coverted = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(color_coverted)
    image_r = pil_image.resize((width,height), Image.LANCZOS) 
    # Image.BICUBIC is another option
    image_bw = image_r.convert("1")

    device.display(image_bw)

    key = cv2.waitKey(1)
    if key == 27:
        break
        
cap.release()
cv2.destroyAllWindows()
```

