---
title: "Sails (Part 3)"
description: "A comprehensive guide covering sails (part 3)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/sails3.png"
tags: ["docker","kubernetes","ai","ml"]
---

# Sails (Part 3)

Sails (Part 3) Sails and the Amazon Elastic Kubernetes Service By http://sailsjs.com/ Fair use Dockerfile Docker Container Dockerfile Dockfile Command Palette... Docker Image: Build Image... haddleysails:latest Docker Desktop Running the Docker image on a laptop. The haddleysails image is displayed in Docker Desktop Running the image accessing the container using http://localhost using the container running locally to retrieve the articles data remove the container no containers running Docker Desktop support for Kubernettes Running Kubernettes pods on a laptop. Using kubectl to run multiple copies of the Docker image haddley-sails-local.yaml The Kubernettes pods running accessing the pods using http://localhost using the pods running locally to retrieve the articles data removing the application/pods no pods/containers running Amazon Container Services The Docker image is pushed to the Amazon Elastic Container Registry Create repository haddleysails Create repository haddleysails repository View push commands macOS / Linux commands Windows commands docker build -t haddleysails . build finished commands docker tag ... docker push ... eksctl Using eksctl to create the Amazon Elastic Kubernetes Service cluster. eksctl create cluster --name haddley-sails no clusters creating haddley-sails The Amazon EKS cluster is ready The haddley-sails cluster is active Two nodes in the cluster Workloads kubectl Using kubectl to deploy the application to the cluster kubectl apply -f haddley-sails.yaml haddley-sails.yaml 2 pods desired 2 pods ready Pods external ip address home page Articles
