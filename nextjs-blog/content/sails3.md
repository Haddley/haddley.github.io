---
title: "Sails (Part 3)"
description: "A comprehensive guide covering sails (part 3)"
date: "2025-09-20"
category: "AI/ML"
image: "/assets/images/sails3/hero.png"
tags: ["aws","docker","kubernetes","ai","ml"]
---

# Sails (Part 3)

## Sails and the Amazon Elastic Kubernetes Service

![AWS](/assets/images/sails3/sailsjs-logo-515x193.png)
*By http://sailsjs.com/ Fair use*


## Dockerfile

Docker Container

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-3-56-13-pm-1020x542.png)
*Dockerfile*

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-3-56-32-pm-1020x542.png)
*Command Palette...*

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-3-56-40-pm-1380x733.png)
*Docker Image: Build Image...*

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-3-56-51-pm-1380x733.png)
*haddleysails:latest*


## Docker Desktop

Running the Docker image on a laptop.

![](/assets/images/sails3/images-list-10-14-2021-12-43-16-pm-1836x975.png)
*The haddleysails image is displayed in Docker Desktop*

![](/assets/images/sails3/images-list-10-14-2021-12-43-41-pm-1836x975.png)
*Running the image*

![](/assets/images/sails3/sails-application-google-chrome-10-14-2021-12-44-05-pm-1836x975.png)
*accessing the container using http://localhost*

![](/assets/images/sails3/sails-application-google-chrome-10-14-2021-12-44-16-pm-1836x975.png)
*using the container running locally to retrieve the articles data*

![](/assets/images/sails3/container-list-10-14-2021-12-44-44-pm-1836x975.png)
*remove the container*

![](/assets/images/sails3/container-list-10-14-2021-12-44-54-pm-1836x975.png)
*no containers running*


## Docker Desktop support for Kubernettes

Running Kubernettes pods on a laptop.

![](/assets/images/sails3/haddley-sails-local.yaml-haddley-sails-visual-studio-code-10-14-2021-12-45-48-pm-1836x1033.png)
*Using kubectl to run multiple copies of the Docker image*

![](/assets/images/sails3/container-list-10-14-2021-12-46-04-pm-1836x975.png)
*The Kubernettes pods running*

![](/assets/images/sails3/localhost-articles-google-chrome-10-14-2021-12-46-15-pm-1836x975.png)
*accessing the pods using http://localhost*

![](/assets/images/sails3/sails-application-google-chrome-10-14-2021-12-44-16-pm-1836x975.png)
*using the pods running locally to retrieve the articles data*

![](/assets/images/sails3/haddley-sails-local.yaml-haddley-sails-visual-studio-code-10-14-2021-12-46-56-pm-1836x1033.png)
*removing the application/pods*

![](/assets/images/sails3/container-list-10-14-2021-12-44-54-pm-1836x975.png)
*no pods/containers running*


## Amazon Container Services

The Docker image is pushed to the Amazon Elastic Container Registry

![](/assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-06-47-pm-1380x733.png)
*Create repository*

![](/assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-07-21-pm-1380x733.png)
*haddleysails*

![](/assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-07-30-pm-1380x733.png)
*Create repository*

![](/assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-07-39-pm-1380x733.png)
*haddleysails repository*

![](/assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-07-59-pm-1380x733.png)
*View push commands*

![](/assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-08-24-pm-1380x733.png)
*macOS / Linux commands*

![](/assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-08-33-pm-1380x733.png)
*Windows commands*

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-24-02-pm-1380x733.png)
*docker build -t haddleysails .*

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-26-07-pm-1380x733.png)
*build finished*

![](/assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-26-15-pm-1380x733.png)
*commands*

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-26-41-pm-1380x733.png)
*docker tag ...*

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-27-04-pm-1380x733.png)
*docker push ...*


## eksctl

Using eksctl to create the Amazon Elastic Kubernetes Service cluster.

![](/assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-33-23-pm-1380x733.png)
*eksctl create cluster --name haddley-sails*

![](/assets/images/sails3/amazon-eks-google-chrome-10-13-2021-4-36-18-pm-1380x733.png)
*no clusters*

![](/assets/images/sails3/amazon-eks-google-chrome-10-13-2021-4-40-46-pm-1380x733.png)
*creating haddley-sails*

![](/assets/images/sails3/haddley-sails.yaml-haddley-sails-visual-studio-code-10-13-2021-7-04-51-pm-1380x733.png)
*The Amazon EKS cluster is ready*

![](/assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-05-19-pm-1380x733.png)
*The haddley-sails cluster is active*

![](/assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-05-28-pm-1380x733.png)
*Two nodes in the cluster*

![](/assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-05-39-pm-1380x733.png)
*Workloads*


## kubectl

Using kubectl to deploy the application to the cluster

![](/assets/images/sails3/haddley-sails.yaml-haddley-sails-visual-studio-code-10-13-2021-7-06-28-pm-1380x733.png)
*kubectl apply -f haddley-sails.yaml*

![](/assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-07-14-pm-1380x733.png)
*2 pods desired*

![](/assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-07-35-pm-1380x733.png)
*2 pods ready*

![](/assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-07-56-pm-1380x733.png)
*Pods*

![](/assets/images/sails3/haddley-sails.yaml-haddley-sails-visual-studio-code-10-13-2021-7-10-12-pm-1380x733.png)
*external ip address*

![](/assets/images/sails3/sails-application-google-chrome-10-13-2021-7-10-44-pm-1380x733.png)
*home page*

![](/assets/images/sails3/sails-application-google-chrome-10-13-2021-7-11-43-pm-1380x733.png)
*Articles*
