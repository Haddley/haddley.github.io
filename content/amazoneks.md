---
title: "Amazon Elastic Kubernetes Service"
description: "Deploying to Amazon EKS"
date: "2021-08-12"
categories: ["AWS","DevOps"]
tags: "amazon-eks, kubernetes, aws, containers"
hidden: false
slug: "amazoneks"
image: "/assets/images/amazoneks/amazon-web-services-logo.svg"
---

I used Amazon Elastic Kubernetes Service (Amazon EKS) to deploy, manage, and scale [containerized](/posts/docker/) applications using [Kubernetes](/posts/kubernetes/) on AWS.

Since Amazon EKS is based on the open-source tool [Kubernetes](/posts/kubernetes/), applications managed by Amazon EKS are compatible with applications managed by other Kubernetes environments.

Amazon also offers the Amazon Elastic Container Service (Amazon ECS).


## Docker desktop

To demonstrate that I could use the same kubectl client to deploy containers to a laptop or Amazon EKS, I used this Docker Desktop example.

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.16.52-pm-1836x1039.png)
*No containers were running*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.17.46-pm-1836x1182.png)
*I ran kubectl apply -f ./blog.yaml*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.18.30-pm-1836x1041.png)
*The cluster was running*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.18.57-pm-1836x1076.png)
*I accessed the Docker Desktop cluster*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.20.10-pm-1836x1075.png)
*I logged in to aws.amazon.com*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.21.06-pm-1836x1048.png)
*I navigated to the AWS Management Console*


## aws cli

I used the aws command line tool to manage the Amazon Web Services cloud.

![](/assets/images/amazoneks/screen-shot-2021-08-16-at-8.07.43-pm-902x618.png)
*I opened My Security Credentials*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-8.06.57-pm-1836x758.png)
*I created a new AWS access key*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-8.07.09-pm-1472x456.png)
*The access key was created*


## aws configure

I used aws configure to set credentials.

```bash
% aws configure
```

AWS Access Key ID [None]: AKIAYLZDACM7MNDENQV4
AWS Secret Access Key [None]: iBXYnPPUTp+enyaVU2xvXXXXXXXXXXXXXXXXXXXX
Default region name [None]:
Default output format [None]:


## eksctl

I used eksctl, a simple CLI tool for creating clusters on Amazon EKS.

[https://github.com/weaveworks/eksctl](https://github.com/weaveworks/eksctl)

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.29.15-pm-1836x1016.png)
*I reviewed the eksctl documentation on the AWS site*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.48.33-pm-1836x1091.png)
*I found the eksctl project on GitHub*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.48.04-pm-1138x738.png)
*I installed eksctl*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-7.52.44-pm-1836x934.png)
*No clusters were running*


## eksctl create cluster

```bash
% eksctl create cluster \
--name blog-cluster
```

Optional arguments:

```bash
--node-type t2.nano \
--nodes 2
```

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-8.41.19-pm-1836x1185.png)
*I used eksctl to create a cluster (node type t2.nano)*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-8.43.21-pm-1836x953.png)
*The blog-cluster was being created*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.03.14-pm-1836x951.png)
*The blog-cluster was active*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.03.31-pm-1836x954.png)
*The blog-cluster EC2 nodes were created*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.03.56-pm-1836x1188.png)
*The ~/.kube/config file was updated*


## kubectl apply

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.06.36-pm-1836x1180.png)
*I used kubectl apply to deploy containers*

![](/assets/images/amazoneks/screen-shot-2021-08-15-at-2.48.29-pm-1836x924.png)
*I reviewed the cluster workloads*


## kubectl get

I retrieved information about blog-service.

```bash
kubectl get service/blog-service | awk {'print $1" " $2 " " $4 " " $5'} | column -t
```

![](/assets/images/amazoneks/screen-shot-2021-08-15-at-2.44.50-pm-1836x258.png)
*I retrieved the load balancer URL*

![](/assets/images/amazoneks/screen-shot-2021-08-15-at-2.45.19-pm-1836x1158.png)
*I accessed the Amazon EKS cluster*


## eksctl delete cluster

I used eksctl delete to remove the cluster.

```bash
% eksctl delete cluster \
  --name blog-cluster
```

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.38.35-pm-1836x1181.png)
*I ran eksctl delete cluster*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.40.30-pm-1836x954.png)
*The cluster was deleted*


## kubectl config use-context

I switched back to using Docker Desktop.

```bash
% kubectl config use-context docker-desktop
```


![](/assets/images/amazoneks/screen-shot-2021-08-15-at-2.10.40-pm-1836x1036.png)
*I switched back to docker-desktop*


## Deleting an AWS Access Key

Publishing AWS access keys is not a great idea, so I deleted mine.

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.47.55-pm-1836x956.png)
*I selected the Delete link*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.48.09-pm-1836x953.png)
*I clicked the Deactivate button*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.49.34-pm-1836x955.png)
*I confirmed the access key name and clicked Delete*

![](/assets/images/amazoneks/screen-shot-2021-08-12-at-9.49.50-pm-1836x956.png)
*The access key was deleted*
