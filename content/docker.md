---
title: "Docker"
description: "Docker is an easy way to create, manage, and deliver applications."
date: "2021-02-06"
categories: ["DevOps"]
tags: "docker, containers, dockerfile, cli"
hidden: false
slug: "docker"
image: "/assets/images/docker/method-draw-image.svg"
---


Docker Hub is a cloud based repository that allows users to share container images.

Software developers use container images to automate software testing and deployment tasks.

Software developers can use public repositories to share their work.

[https://hub.docker.com/u/haddley](https://hub.docker.com/u/haddley)

![Docker Hub](/assets/images/docker/screen-shot-2021-02-06-at-4.11.46-pm.png)


## Docker playground

The Docker playground allows users to run container images in a "playground" environment.

[https://www.docker.com/play-with-docker](https://www.docker.com/play-with-docker).

![](/assets/images/docker/screen-shot-2021-02-09-at-8.55.45-am-994x793.png)
*I reviewed the Docker playground website*


## Lab Environment

I completed a workshop without installing anything using the Docker playground.

I navigated to [https://labs.play-with-docker.com](https://labs.play-with-docker.com) and verified my identity.

I clicked the **+ Add new instance** button, then entered these two commands:

```bash
$ docker pull haddley/blog
$ docker run -d -p 80:80 haddley/blog
```

I clicked the **80** button to connect to the running container image using http.

![](/assets/images/docker/screen-shot-2021-02-09-at-9.06.33-am-1408x921.png)
*I added an instance*

![](/assets/images/docker/screen-shot-2021-02-09-at-9.07.07-am-1740x1133.png)
*I pulled the haddley/blog image*

![](/assets/images/docker/screen-shot-2021-02-09-at-9.07.47-am-1740x1143.png)
*I ran the docker image*

![](/assets/images/docker/screen-shot-2021-02-09-at-9.08.11-am-1740x1137.png)
*I accessed the running image using a generated URL and port 80*


## OS/ARCH

Docker images can be published using a single Operating System/Architecture or using multiple Operating System/Architectures.

Since the haddley/blog image has been published using multiple Operating System/Architectures an image can be pulled from Docker Hub and run on a Raspberry Pi computer.

[https://www.docker.com/blog/happy-pi-day-docker-raspberry-pi/](https://www.docker.com/blog/happy-pi-day-docker-raspberry-pi/)

```bash
$ ssh pi@raspberrypi.local

$ sudo apt-get update && sudo apt-get upgrade
$ curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh

$ docker pull haddley/blog
$ docker run -d -p 80:80 haddley/blog
```

I connected to the running container image using http by navigating to [http://rasberrypi.local](http://rasberrypi.local).

![](/assets/images/docker/screen-shot-2021-02-25-at-3.21.15-pm-1128x734.png)
*I used SSH to log on to the Raspberry Pi*

![](/assets/images/docker/screen-shot-2021-02-25-at-3.25.41-pm-1124x732.png)
*I pulled the haddley/blog image from Docker Hub*

![](/assets/images/docker/screen-shot-2021-02-25-at-3.27.03-pm-1132x738.png)
*I ran the container image*

![](/assets/images/docker/screen-shot-2021-02-25-at-3.19.21-pm-1622x972.png)
*I navigated to the Docker image running on the Raspberry Pi*
