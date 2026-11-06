---
type: post
slug: kubernetes
title: "Kubernetes"
date: "2021-02-06"
builds_on: []
topics: [kubernetes, container-orchestration, docker-desktop, pod-management]
tools: [Kubernetes, Docker Desktop, YAML]
status: current
checked: "2026-11-05"
source_hash: "84817b5373f7"
generated_by: gemma4:12b
---

**Summary.** I explain how to manage containerized workloads using Kubernetes. I demonstrate how to deploy a blog container image using both command line instructions and a configuration file.

## What I did
- I noted that Docker Desktop includes Kubernetes.
- I deployed the haddley/blog container image.
- I created a blog.yaml file to manage the deployment.
- I accessed the web server via a specific port.
- I ran the image in two pods.

## Claims
- Docker Desktop provides Kubernetes functionality.
  > "Docker Desktop includes Kubernetes."
- I used a specific command to deploy the container image.
  > "I deployed the haddley/blog container image using these commands:"
- I used a YAML file to deploy the container.
  > "Or I created a file called blog.yaml and used this command:"
- I accessed the server at a specific IP address and port.
  > "http://<ip address of the computer running Docker Desktop>:8080"
- I ran the image in two pods.
  > "*I ran the Docker image in two Kubernetes pods.*"

## Outcome
I successfully deployed a blog web server using Kubernetes pods. I demonstrated two different methods for deploying the container image.

## Caveats
The post does not provide the specific IP address of the local machine.
