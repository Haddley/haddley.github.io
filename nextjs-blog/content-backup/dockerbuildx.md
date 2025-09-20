---
title: "Docker Buildx"
description: "A comprehensive guide covering docker buildx"
date: "2025-09-20"
category: "DevOps"
image: "/assets/images/dockerbuildx.png"
tags: ["cloud","docker","ai","testing"]
---

# Docker Buildx

Docker Buildx Build multi-platform Docker images. Docker (container_engine) logo by dotCloud, Inc. is licensed under the Apache License Buildx Buildx allows a developer to build for multiple architecture/operating systems. When you invoke docker buildx build , you can set the --platform flag to specify the target platform for the build output, (for example, linux/amd64, linux/arm64, linux/arm/v7,linux/arm/v6, darwin/amd64). The Dockerfile Visual Studio Code is able to add a Dockerfile to the graphql-server project automagically. Open the Command Palette (⇧⌘P) and use the "Docker: Add Docker Files to Workspace..." command: Docker: Add Docker Files to Workspace... Application Platform is Node.js Select the project's package.json file Specify the port that the image will be listening to Don't add the Docker Compose file Build the Docker image Image built and uploaded to Docker Desktop New container based on the new image (port 5000) Container running Testing the image using Docker Desktop Uploading to Dockerhub $ docker login --username=haddley $ docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v6 --rm -t haddley/graphql-server:latest --push . Build image for multiple Operating Systems/Processors Image has been uploaded to Docker Hub Multiple OS/ARCH Docker playground Add new instance. docker run -d -p 5000:5000 haddley/graphql-server docker run -d -p 5000:5000 haddley/graphql-server Accessing the image running in the lab Raspberry Pi The docker image can be run on a Raspberry Pi. docker run the haddley/graphql-server image GraphiQL intellisense GraphQL service running on the Raspberry Pi Docker Hub
