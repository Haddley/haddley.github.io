---
title: "Prompt Flow (Part 2)"
description: "A comprehensive guide covering prompt flow (part 2)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/promptflow2/hero.png"
tags: ["docker","ai"]
---

## Docker

![](/assets/images/promptflow2/logo.svg)
*This file is licensed under the MIT license.*


## Docker

I used Prompt flow for Visual Studio Code to create and run a flow in a Docker container

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.54.32am-1836x484.png)
*I created a new flow*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.54.42am-1836x478.png)
*I created a standard flow*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.55.38am-1836x327.png)
*I accepted the default flow name*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.57.01am-1836x761.png)
*I manually added promptflow-tools to the requirements.txt file*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.57.39am-2136x990.png)
*I selected the flow and the Build menu item*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.57.47am-1836x221.png)
*I selected the Build as docker option*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.57.56am-1836x1063.png)
*I selected the output folder*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.58.15am-1836x754.png)
*I clicked the Create Dockerfile link*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-11.58.39am-1836x1182.png)
*I reviewed the generated Dockerfile*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-12.01.02pm-1836x1319.png)
*I ran docker build*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-12.01.15pm-1836x788.png)
*I opened Docker desktop, found the image and clicked the Run action*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-1.04.15pm-2136x1213.png)
*I mapped the Docker container's port 8080 to localhost 8080*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-1.06.28pm-2136x1209.png)
*The container started without issue*

![](/assets/images/promptflow2/screenshot-2024-06-12-at-1.07.08pm-2136x1115.png)
*I tested the Prompt flow by navigating to localhost 8080. Notice that in this case gunicorn is used to serve the prompt flow over http*


## OpenAI connection

I created a second flow with an OpenAI connection

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.02.02am-2136x1226.png)
*I created a Chat Flow*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.05.32am-2136x1275.png)
*I created an OpenAI key*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.06.23am-2136x944.png)
*I created a haddley-flow-connection Open AI connection. I pasted the key value*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.06.56am-2136x866.png)
*I selected the gpt-3.5-turbo model*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.07.17am-2136x356.png)
*I tried to test the flow*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.09.24am-2136x775.png)
*I updated requirements.txt and using pip install -r requirements.txt to install promptflow-tools*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.09.57am-2136x689.png)
*I tested the flow*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.10.15am-2136x183.png)
*I selected the build button*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.10.33am-2136x963.png)
*I created a DOCKER folder*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.11.42am-2136x477.png)
*I clicked the Create Dockerfile link*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-8.14.40am-2136x1234.png)
*I used docker to build an image and to upload the image to dockerhubdocker buildx build --platform linux/amd64,linux/arm64 --rm -t haddley/flow:latest --push .*

![](/assets/images/promptflow2/screenshot-2024-09-15-at-12.18.04pm-2136x482.png)
*The image was published to dockerhub*

![](/assets/images/promptflow2/458093778-988481093300074-4455187068097691869-n-1270x720.png)
*I set the HADDLEY-FLOW-CONNECTION_API_KEY environment variable to the OpenAI key value*

![](/assets/images/promptflow2/457851559-902204838438402-4174883941277830493-n-1270x720.png)
*I ran the image*


## Dockerfile

```text
# syntax=docker/dockerfile:1
FROM docker.io/continuumio/miniconda3:latest

WORKDIR /

COPY ./flow/requirements.txt /flow/requirements.txt

# gcc is for build psutil in MacOS
RUN apt-get update && apt-get install -y runit gcc

# create conda environment
RUN conda create -n promptflow-serve python=3.9.16 pip=23.0.1 -q -y && \
    conda run -n promptflow-serve \
    pip install -r /flow/requirements.txt && \
    conda run -n promptflow-serve pip install keyrings.alt && \
    conda run -n promptflow-serve pip install gunicorn==20.1.0 && \
    conda run -n promptflow-serve pip install 'uvicorn>=0.27.0,<1.0.0' && \
    conda run -n promptflow-serve pip cache purge && \
    conda clean -a -y

COPY ./flow /flow


EXPOSE 8080

COPY ./connections /connections

# reset runsvdir
RUN rm -rf /var/runit
COPY ./runit /var/runit
# grant permission
RUN chmod -R +x /var/runit

COPY ./start.sh /
CMD ["bash", "./start.sh"]
```

