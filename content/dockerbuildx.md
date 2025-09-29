---
title: "Docker Buildx"
description: "Build multi-platform Docker images."
date: "2021-03-01"
categories: ["DevOps","JavaScript"]
tags: []
slug: "dockerbuildx"
image: "/assets/images/method-draw-image.svg"
---


Buildx allows a developer to build for multiple architecture/operating systems.

When you invoke **docker buildx build**, you can set the --platform flag to specify the target platform for the build output, (for example, linux/amd64, linux/arm64, linux/arm/v7,linux/arm/v6, darwin/amd64).


## The Dockerfile

Visual Studio Code is able to add a Dockerfile to the graphql-server project automagically.

Open the Command Palette (⇧⌘P) and use the "Docker: Add Docker Files to Workspace..." command:

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.32.18-am-1536x944.png)
*Docker: Add Docker Files to Workspace...*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.32.36-am-1536x935.png)
*Application Platform is Node.js*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.32.53-am-1536x940.png)
*Select the project's package.json file*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.33.15-am-1536x940.png)
*Specify the port that the image will be listening to*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.33.38-am-1536x941.png)
*Don't add the Docker Compose file*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.34.54-am-1536x995.png)
*Build the Docker image*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.35.27-am-1536x992.png)
*Image built and uploaded to Docker Desktop*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.38.12-am-1536x883.png)
*New container based on the new image (port 5000)*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.38.28-am-1066x242.png)
*Container running*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.40.18-am-1536x833.png)
*Testing the image using Docker Desktop*


## Uploading to Dockerhub

**$ docker login --username=haddley**

**$ docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v6 --rm -t haddley/graphql-server:latest --push .**

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.48.59-am-1536x990.png)
*Build image for multiple Operating Systems/Processors*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.51.16-am-1536x835.png)
*Image has been uploaded to Docker Hub*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-8.06.23-am-1536x824.png)
*Multiple OS/ARCH*


## Docker playground

Add new instance.

**docker run -d -p 5000:5000 haddley/graphql-server**

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-7.58.19-am-1536x826.png)
*docker run -d -p 5000:5000 haddley/graphql-server*

![](/assets/images/dockerbuildx/screen-shot-2021-03-03-at-8.05.03-am-1536x827.png)
*Accessing the image running in the lab*


## Raspberry Pi

The docker image can be run on a Raspberry Pi.

![](/assets/images/dockerbuildx/screen-shot-2021-03-13-at-3.32.48-pm-1138x742.png)
*docker run the haddley/graphql-server image*

![](/assets/images/dockerbuildx/screen-shot-2021-03-13-at-3.35.52-pm-1636x1166.png)
*GraphiQL intellisense*

![](/assets/images/dockerbuildx/screen-shot-2021-03-13-at-3.36.12-pm-1638x1172.png)
*GraphQL service running on the Raspberry Pi*