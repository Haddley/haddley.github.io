---
title: "Raspberry Pi Imager"
description: "Raspberry Pi Imager Advanced Options"
date: "2023-07-22"
categories: ["IOT"]
tags: ""
slug: "pi1"
image: "/assets/images/pi1/raspberry-pi-logo.svg"
---


With the Raspberry Pi Imager tool, the process of writing a standard operating system image onto a microSD card is easy. 

Taking advantage of the Imager's advanced features, I customized the connectivity settings, allowing me to remotely access the Raspberry Pi immediately after powering it on for the first time.

![](/assets/images/pi1/raspberry-pi-setup-image-2-682x452.png)
*Imager*

![](/assets/images/pi1/raspberry-pi-setup-image-3-682x452.png)
*Raspberry Pi OS (32-bit)*

![](/assets/images/pi1/raspberry-pi-setup-image-4-682x452.png)
*SD Card*

![](/assets/images/pi1/raspberry-pi-setup-image-682x452.png)
*I used 'pi' as the admin username*

![](/assets/images/pi1/raspberry-pi-setup-image-5-682x452.png)
*I provide a hostname and enabled SSH (remote terminal access)*

![](/assets/images/pi1/raspberry-pi-setup-image-7-682x452.png)
*I pressed the WRITE button*

![](/assets/images/pi1/raspberry-pi-setup-image-8-682x452.png)
*I did want to erase the SD Card*

![](/assets/images/pi1/raspberry-pi-setup-image-10-682x452.png)
*The writing process took some time...*

![](/assets/images/pi1/raspberry-pi-setup-image-11-682x452.png)
*Finished*

![](/assets/images/pi1/raspberry-pi-setup-img-3336-1836x1377.jpg)
*I put the Micro SD Card into the Raspberry Pi and plugged in the power*

![](/assets/images/pi1/screen-shot-2023-07-22-at-1.44.46-pm-1138x736.png)
*I used ping to check that the Raspberry Pi was connected to the network*

![](/assets/images/pi1/screen-shot-2023-07-22-at-1.50.37-pm-1138x738.png)
*I connected to the Raspberry Pi using SSH*

![](/assets/images/pi1/screen-shot-2023-07-22-at-1.52.03-pm-1144x520.png)
*sudo apt-get install xrdp*

![](/assets/images/pi1/screen-shot-2023-07-22-at-1.56.43-pm-1136x742.png)
*I added a new administrative account "neil"*

![](/assets/images/pi1/screen-shot-2023-07-22-at-1.58.10-pm-1526x984.png)
*Microsoft Remote Desktop Client (for MacOS)*

![](/assets/images/pi1/screen-shot-2023-07-22-at-2.03.53-pm-1836x1148.png)
*Connected to raspberrypi.local as neil*
## References

- [Installing Raspbian using the Raspberry Pi | Raspberry pi imager, Raspbian](https://projects.raspberrypi.org/en/projects/imager-install)
- [How to use Raspberry Pi Imager | Install Raspberry Pi OS to your  Raspberry Pi (Raspbian)](https://www.youtube.com/watch?v=ntaXWS8Lk34)
- [5 Ways to Remote Desktop on Raspberry Pi (Windows/Linux/Mac)](https://raspberrytips.com/remote-desktop-raspberry-pi/)