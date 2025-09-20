---
title: "Deploying a .NET Core Web API to Amazon EKS"
description: "A comprehensive guide covering deploying a .net core web api to amazon eks"
date: "2025-09-20"
category: ".NET"
image: "/assets/images/aspnetcoreawseks/hero.png"
tags: ["aws","docker","kubernetes","dotnet","ai"]
---

# Deploying a .NET Core Web API to Amazon EKS

## Deploying a .NET Core Web API to Amazon Elastic Kubernetes Service (Amazon EKS)

![AWS](/assets/images/aspnetcoreawseks/amazon-web-services-logo.svg)
*By Amazon.com Inc. - Amazon, Apache License 2.0*


## Amazon Elastic Kubernetes Service (Amazon EKS)

Amazon Elastic Kubernetes Service (Amazon EKS) makes it possible to deploy, manage, and scale [containerized](docker.html) applications using [Kubernetes](kubernetes.html) on AWS. 

A .NET Core Web API can be deployed to Amazon EKS from Visual Studio Code using the Visual Studio Code terminal window.


## install eksctl

> choco install -y eksctl

![](/assets/images/aspnetcoreawseks/the-eksctl-command-line-utility-amazon-eks-google-chrome-8-16-2021-8-20-21-pm-1836x975.png)
*install eksctl on Windows*

![](/assets/images/aspnetcoreawseks/select-administrator-windows-powershell-8-16-2021-8-24-46-pm-1200x440.png)
*choco install -y eksctl*


## .NET Core Web API

**> dotnet new webapi --no-https**

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-28-32-pm-1536x720.png)
*dotnet new webapi --no-https*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-29-44-pm-1536x720.png)
*Docker: Add Docker Files to Workspace*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-29-55-pm-1536x720.png)
*.Net: ASP.NET Core platform*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-30-04-pm-1536x720.png)
*Linux*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-30-15-pm-1536x720.png)
*Port 5000*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-31-14-pm-1536x720.png)
*Dockerfile*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-31-34-pm-1536x720.png)
*Docker Images: Build Image...*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-32-32-pm-1536x720.png)
*Building*

![](/assets/images/aspnetcoreawseks/amazon-ecr-google-chrome-8-16-2021-8-34-25-pm-1836x975.png)
*Create ECR repository*

![](/assets/images/aspnetcoreawseks/amazon-ecr-google-chrome-8-16-2021-8-34-51-pm-1836x975.png)
*Repository created*

![](/assets/images/aspnetcoreawseks/amazon-ecr-google-chrome-8-16-2021-8-35-04-pm-1836x975.png)
*View push commands macOS/Linux*

![](/assets/images/aspnetcoreawseks/amazon-ecr-google-chrome-8-16-2021-8-37-22-pm-1836x975.png)
*View push commands Windows*

![](/assets/images/aspnetcoreawseks/administrator-windows-powershell-8-16-2021-9-12-34-pm-1200x440.png)
*(Get-ECRLoginCommand)...*

![](/assets/images/aspnetcoreawseks/dockerfile-dotnetapi-visual-studio-code-8-16-2021-9-15-23-pm-1536x720.png)
*docker build -t dotnetapi .*

![](/assets/images/aspnetcoreawseks/dockerfile-dotnetapi-visual-studio-code-8-16-2021-9-16-17-pm-1536x720.png)
*docker tag...*

![](/assets/images/aspnetcoreawseks/dockerfile-dotnetapi-visual-studio-code-8-16-2021-9-16-42-pm-1536x720.png)
*docker push...*

![](/assets/images/aspnetcoreawseks/administrator-windows-powershell-8-16-2021-9-19-09-pm-1200x440.png)
*eksctl create cluster --name dotnetapi*

![](/assets/images/aspnetcoreawseks/amazon-eks-google-chrome-8-16-2021-9-38-55-pm-1644x1069.png)
*Cluster EC2 nodes*

![](/assets/images/aspnetcoreawseks/amazon-eks-google-chrome-8-16-2021-9-39-05-pm-1644x1069.png)
*Workloads*

![](/assets/images/aspnetcoreawseks/dotnetapi.yaml-dotnetapi-visual-studio-code-8-16-2021-9-39-22-pm-1536x720.png)
*kubectl apply -f .\dotnetapi.yaml*

![](/assets/images/aspnetcoreawseks/dotnetapi.yaml-dotnetapi-visual-studio-code-8-16-2021-9-39-31-pm-1536x720.png)
*dotnetapi-service created*

![](/assets/images/aspnetcoreawseks/amazon-eks-google-chrome-8-16-2021-9-39-52-pm-1644x1069.png)
*Workloads*

![](/assets/images/aspnetcoreawseks/dotnetapi.yaml-dotnetapi-visual-studio-code-8-16-2021-9-42-16-pm-1536x720.png)
*kubectl get service/dotnetapi-service*

![](/assets/images/aspnetcoreawseks/dotnetapi.yaml-dotnetapi-visual-studio-code-8-16-2021-9-49-39-pm-1536x720.png)
*updated containerPort, port and targetPort*

![](/assets/images/aspnetcoreawseks/a7eddbf5e5f594b32b4f127603f1de51-188864526.us-east-1.elb.amazonaws.com-weatherforecast-google-chrome-8-16-2021-9-50-04-pm-1407x381.png)
*Navigating to the loadbalancer/cluster*
