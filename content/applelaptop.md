---
title: "Apple MacBook"
description: "Anaconda Setup"
date: "2023-07-25"
categories: ["Python","macOS"]
tags: "anaconda"
hidden: false
slug: "applelaptop"
image: "/assets/images/applelaptop/jupyter.svg"
---

I used Anaconda, a popular open-source distribution of Python tailored for data science, machine learning, and scientific computing.

Anaconda incorporates a package manager (Conda) and the Jupyter Notebook/Jupyter Lab development environments.


## Apple MacBook Reset

I reset my Apple MacBook laptop and installed Anaconda.

![](/assets/images/applelaptop/20230726-image0-1836x1377.jpg)
*I restarted my laptop and held down the power button until I could access the recovery assistant menu*

![](/assets/images/applelaptop/20230726-image1-1836x1377.jpg)
*I selected Options*

![](/assets/images/applelaptop/20230726-image2-1836x1377.jpg)
*I clicked Erase Mac...*

![](/assets/images/applelaptop/20230726-image3-1836x1377.jpg)
*I clicked Erase Mac*

![](/assets/images/applelaptop/20230726-image4-1836x1377.jpg)
*I selected a wifi network*

![](/assets/images/applelaptop/20230726-image9-1836x1377.jpg)
*I reinstalled macOS Ventura*

![](/assets/images/applelaptop/20230726-image11-1836x1377.jpg)
*I clicked Agree*

![](/assets/images/applelaptop/20230726-image12-1836x1377.jpg)
*I selected the disk*

![](/assets/images/applelaptop/20230726-image13-1836x1377.jpg)
*The installation took approximately 3 hours*


## Anaconda install

I ran into a [documented issue](https://discussions.apple.com/thread/254786965) when I tried to install Anaconda on my Apple MacBook.

These install steps worked for me:

1. I ran the Xcode setup: `xcode-select --install`
2. I downloaded the Anaconda [command line installer](https://repo.anaconda.com/archive/Anaconda3-2023.03-MacOSX-arm64.sh)
3. I opened a Terminal and navigated to ~/Downloads
4. I ran the downloaded script: `bash Anaconda3-2023.03-MacOSX-arm64.sh`

![](/assets/images/applelaptop/screenshot-2023-08-01-at-1.06.58-pm-1168x372.png)
*Python was not present*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-1.02.22-pm-1168x736.png)
*I installed Xcode with xcode-select --install*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-6.16.57-pm-1170x320.png)
*I had installed Python version 3.9.6*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-6.15.42-pm-994x262.png)
*The Xcode installation completed*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-1.03.12-pm-1172x328.png)
*I installed Anaconda with bash Anaconda3-2023.03-MacOSX-arm64.sh*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-1.07.27-pm-1170x354.png)
*I agreed to the license terms*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-1.08.01-pm-1166x742.png)
*I confirmed the install location*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-1.11.25-pm-1166x178.png)
*The Anaconda installation completed*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-6.17.51-pm-1170x276.png)
*Python 3.10.9 was now available in the "base" Anaconda environment*

![](/assets/images/applelaptop/screenshot-2023-08-01-at-6.18.26-pm-1170x348.png)
*I installed support for Jupyter Lab into the base environment*
