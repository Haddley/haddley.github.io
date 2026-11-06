---
type: post
slug: docker
title: "Docker"
date: "2021-02-06"
builds_on: []
topics: [container-images, docker-hub, multi-architecture-support, automated-deployment]
tools: [Docker, Docker Hub, Raspberry Pi]
status: current
checked: "2026-11-05"
source_hash: "3d112e6cda8a"
generated_by: gemma4:12b
---

**Summary.** I explain how Docker provides an easy way to create, manage, and deliver applications. I demonstrate how to use Docker Hub to share images and run them on various hardware platforms.

## What I did
- I used the Docker playground to complete a workshop without local installation.
- I pulled the haddley/blog image from Docker Hub.
- I accessed the running image using a generated URL and port 80.
- I verified that the image runs on a Raspberry Pi computer.

## Claims
- Docker Hub serves as a cloud based repository for sharing container images.
  > "Docker Hub is a cloud based repository that allows users to share container images."
- Developers use container images to automate testing and deployment.
  > "Software developers use container images to automate software testing and deployment tasks."
- The haddley/blog image supports multiple Operating System/Architectures.
  > "Since the haddley/blog image has been published using multiple Operating System/Architectures an image can be pulled from Docker Hub and run on a Raspberry Pi computer."
- I completed a workshop without installing anything using the Docker playground.
  > "I completed a workshop without installing anything using the Docker playground."

## Outcome
I demonstrated that Docker images can be pulled from a repository and run on diverse hardware like a Raspberry Pi.

## Caveats
The post does not show the specific configuration steps for the Raspberry Pi local network setup.
