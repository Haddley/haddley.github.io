---
type: post
slug: aspnetcoreawseks
title: "Deploying a .NET Core Web API to Amazon EKS"
date: "2021-08-16"
builds_on: [docker, kubernetes]
topics: [dotnet-core, amazon-eks, kubernetes-deployment, docker-containerization]
tools: [Amazon EKS, Visual Studio Code, Docker, eksctl, kubectl]
status: current
checked: "2026-11-05"
source_hash: "19b50b6bb918"
generated_by: gemma4:12b
---

**Summary.** I explain how to deploy a .NET Core Web API to Amazon Elastic Kubernetes Service (Amazon EKS). I demonstrate the process of containerizing the application and managing it using Kubernetes on AWS.

## What I did
- I containerized a .NET Core Web API.
- I built the Docker image for the application.
- I created an Amazon EKS cluster.
- I deployed the application using Kubernetes manifests.
- I configured the service ports.

## Claims
- I used Amazon EKS to manage and scale containerized applications.
  > "I used Amazon Elastic Kubernetes Service (Amazon EKS) to deploy, manage, and scale containerized applications using Kubernetes on AWS."
- I deployed the .NET Core Web API from Visual Studio Code.
  > "I deployed a .NET Core Web API to Amazon EKS from Visual Studio Code."
- I used the eksctl tool to create the cluster.
  > "*I ran eksctl create cluster --name dotnetapi*"
- I applied the configuration using the kubectl command.
  > "*I ran kubectl apply -f .\dotnetapi.yaml*"
- I modified the container and target ports for the service.
  > "*I updated containerPort, port and targetPort*"

## Outcome
I built a deployed .NET Core Web API on Amazon EKS. I successfully configured the service ports to ensure the application is accessible.

## Caveats
The post does not show the specific internal configuration of the .NET Core source code.
