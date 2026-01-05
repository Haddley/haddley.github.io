---
title: "Raspberry Pi GPIO"
description: "Raspberry Pi GPIO"
date: "2023-07-22"
categories: ["IOT"]
tags: ""
slug: "pi2"
image: "/assets/images/raspberry-pi-logo.svg"
---


The Raspberry Pi input and output pins can be controlled from the terminal.

![](/assets/images/pi2/screen-shot-2023-07-22-at-3.12.04-pm-1136x744.png)
*Controlling GPIO 17 (Pin 11) using a remote SSH terminal*

![](/assets/images/pi2/raspberry-pi-gpio-image1-1836x1377.jpg)
*Hardware setup*

![](/assets/images/pi2/screen-shot-2023-07-22-at-3.26.17-pm-978x564.png)
*Wiring details*

![](/assets/images/pi2/screen-shot-2023-07-22-at-6.38.38-pm-1836x1072.png)
*sudo python blinky.py*

![](/assets/images/pi2/screen-shot-2023-07-22-at-6.51.01-pm-710x96.png)
*Notice that Pin 11 === GPIO 17*


## blinky.py

```text
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

ledPin = 11

GPIO.setup(ledPin, GPIO.OUT)

for i in range(5):
 print("LED turning on.")
 GPIO.output(ledPin, GPIO.HIGH)
 time.sleep(0.5)
 print("LED turning off.")
 GPIO.output(ledPin, GPIO.LOW)
 time.sleep(0.5)
```
## References

- [Coding an LED using an GPIO pin](https://projects.raspberrypi.org/en/projects/leds-buzzers-scratch-games/2)
- [UNDERSTANDING RASPBERRY PI 4 GPIO PINOUTS](https://toptechboy.com/understanding-raspberry-pi-4-gpio-pinouts/)