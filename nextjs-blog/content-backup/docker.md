---
title: "Business Central (Part 27) PromptDialog"
description: "A comprehensive guide covering business central (part 27) promptdialog"
date: "2025-09-20"
category: "DevOps"
image: "/assets/images/docker.png"
tags: ["cloud","docker","ai","business central","testing"]
---

# Business Central (Part 27) PromptDialog

Docker Docker is an easy way to create, manage, and deliver applications. Docker (container_engine) logo by dotCloud, Inc. is licensed under the Apache License Docker Hub Docker Hub is a cloud based repository that allows users to share container images. Software developers use container images to automate software testing and deployment tasks. Software developers can use public repositories to share their work. https://hub.docker.com/u/haddley Docker playground The Docker playground allows users to run container images in a "playground" environment. https://www.docker.com/play-with-docker . Docker playground web site Lab Environment Complete a workshop without installing anything using this Docker playground Navigate to https://labs.play-with-docker.com [verify your identity] Click the " + Add new instance " button. Then enter these two commands: $ docker pull haddley/blog $ docker run -d -p 80:80 haddley/blog Click on the " 80 " button to connect to the running container image using http. Adding an instance Pulling the haddley/blog image Running the docker image Accessing the running image using a generated url and port 80 OS/ARCH Docker images can be published using a single Operating System/Architecture or using multiple Operating System/Architectures. Since the haddley/blog image has been published using multiple Operating System/Architectures an image can be pulled from Docker Hub and run on a Raspberry Pi computer. https://www.docker.com/blog/happy-pi-day-docker-raspberry-pi/ $ ssh pi@raspberrypi.local $ sudo apt-get update && sudo apt-get upgrade $ curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh $ docker pull haddley/blog $ docker run -d -p 80:80 haddley/blog connect to the running container image using http by navigating to http://rasberrypi.local . using ssh to logon to the raspberry pi Pulling the haddley/blog image from Docker Hub Running the container image Navigating to the Docker image running on the Raspberry Pi Docker Hub
