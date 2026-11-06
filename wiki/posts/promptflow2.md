---
type: post
slug: promptflow2
title: "Prompt Flow (Part 2)"
date: "2024-06-12"
part: 2
builds_on: []
topics: [prompt-flow, docker-containers, openai-integration, multi-architecture-builds]
tools: [Prompt Flow, VS Code, Docker, OpenAI, Gunicorn, Docker Hub]
status: current
checked: "2026-11-06"
source_hash: "3dc2e1fe4bac"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to run a Prompt Flow application inside a Docker container using the VS Code extension. I also show how to configure an OpenAI connection and build a multi-architecture image for Docker Hub.

## What I did
- I integrated promptflow-tools into the requirements file.
- I built and ran the flow in a Docker container.
- I configured an OpenAI connection with the gpt-3.5-turbo model.
- I built and pushed a multi-architecture image to Docker Hub.
- I configured the environment variables for the API key.

## Claims
- I used the Prompt flow extension to run the flow in a Docker container.
  > "I used Prompt flow for Visual Studio Code to create and run a flow in a Docker container"
- Gunicorn serves the prompt flow over HTTP.
  > "Notice that in this case gunicorn is used to serve the prompt flow over http*"
- I selected the gpt-3.5-turbo model for the second flow.
  > "*I selected the gpt-3.5-turbo model*"
- I used a specific command to build and push a multi-architecture image to Docker Hub.
  > "*I used docker to build an image and to upload the image to dockerhubdocker buildx build --platform linux/amd64,linux/arm64 --rm -t haddley/flow:latest --push .*"
- I set the API key as an environment variable.
  > "*I set the HADDLEY-FLOW-CONNECTION_API_KEY environment variable to the OpenAI key value*"

## Outcome
I built a functional Prompt Flow application that runs in a Docker container and connects to OpenAI. I also established a workflow for building and publishing multi-architecture images.

## Caveats
The post does not specify the exact network configuration of the host machine beyond the port mapping.
