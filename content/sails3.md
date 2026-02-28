---
title: "Sails (Part 3)"
description: "Sails and the Amazon Elastic Kubernetes Service"
date: "2021-10-13"
categories: ["DevOps"]
tags: "sails-js, amazon-eks, kubernetes, node"
slug: "sails3"
image: "/assets/images/sails3/sailsjs-logo-515x193.png"
---


## Dockerfile

I built a Docker container for the Sails application.

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-3-56-13-pm-1020x542.png)
*I reviewed the Dockerfile*

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-3-56-32-pm-1020x542.png)
*I opened the Command Palette*

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-3-56-40-pm-1380x733.png)
*I selected Docker Image: Build Image*

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-3-56-51-pm-1380x733.png)
*haddleysails:latest*


## Docker Desktop

I ran the Docker image on my laptop.

![](assets/images/sails3/images-list-10-14-2021-12-43-16-pm-1836x975.png)
*The haddleysails image is displayed in Docker Desktop*

![](assets/images/sails3/images-list-10-14-2021-12-43-41-pm-1836x975.png)
*I ran the image*

![](assets/images/sails3/sails-application-google-chrome-10-14-2021-12-44-05-pm-1836x975.png)
*I accessed the container using http://localhost*

![](assets/images/sails3/sails-application-google-chrome-10-14-2021-12-44-16-pm-1836x975.png)
*I used the container running locally to retrieve the articles data*

![](assets/images/sails3/container-list-10-14-2021-12-44-44-pm-1836x975.png)
*I removed the container*

![](assets/images/sails3/container-list-10-14-2021-12-44-54-pm-1836x975.png)
*No containers were running*


## Docker Desktop support for Kubernetes

I ran Kubernetes pods on my laptop.

![](assets/images/sails3/haddley-sails-local.yaml-haddley-sails-visual-studio-code-10-14-2021-12-45-48-pm-1836x1033.png)
*I used kubectl to run multiple copies of the Docker image*

![](assets/images/sails3/container-list-10-14-2021-12-46-04-pm-1836x975.png)
*The Kubernetes pods were running*

![](assets/images/sails3/localhost-articles-google-chrome-10-14-2021-12-46-15-pm-1836x975.png)
*I accessed the pods using http://localhost*

![](assets/images/sails3/sails-application-google-chrome-10-14-2021-12-44-16-pm-1836x975.png)
*I used the pods running locally to retrieve the articles data*

![](assets/images/sails3/haddley-sails-local.yaml-haddley-sails-visual-studio-code-10-14-2021-12-46-56-pm-1836x1033.png)
*I removed the application/pods*

![](assets/images/sails3/container-list-10-14-2021-12-44-54-pm-1836x975.png)
*No pods/containers were running*


## Amazon Container Services

I pushed the Docker image to the Amazon Elastic Container Registry.

![](assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-06-47-pm-1380x733.png)
*I created a repository*

![](assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-07-21-pm-1380x733.png)
*I named the repository haddleysails*

![](assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-07-30-pm-1380x733.png)
*The repository was created*

![](assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-07-39-pm-1380x733.png)
*haddleysails repository*

![](assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-07-59-pm-1380x733.png)
*I viewed the push commands*

![](assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-08-24-pm-1380x733.png)
*macOS / Linux commands*

![](assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-08-33-pm-1380x733.png)
*Windows commands*

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-24-02-pm-1380x733.png)
*I ran docker build -t haddleysails .*

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-26-07-pm-1380x733.png)
*The build finished*

![](assets/images/sails3/amazon-ecr-google-chrome-10-13-2021-4-26-15-pm-1380x733.png)
*commands*

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-26-41-pm-1380x733.png)
*I ran docker tag ...*

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-27-04-pm-1380x733.png)
*I ran docker push ...*


## eksctl

I used eksctl to create the Amazon EKS cluster.

![](assets/images/sails3/dockerfile-haddley-sails-visual-studio-code-10-13-2021-4-33-23-pm-1380x733.png)
*eksctl create cluster --name haddley-sails*

![](assets/images/sails3/amazon-eks-google-chrome-10-13-2021-4-36-18-pm-1380x733.png)
*There were no clusters yet*

![](assets/images/sails3/amazon-eks-google-chrome-10-13-2021-4-40-46-pm-1380x733.png)
*The haddley-sails cluster was being created*

![](assets/images/sails3/haddley-sails.yaml-haddley-sails-visual-studio-code-10-13-2021-7-04-51-pm-1380x733.png)
*The Amazon EKS cluster is ready*

![](assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-05-19-pm-1380x733.png)
*The haddley-sails cluster is active*

![](assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-05-28-pm-1380x733.png)
*Two nodes in the cluster*

![](assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-05-39-pm-1380x733.png)
*Workloads*


## kubectl

I used kubectl to deploy the application to the cluster.

![](assets/images/sails3/haddley-sails.yaml-haddley-sails-visual-studio-code-10-13-2021-7-06-28-pm-1380x733.png)
*kubectl apply -f haddley-sails.yaml*

![](assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-07-14-pm-1380x733.png)
*2 pods desired*

![](assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-07-35-pm-1380x733.png)
*2 pods ready*

![](assets/images/sails3/amazon-eks-google-chrome-10-13-2021-7-07-56-pm-1380x733.png)
*Pods*

![](assets/images/sails3/haddley-sails.yaml-haddley-sails-visual-studio-code-10-13-2021-7-10-12-pm-1380x733.png)
*I retrieved the external IP address*

![](assets/images/sails3/sails-application-google-chrome-10-13-2021-7-10-44-pm-1380x733.png)
*I accessed the home page*

![](assets/images/sails3/sails-application-google-chrome-10-13-2021-7-11-43-pm-1380x733.png)
*Articles*


## Dockfile

```yaml
FROM node:8
LABEL maintainer="Azure App Service Container Images <appsvc-images@microsoft.com>"

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .
RUN npm install

EXPOSE 1337
CMD [ "npm", "start" ]
```

## haddley-sails-local.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: haddley-sails-deployment
  labels:
    app: haddley-sails
spec:
  replicas: 2
  selector:
    matchLabels:
      app: haddley-sails
  template:
    metadata:
      labels:
        app: haddley-sails
    spec:
      containers:
        - name: haddley-sails
          image: haddleysails
          imagePullPolicy: Never
          ports:
            - containerPort: 1337
---
apiVersion: v1
kind: Service
metadata:
  name: haddley-sails-service
spec:
  selector:
    app: haddley-sails
  ports:
    - protocol: TCP
      port: 80
      targetPort: 1337
  type: LoadBalancer
```

## haddley-sails.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: haddley-sails-deployment
  labels:
    app: haddley-sails
spec:
  replicas: 2
  selector:
    matchLabels:
      app: haddley-sails
  template:
    metadata:
      labels:
        app: haddley-sails
    spec:
      containers:
        - name: haddley-sails
          image: haddleysails:latest
          ports:
            - containerPort: 1337
---
apiVersion: v1
kind: Service
metadata:
  name: haddley-sails-service
spec:
  selector:
    app: haddley-sails
  ports:
    - protocol: TCP
      port: 80
      targetPort: 1337
  type: LoadBalancer
```