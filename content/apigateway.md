---
title: "API Gateway"
description: "How to publish a collection of microservices using an API Gateway."
date: "2021-02-10"
categories: ["DevOps"]
tags: ""
slug: "apigateway"
image: "/assets/images/kubernetes-container-engine.svg"
---

Client applications can be configured to connect to services directly. 

Client applications can be configured to connect to services via a gateway.

A client might be a web page running in a browser or a mobile phone app.

![](/assets/images/apigateway/reverse-proxy-528x204.png)


The diagram above demonstrates how an API gateway sits between a client and a collection of services.

An API Gateway introduces latency but provides a number of benefits:

- **Improved security** - User authentication and other security tasks can be managed in one place
- **Better metrics** - Since all traffic flows through the gateway it is easier to add instrumentation  
- **Simpler code** - With the gateway managing security and metrics centrally each service is easier to write


## nginx

Here we use nginx as the basis of our reverse proxy. In the Docker file we specify that the /etc/nginx/conf.d/default.conf file in the nginx image will be replaced by a custom my-server.config

```dockerfile
FROM nginx
COPY ./my-server.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

## Reverse proxy

The proxied server URLs are set using the proxy_pass directive.

```nginx
server {
  listen 80;
  
  default_type text/plain;

  location / {
    proxy_pass http://books-react-service:3000;
  }

  location /books {
    proxy_pass http://books-service:5000;
  }

}
```


## Kubernetes

Kubernetes is a platform for managing containerized workloads.

The yaml file below ensures that there are two copies of the books image, two copies of the books-react image and one copy of the books-reverse-proxy image running at all times. 

The books-reverse-proxy image is the API Gateway.

The yaml file below ensures that clients are only able to connect to the API Gateway.

The books container image provides a [REST API Service](/posts/restapiservice). 

The books-react container image provides a [React App](/posts/reactusestateuseeffect).

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: books-deployment
  labels:
    app: books
spec:
  replicas: 2
  selector:
    matchLabels:
      app: books
  template:
    metadata:
      labels:
        app: books
    spec:
      containers:
        - name: books
          image: haddley/books
          ports:
            - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: books-service
spec:
  selector:
    app: books
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: books-react-deployment
  labels:
    app: books
spec:
  replicas: 2
  selector:
    matchLabels:
      app: books-react
  template:
    metadata:
      labels:
        app: books-react
    spec:
      containers:
        - name: books-react
          image: haddley/books-react
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: books-react-service
spec:
  selector:
    app: books-react
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: books-reverse-proxy-deployment
  labels:
    app: books-reverse-proxy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: books-reverse-proxy
  template:
    metadata:
      labels:
        app: books-reverse-proxy
    spec:
      containers:
        - name: books-reverse-proxy
          image: haddley/books-reverse-proxy
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: books-reverse-proxy-service
spec:
  selector:
    app: books-reverse-proxy
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```


## Kubernetes Hosting

Kubernetes hosting is offered by Microsoft (Azure), Amazon (AWS) and Google (Google Cloud). 

Kubernetes can be run on a developer's laptop using Docker Desktop or Minikube.

Kubernetes can be run on a collection of Raspberry Pi computers using K3s.

Shown below is a copy of Docker Desktop hosting the Kubernetes cluster described above.

![Docker Desktop](/assets/images/apigateway/image-5-1250x720.png)
*Docker Desktop*