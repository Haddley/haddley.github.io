---
title: "Deploying a .NET Core Web API to Amazon EKS"
description: "A comprehensive guide covering deploying a .net core web api to amazon eks"
date: "2025-09-20"
category: "Development"
image: "/assets/images/aspnetcoreawseks.png"
tags: ["aws","docker","kubernetes","dotnet","ai"]
---

# Deploying a .NET Core Web API to Amazon EKS

Amazon EKS (Part 2) Deploying a .NET Core Web API to Amazon Elastic Kubernetes Service (Amazon EKS) By Amazon.com Inc. - Amazon, Apache License 2.0 Amazon Elastic Kubernetes Service (Amazon EKS) Amazon Elastic Kubernetes Service (Amazon EKS) makes it possible to deploy, manage, and scale containerized applications using Kubernetes on AWS. A .NET Core Web API can be deployed to Amazon EKS from Visual Studio Code using the Visual Studio Code terminal window. install eksctl > choco install -y eksctl install eksctl on Windows choco install -y eksctl .NET Core Web API > dotnet new webapi --no-https dotnet new webapi --no-https WeatherForecastController.cs Docker: Add Docker Files to Workspace .Net: ASP.NET Core platform Linux Port 5000 Dockerfile Docker Images: Build Image... Building Create ECR repository Repository created View push commands macOS/Linux View push commands Windows (Get-ECRLoginCommand)... docker build -t dotnetapi . docker tag... docker push... eksctl create cluster --name dotnetapi Cluster EC2 nodes Workloads kubectl apply -f .\dotnetapi.yaml dotnetapi.yaml dotnetapi-service created Workloads kubectl get service/dotnetapi-service updated containerPort, port and targetPort Navigating to the loadbalancer/cluster References ASP.NET Core in a container Docker Hub
