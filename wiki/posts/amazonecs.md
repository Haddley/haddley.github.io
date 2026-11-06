---
type: post
slug: amazonecs
title: "Amazon Elastic Container Service"
date: "2021-09-20"
builds_on: [docker, kubernetes]
topics: [amazon-ecs, amazon-eks, container-orchestration, aws-management]
tools: [Amazon ECS, Amazon EKS, Amazon Fargate, kubectl, aws-cli, eksctl]
status: current
checked: "2026-11-05"
source_hash: "59a01fe59277"
generated_by: gemma4:12b
---

**Summary.** I explore the differences between Amazon ECS and Amazon EKS for managing containerized applications. I demonstrate how to use various tools to deploy and manage clusters on the AWS cloud.

## What I did
- I compared Amazon ECS, EKS, and Fargate.
- I configured my AWS credentials using the command line.
- I used eksctl to create and delete a Kubernetes cluster.
- I deployed containers using the kubectl client.

## Claims
- Amazon offers both ECS and Fargate as alternatives to EKS.
  > "Amazon also offers Amazon Elastic Container Service (Amazon ECS) and Amazon Fargate."
- Applications on EKS are compatible with any standard Kubernetes environment.
  > "Since Amazon EKS is based on the open-source tool Kubernetes, all applications managed by Amazon EKS are fully compatible with applications managed by any standard Kubernetes environment."
- I used the aws command line tool to manage the cloud.
  > "I used the aws command line tool to manage the Amazon Web Services cloud."
- I used eksctl to create the cluster.
  > "I used eksctl, a simple CLI tool for creating clusters on EKS — Amazon's managed Kubernetes service for EC2."
- I deleted my access keys because publishing them is not a good idea.
  > "Publishing AWS access keys is not a great idea, so I deleted mine."

## Outcome
I demonstrated how to deploy and manage containerized applications using both EKS and the standard AWS command line tools.

## Caveats
The post does not provide a detailed comparison of the specific performance metrics between ECS and EKS.
