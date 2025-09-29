---
title: "Amazon Elastic Container Service"
description: "Deploying to Amazon ECS"
date: "2021-09-20"
categories: ["AWS","DevOps","AI"]
tags: []
slug: "amazonecs"
image: "/assets/images/amazonecs/amazon-web-services-logo.svg"
---

Amazon Elastic Kubernetes Service (Amazon EKS) makes it possible to deploy, manage, and scale [containerized](docker.html) applications using [Kubernetes](kubernetes.html) on AWS. 

https://logz.io/blog/aws-eks-vs-ecs-vs-fargate-understand-differences/

Notice that Amazon also offer Amazon Elastic Container Service (Amazon ECS) and Amazon Fargate.

Since Amazon EKS is based on the open-source tool Kubernetes, all applications managed by Amazon EKS are fully compatible with applications managed by any standard Kubernetes environment.

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.20.10-pm-1836x1075.png)
*Login to aws.amazon.com*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.21.06-pm-1836x1048.png)
*AWS Management Console*


## Docker desktop

To demonstrate that it is possible to use the same kubectl client to deploy containers to a laptop or the AWS cloud consider this Docker desktop example.

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.16.52-pm-1836x1039.png)
*No containers running*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.17.46-pm-1836x1182.png)
*kutectl apply -f ./blog.yaml*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.18.30-pm-1836x1041.png)
*The cluster is running*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.18.57-pm-1836x1076.png)
*Accessing the Docker desktop cluster*


## aws cli

The aws command line tool is used to manage the Amazon Web Services cloud.

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-8.06.57-pm-1836x758.png)
*Creating a New AWS Access Key*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-8.07.09-pm-1472x456.png)
*Access Key Created*


## aws configure

aws configure is used to set credentials

```bash
% aws configure
```

AWS Access Key ID [None]: AKIAYLZDACM7MNDENQV4
AWS Secret Access Key [None]: iBXYnPPUTp+enyaVU2xvXXXXXXXXXXXXXXXXXXXX
Default region name [None]: 
Default output format [None]:


## eksctl

eksctl is a simple CLI tool for creating clusters on EKS - Amazon's managed Kubernetes service for EC2.

[https://github.com/weaveworks/eksctl](https://github.com/weaveworks/eksctl)

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.29.15-pm-1836x1016.png)
*eksctl documentation on the AWS site*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.48.33-pm-1836x1091.png)
*ekctl project on github*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.48.04-pm-1138x738.png)
*installing eksctl*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-7.52.44-pm-1836x934.png)
*No clusters*


## eksctl create cluster

```bash
% eksctl create cluster \
```

--name blog-cluster \
--node-type t2.nano \
--nodes 2

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-8.41.19-pm-1836x1185.png)
*using eskctl to create a cluster (node type t2.nano)*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-8.43.21-pm-1836x953.png)
*blog-cluster is being created*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.03.14-pm-1836x951.png)
*blog-cluster active*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.03.31-pm-1836x954.png)
*blog-cluster Elastic Cloud Compute (EC2) nodes created*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.03.56-pm-1836x1188.png)
*eksctl command finished*


## kubectl apply

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.06.36-pm-1836x1180.png)
*Using kubectl apply command to deploy containers*


## eksctl delete cluster

using ekctl delete to remove the cluster

```bash
% eksctl delete cluster \
```

--name blog-cluster

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.38.35-pm-1836x1181.png)
*eksctl delete cluster*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.40.30-pm-1836x954.png)
*The cluster has been deleted*


## Deleting an AWS Access Key

Publishing AWS Access Keys is not a great idea.

This is how Keys are deleted.

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.47.55-pm-1836x956.png)
*Select the Delete link*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.48.09-pm-1836x953.png)
*Click the Deactivate button*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.49.34-pm-1836x955.png)
*Confirm the access key name and click the Delete button*

![](/assets/images/amazonecs/screen-shot-2021-08-12-at-9.49.50-pm-1836x956.png)
*The Access key has been deleted*