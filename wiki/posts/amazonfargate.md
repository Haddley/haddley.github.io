---
type: post
slug: amazonfargate
title: "Amazon Fargate"
date: "2021-09-20"
builds_on: [docker, kubernetes]
topics: [aws-fargate, amazon-eks, container-orchestration, serverless-computing]
tools: [AWS Fargate, Amazon ECS, Amazon EKS, kubectl, Docker Desktop, eksctl]
status: current
checked: "2026-11-05"
source_hash: "5501f35174ff"
generated_by: gemma4:12b
---

**Summary.** I explored how to run containerized applications using AWS Fargate and Amazon EKS. I demonstrated the process of managing these services using the AWS command line and the eksctl tool.

## What I did
- I used AWS Fargate to run containers on ECS and EKS.
- I used the aws command line tool to manage cloud resources.
- I used eksctl to create and delete Kubernetes clusters.
- I demonstrated that kubectl can deploy containers to both local and cloud environments.

## Claims
- I used a serverless pay-as-you-go compute engine to run containers.
  > "I used AWS Fargate, a serverless pay-as-you-go compute engine, to run containers on Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS)."
- Applications managed by Amazon EKS are compatible with standard Kubernetes environments.
  > "Since Amazon EKS is based on the open-source tool Kubernetes, all applications managed by Amazon EKS are fully compatible with applications managed by any standard Kubernetes environment."
- I used the aws command line tool to manage the cloud.
  > "I used the aws command line tool to manage the Amazon Web Services cloud."
- I used eksctl to create clusters on the managed Kubernetes service.
  > "I used eksctl, a simple CLI tool for creating clusters on EKS — Amazon's managed Kubernetes service for EC2."
- I deleted my access keys because publishing them is not a good idea.
  > "Publishing AWS access keys is not a great idea, so I deleted mine."

## Outcome
I successfully demonstrated how to deploy and manage containerized applications using AWS Fargate and Amazon EKS.

## Caveats
The post does not show the specific configuration details for the production environment.
