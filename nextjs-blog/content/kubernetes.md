---
title: "Kubernetes"
description: "A comprehensive guide covering kubernetes"
date: "2025-09-20"
category: "DevOps"
image: "/assets/images/kubernetes/hero.png"
tags: ["docker","kubernetes","ai","ml"]
---

# Kubernetes

## Kubernetes is a platform for managing containerized workloads.

![Kubernetes (container engine) by Google, Inc. is licensed under CC](/assets/images/kubernetes/kubernetes-container-engine.svg)
*Kubernetes (container engine) by Google, Inc. is licensed under CC*


## Kubernetes

Docker Desktop includes Kubernetes.

Enter these commands to deploy the haddley/blog container image:

$ kubectl create deployment blog --image=haddley/blog --replicas=2

$ kubectl expose deployment blog --type=LoadBalancer --port=8080 --target-port=80

Or create a file called blog.yaml and enter this command:

$ kubectl apply -f .\blog.yaml

Adjust the Kubernetes cluster by editing the yaml file below and "applying" the yaml file again.

Access one of the blog web servers by navigating to:

http://<ip address of the computer running Docker Desktop>:8080

![](/assets/images/kubernetes/image-888x488.png)
*Using the "kubectl create deployment" and "kubectl expose deployment" commands*

![](/assets/images/kubernetes/image-3-888x488.png)
*Using the "kubectl apply" command to apply a yaml file*

![](/assets/images/kubernetes/image-2-1250x720.png)
*The Docker image running in two Kubernetes pods.*

![](/assets/images/kubernetes/screen-shot-2021-02-10-at-2.26.59-pm-1794x1190.png)
*Accessing the cluster using port 8080*
