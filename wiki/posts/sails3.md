---
type: post
slug: sails3
title: "Sails (Part 3)"
date: "2021-10-13"
part: 3
builds_on: []
topics: [docker-containers, kubernetes-orchestration, amazon-eks, container-registry]
tools: [Docker, Kubernetes, kubectl, Amazon ECR, eksctl, Sails]
status: current
checked: "2026-11-06"
source_hash: "201ca75790e6"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to containerize a Sails application and deploy it using Kubernetes. I transition from local development with Docker to a production-ready environment on Amazon EKS.

## What I did
- I built and tested a Docker container locally.
- I managed multiple copies of the image using Kubernetes pods.
- I pushed the image to the Amazon Elastic Container Registry.
- I deployed the application to an Amazon EKS cluster.

## Claims
- I created a Docker container for the Sails application.
  > "I built a Docker container for the Sails application."
- I used the local container to retrieve the articles data.
  > "*I used the container running locally to retrieve the articles data*"
- I used kubectl to run multiple copies of the Docker image.
  > "*I used kubectl to run multiple copies of the Docker image*"
- I pushed the Docker image to the Amazon Elastic Container Registry.
  > "I pushed the Docker image to the Amazon Elastic Container Registry."
- I used eksctl to create the Amazon EKS cluster.
  > "I used eksctl to create the Amazon EKS cluster."
- I used kubectl to deploy the application to the cluster.
  > "I used kubectl to deploy the application to the cluster."

## Outcome
I successfully deployed a containerized Sails application to an Amazon EKS cluster. I moved the application from a local environment to a managed cloud infrastructure.

## Caveats
The post does not show the specific configuration details of the EKS cluster or the internal networking rules.
