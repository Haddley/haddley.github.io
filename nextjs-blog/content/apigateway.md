---
title: "API Gateway"
description: "A comprehensive guide covering api gateway"
date: "2025-09-20"
category: "Development"
image: "/assets/images/apigateway/hero.png"
tags: ["react","azure","aws","cloud","docker"]
---

# API Gateway

## How to publish a collection of microservices using an API Gateway.

![Kubernetes](/assets/images/apigateway/kubernetes-container-engine.svg)
*Kubernetes (container engine) by Google, Inc. is licensed under CC*


## Microservices

Client applications can be configured to connect to services directly. 

Client applications can be configured to connect to services via a gateway.

A client might be a web page running in a browser or a mobile phone app.

![](/assets/images/apigateway/reverse-proxy-528x204.png)


## API Gateway

The diagram above demonstrates how an API gateway sits between a client and a collection of services.

An API Gateway introduces latency but provides a number of benefits:

**Improved security **User authentication and other security tasks can be managed in one place
                        **Better metrics **Since all traffic flows through the gateway it is easier to add instrumentationSimpler code With the gateway managing security and metrics centrally each service is easier to write


## nginx

Here we use nginx as the basis of our reverse proxy. In the Docker file we specify that the /etc/nginx/conf.d/default.conf file in the nginx image will be replaced by a custom my-server.config


## Reverse proxy

The proxied server URLs are set using the proxy_pass directive.


## Kubernetes

Kubernetes is a platform for managing containerized workloads.

The yaml file below ensures that there are two copies of the books image, two copies of the books-react image and one copy of the books-reverse-proxy image running at all times. 

The books-reverse-proxy image is the API Gateway.

The yaml file below ensures that clients are only able to connect to the API Gateway.

The books container image provides a [REST API Service](restapiservice.html). 

The books-react container image provides a [React App](reactusestateuseeffect.html).


## Kubernetes Hosting

Kubernetes hosting is offered by Microsoft (Azure), Amazon (AWS) and Google (Google Cloud). 

Kubernetes can be run on a developer's laptop using Docker Desktop or Minikube.

Kubernetes can be run on a collection of Raspberry Pi computers using K3s.

Shown below is a copy of Docker Desktop hosting the Kubernetes cluster described above.

![Docker Desktop](/assets/images/apigateway/image-5-1250x720.png)
*Docker Desktop*
