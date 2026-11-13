---
type: post
slug: apigateway
title: "API Gateway"
date: "2021-02-10"
builds_on: [restapiservice, reactusestateuseeffect]
topics: [api-gateways, microservices, reverse-proxies, kubernetes-orchestration]
tools: [nginx, Docker, Kubernetes, React, Azure, AWS]
status: current
checked: "2026-11-05"
source_hash: "d3ae88fa9914"
generated_by: gemma4:12b
---

**Summary.** I explain how to publish a collection of microservices using an API Gateway. I demonstrate how a gateway improves security, metrics, and code simplicity while acting as a central entry point for clients.

## What I did
- I configured client applications to connect to services via a gateway.
- I used nginx as the basis of my reverse proxy.
- I configured the proxy_pass directive to set proxied server URLs.
- I deployed the infrastructure using Kubernetes.
- I configured the network so that clients only connect to the gateway.

## Claims
- An API Gateway provides benefits such as improved security and better metrics.
  > "An API Gateway introduces latency but provides a number of benefits:"
- I used nginx as the basis of my reverse proxy.
  > "I used nginx as the basis of my reverse proxy."
- The books-reverse-proxy image functions as the API Gateway.
  > "The books-reverse-proxy image is the API Gateway."
- The books container image provides a REST API Service.
  > "The books container image provides a REST API Service."
- The books-react container image provides a React App.
  > "The books-react container image provides a React App."
- I ran Kubernetes on my laptop using Docker Desktop.
  > "I ran Kubernetes on my laptop using Docker Desktop."

## Outcome
I built a system where a central API Gateway manages security and routing for a collection of microservices. This architecture simplifies the code for individual services and provides a single point for instrumentation.

## Caveats
The post does not detail the specific performance impact of the latency introduced by the gateway.
