---
title: "Prompt Flow (Part 2)"
description: "A comprehensive guide covering prompt flow (part 2)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/promptflow2.png"
tags: ["docker","ai"]
---

# Prompt Flow (Part 2)

Prompt flow (Part 2) Docker This file is licensed under the MIT license. Docker I used Prompt flow for Visual Studio Code to create and run a flow in a Docker container I created a new flow I created a standard flow I accepted the default flow name I manually added promptflow-tools to the requirements.txt file I selected the flow and the Build menu item I selected the Build as docker option I selected the output folder I clicked the Create Dockerfile link I reviewed the generated Dockerfile Dockerfile I ran docker build I opened Docker desktop , found the image and clicked the Run action I mapped the Docker container's port 8080 to localhost 8080 The container started without issue I tested the Prompt flow by navigating to localhost 8080. Notice that in this case gunicorn is used to serve the prompt flow over http OpenAI connection I created a second flow with an OpenAI connection I created a Chat Flow I created an OpenAI key I created a haddley-flow-connection Open AI connection. I pasted the key value I selected the gpt-3.5-turbo model I tried to test the flow I updated requirements.txt and using pip install -r requirements.txt to install promptflow-tools I tested the flow I selected the build button I created a DOCKER folder I clicked the Create Dockerfile link I used docker to build an image and to upload the image to dockerhub docker buildx build --platform linux/amd64,linux/arm64 --rm -t haddley/flow:latest --push . The image was published to dockerhub I set the HADDLEY-FLOW-CONNECTION_API_KEY environment variable to the OpenAI key value I ran the image References Deploy a flow using Docker
