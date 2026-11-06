---
type: post
slug: amazoneks
title: "Amazon Elastic Kubernetes Service"
date: "2021-08-12"
builds_on: [docker, kubernetes]
topics: [amazon-eks, kubernetes-deployment, aws-management, container-orchestration]
tools: [Amazon EKS, Kubernetes, Docker Desktop, aws cli, eksctl, kubectl]
status: current
checked: "2026-11-05"
source_hash: "40f11c4d9161"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to deploy, manage, and scale containerized applications using Amazon Elastic Kubernetes Service. I show that the same kubectl client can manage containers on both a local machine and in the AWS cloud.

## What I did
- I configured my AWS credentials using the command line tool.
- I used eksctl to create and manage an Amazon EKS cluster.
- I deployed containers to the cluster using kubectl.
- I deleted the cluster and my public access keys to ensure security.

## Claims
- Amazon EKS is based on the open-source Kubernetes tool.
  > "Since Amazon EKS is based on the open-source tool Kubernetes, applications managed by Amazon EKS are compatible with applications managed by other Kubernetes environments."
- I used the eksctl tool to create the cluster.
  > "I used eksctl, a simple CLI tool for creating clusters on Amazon EKS."
- I used the kubectl client to deploy containers.
  > "*I used kubectl apply to deploy containers*"
- I deleted my access keys because publishing them is a security risk.
  > "Publishing AWS access keys is not a great idea, so I deleted mine."

## Outcome
I successfully deployed a blog-service to an Amazon EKS cluster and demonstrated the portability of the kubectl client.

## Caveats
The post does not show the specific configuration details for the t2.nano node type.
