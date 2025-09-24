---
title: "Docker"
description: "A comprehensive guide covering Docker"
date: "2021-02-06"
category: "DevOps"
image: "/assets/images/docker/hero.png"
tags: ["cloud","docker","testing"]
---

## Docker is an easy way to create, manage, and deliver applications.

![Docker (container_engine) logo by dotCloud, Inc. is licensed under the Apache License](/assets/images/docker/docker-container-engine-logo.svg)
*Docker (container_engine) logo by dotCloud, Inc. is licensed under the Apache License*


## Docker Hub

Docker Hub is a cloud based repository that allows users to share container images. 

Software developers use container images to automate software testing and deployment tasks.

Software developers can use public repositories to share their work. 

[https://hub.docker.com/u/haddley](https://hub.docker.com/u/haddley)

![Docker Hub](/assets/images/docker/screen-shot-2021-02-06-at-4.11.46-pm.png)


## Docker playground

The Docker playground allows users to run container images in a "playground" environment.

[https://www.docker.com/play-with-docker](https://www.docker.com/play-with-docker).

![](/assets/images/docker/screen-shot-2021-02-09-at-8.55.45-am-994x793.png)
*Docker playground web site*


## Lab Environment

Complete a workshop without installing anything using this Docker playground

Navigate to [https://labs.play-with-docker.com](https://labs.play-with-docker.com)

**[verify your identity]**

Click the "**+ Add new instance**" button.

Then enter these two commands:

**$ docker pull haddley/blog**

**$ docker run -d -p 80:80 haddley/blog**

Click on the "**80**" button to connect to the running container image using http.

![](/assets/images/docker/screen-shot-2021-02-09-at-9.06.33-am-1408x921.png)
*Adding an instance*

![](/assets/images/docker/screen-shot-2021-02-09-at-9.07.07-am-1740x1133.png)
*Pulling the haddley/blog image*

![](/assets/images/docker/screen-shot-2021-02-09-at-9.07.47-am-1740x1143.png)
*Running the docker image*

![](/assets/images/docker/screen-shot-2021-02-09-at-9.08.11-am-1740x1137.png)
*Accessing the running image using a generated url and port 80*


## OS/ARCH

Docker images can be published using a single Operating System/Architecture or using multiple Operating System/Architectures.

Since the haddley/blog image has been published using multiple Operating System/Architectures an image can be pulled from Docker Hub and run on a Raspberry Pi computer.

[https://www.docker.com/blog/happy-pi-day-docker-raspberry-pi/](https://www.docker.com/blog/happy-pi-day-docker-raspberry-pi/)

**$ ssh pi@raspberrypi.local

$ sudo apt-get update && sudo apt-get upgrade**
**$ curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh

$ docker pull haddley/blog
$ docker run -d -p 80:80 haddley/blog**

connect to the running container image using http by navigating to [http://rasberrypi.local](http://rasberrypi.local).

![](/assets/images/docker/screen-shot-2021-02-25-at-3.21.15-pm-1128x734.png)
*using ssh to logon to the raspberry pi*

![](/assets/images/docker/screen-shot-2021-02-25-at-3.25.41-pm-1124x732.png)
*Pulling the haddley/blog image from Docker Hub*

![](/assets/images/docker/screen-shot-2021-02-25-at-3.27.03-pm-1132x738.png)
*Running the container image*

![](/assets/images/docker/screen-shot-2021-02-25-at-3.19.21-pm-1622x972.png)
*Navigating to the Docker image running on the Raspberry Pi*
