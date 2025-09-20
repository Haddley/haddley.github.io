---
title: "Amazon Elastic Kubernetes Service (Amazon EKS)"
description: "A comprehensive guide covering amazon elastic kubernetes service (amazon eks)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/amazon-web-services-logo.svg"
tags: ["aws","cloud","docker","kubernetes","ai"]
---

# Amazon Elastic Kubernetes Service (Amazon EKS)

## Deploying to Amazon Elastic Kubernetes Service (Amazon EKS)

![AWS](/assets/images/amazoneks/amazon-web-services-logo.svg)
*By Amazon.com Inc. - Amazon, Apache License 2.0*


## Amazon Elastic Kubernetes Service (Amazon EKS)

Amazon Elastic Kubernetes Service (Amazon EKS) makes it possible to deploy, manage, and scale [containerized](docker.html) applications using [Kubernetes](kubernetes.html) on AWS. 

Since Amazon EKS is based on the open-source tool [Kubernetes](kubernetes.html), applications managed by Amazon EKS are compatible with applications managed by other Kubernetes environments.

Notice that Amazon also offer the Amazon Elastic Container Service (Amazon ECS).


## Docker desktop

To demonstrate that it is possible to use the same kubectl client to deploy containers to a laptop or Amazon EKS consider this Docker desktop example.

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.16.52-pm-1836x1039.png)
*No containers running*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.17.46-pm-1836x1182.png)
*kutectl apply -f ./blog.yaml*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.18.30-pm-1836x1041.png)
*The cluster is running*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.18.57-pm-1836x1076.png)
*Accessing the Docker desktop cluster*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.20.10-pm-1836x1075.png)
*Login to aws.amazon.com*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.21.06-pm-1836x1048.png)
*AWS Management Console*


## aws cli

The aws command line tool is used to manage the Amazon Web Services cloud.

![](/assets/images/amazoneks/screen-shot-2021-08-16-at-8.07.43-pm-902x618.png)
*My Security Credentials*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-8.06.57-pm-1836x758.png)
*Creating a New AWS Access Key*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-8.07.09-pm-1472x456.png)
*Access Key Created*


## aws configure

aws configure is used to set credentials

% aws configure
AWS Access Key ID [None]: AKIAYLZDACM7MNDENQV4
AWS Secret Access Key [None]: iBXYnPPUTp+enyaVU2xvXXXXXXXXXXXXXXXXXXXX
Default region name [None]: 
Default output format [None]:


## eksctl

eksctl is a simple CLI tool for creating clusters on Amazon EKS.

[https://github.com/weaveworks/eksctl](https://github.com/weaveworks/eksctl)

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.29.15-pm-1836x1016.png)
*eksctl documentation on the AWS site*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.48.33-pm-1836x1091.png)
*ekctl project on github*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.48.04-pm-1138x738.png)
*installing eksctl*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.52.44-pm-1836x934.png)
*No clusters*


## eksctl create cluster

```bash
% eksctl create cluster \
--name blog-cluster 
```

optional arguments:

**--node-type t2.nano \
--nodes 2**

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-8.41.19-pm-1836x1185.png)
*using eskctl to create a cluster (node type t2.nano)*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-8.43.21-pm-1836x953.png)
*blog-cluster is being created*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.03.14-pm-1836x951.png)
*blog-cluster active*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.03.31-pm-1836x954.png)
*blog-cluster Elastic Cloud Compute (EC2) nodes created*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.03.56-pm-1836x1188.png)
*~/neilhaddley/.kube/config file has been updated*


## kubectl apply

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.06.36-pm-1836x1180.png)
*Using kubectl apply command to deploy containers*

![](/assets/images/amazoneks/screen-shot-2021-08-15-at-2.48.29-pm-1836x924.png)
*cluster workloads*


## kubectl get

Get information about blog-service

kubectl [get service/blog-service](https://aws.amazon.com/premiumsupport/knowledge-center/eks-kubernetes-services-cluster/) |  awk {'print $1" " $2 " " $4 " " $5'} | column -t

![](/assets/images/amazoneks/screen-shot-2021-08-15-at-2.44.50-pm-1836x258.png)
*load balancer url*

![](/assets/images/amazoneks/screen-shot-2021-08-15-at-2.45.19-pm-1836x1158.png)
*Accessing the Amazon EKS cluster*


## eksctl delete cluster

using ekctl delete to remove the cluster

% eksctl delete cluster \
--name blog-cluster

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.38.35-pm-1836x1181.png)
*eksctl delete cluster*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.40.30-pm-1836x954.png)
*The cluster has been deleted*


## kubectl config use-context

To switch back to using Docker Desktop

% kubectl config use-context docker-desktop

![](/assets/images/amazoneks/screen-shot-2021-08-15-at-2.10.40-pm-1836x1036.png)
*switch back to docker-desktop*


## Deleting an AWS Access Key

Publishing AWS Access Keys is not a great idea.

This is how Keys are deleted.

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.47.55-pm-1836x956.png)
*Select the Delete link*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.48.09-pm-1836x953.png)
*Click the Deactivate button*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.49.34-pm-1836x955.png)
*Confirm the access key name and click the Delete button*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.49.50-pm-1836x956.png)
*The Access key has been deleted*
