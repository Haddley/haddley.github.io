---
title: "Deploying a .NET Core Web API to Amazon EKS"
description: "Deploying a .NET Core Web API to Amazon Elastic Kubernetes Service (Amazon EKS)"
date: "2021-08-16"
categories: ["AWS","DevOps",".NET","Docker"]
tags: "c#"
hidden: false
slug: "aspnetcoreawseks"
image: "/assets/images/aspnetcoreawseks/amazon-web-services-logo.svg"
---


I used Amazon Elastic Kubernetes Service (Amazon EKS) to deploy, manage, and scale [containerized](docker.html) applications using [Kubernetes](kubernetes.html) on AWS.

I deployed a .NET Core Web API to Amazon EKS from Visual Studio Code.


## install eksctl

```bash
choco install -y eksctl
```

![](/assets/images/aspnetcoreawseks/the-eksctl-command-line-utility-amazon-eks-google-chrome-8-16-2021-8-20-21-pm-1836x975.png)
*I installed eksctl on Windows*

![](/assets/images/aspnetcoreawseks/select-administrator-windows-powershell-8-16-2021-8-24-46-pm-1200x440.png)
*I ran choco install -y eksctl*


## .NET Core Web API

```bash
dotnet new webapi --no-https
```

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-28-32-pm-1536x720.png)
*I ran dotnet new webapi --no-https*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-29-44-pm-1536x720.png)
*I selected Docker: Add Docker Files to Workspace*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-29-55-pm-1536x720.png)
*I selected .NET: ASP.NET Core platform*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-30-04-pm-1536x720.png)
*I selected Linux*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-30-15-pm-1536x720.png)
*I selected port 5000*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-31-14-pm-1536x720.png)
*The Dockerfile was generated*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-31-34-pm-1536x720.png)
*I selected Docker Images: Build Image...*

![](/assets/images/aspnetcoreawseks/dotnetapi-visual-studio-code-8-16-2021-8-32-32-pm-1536x720.png)
*The image was building*

![](/assets/images/aspnetcoreawseks/amazon-ecr-google-chrome-8-16-2021-8-34-25-pm-1836x975.png)
*I created an ECR repository*

![](/assets/images/aspnetcoreawseks/amazon-ecr-google-chrome-8-16-2021-8-34-51-pm-1836x975.png)
*The repository was created*

![](/assets/images/aspnetcoreawseks/amazon-ecr-google-chrome-8-16-2021-8-35-04-pm-1836x975.png)
*I viewed the push commands for macOS/Linux*

![](/assets/images/aspnetcoreawseks/amazon-ecr-google-chrome-8-16-2021-8-37-22-pm-1836x975.png)
*I viewed the push commands for Windows*

![](/assets/images/aspnetcoreawseks/administrator-windows-powershell-8-16-2021-9-12-34-pm-1200x440.png)
*I ran the Get-ECRLoginCommand*

![](/assets/images/aspnetcoreawseks/dockerfile-dotnetapi-visual-studio-code-8-16-2021-9-15-23-pm-1536x720.png)
*I ran docker build -t dotnetapi .*

![](/assets/images/aspnetcoreawseks/dockerfile-dotnetapi-visual-studio-code-8-16-2021-9-16-17-pm-1536x720.png)
*I ran docker tag*

![](/assets/images/aspnetcoreawseks/dockerfile-dotnetapi-visual-studio-code-8-16-2021-9-16-42-pm-1536x720.png)
*I ran docker push*

![](/assets/images/aspnetcoreawseks/administrator-windows-powershell-8-16-2021-9-19-09-pm-1200x440.png)
*I ran eksctl create cluster --name dotnetapi*

![](/assets/images/aspnetcoreawseks/amazon-eks-google-chrome-8-16-2021-9-38-55-pm-1644x1069.png)
*I reviewed the cluster EC2 nodes*

![](/assets/images/aspnetcoreawseks/amazon-eks-google-chrome-8-16-2021-9-39-05-pm-1644x1069.png)
*I viewed the workloads*

![](/assets/images/aspnetcoreawseks/dotnetapi.yaml-dotnetapi-visual-studio-code-8-16-2021-9-39-22-pm-1536x720.png)
*I ran kubectl apply -f .\dotnetapi.yaml*

![](/assets/images/aspnetcoreawseks/dotnetapi.yaml-dotnetapi-visual-studio-code-8-16-2021-9-39-31-pm-1536x720.png)
*The dotnetapi-service was created*

![](/assets/images/aspnetcoreawseks/amazon-eks-google-chrome-8-16-2021-9-39-52-pm-1644x1069.png)
*I viewed the updated workloads*

![](/assets/images/aspnetcoreawseks/dotnetapi.yaml-dotnetapi-visual-studio-code-8-16-2021-9-42-16-pm-1536x720.png)
*I ran kubectl get service/dotnetapi-service*

![](/assets/images/aspnetcoreawseks/dotnetapi.yaml-dotnetapi-visual-studio-code-8-16-2021-9-49-39-pm-1536x720.png)
*I updated containerPort, port and targetPort*

![](/assets/images/aspnetcoreawseks/a7eddbf5e5f594b32b4f127603f1de51-188864526.us-east-1.elb.amazonaws.com-weatherforecast-google-chrome-8-16-2021-9-50-04-pm-1407x381.png)
*I navigated to the load balancer URL*


## WeatherForecastController.cs

```text
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnetapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
```

## dotnetapi.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dotnetapi-deployment
  labels:
    app: dotnetapi
spec:
  replicas: 2
  selector:
    matchLabels:
      app: dotnetapi
  template:
    metadata:
      labels:
        app: dotnetapi
    spec:
      containers:
      - name: dotnetapi
        image: 575062151998.dkr.ecr.us-east-1.amazonaws.com/dotnetapi
        ports:
        - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: dotnetapi-service
spec:
  selector:
    app: dotnetapi
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
  type: LoadBalancer
```

## References

- [ASP.NET Core in a container](https://code.visualstudio.com/docs/containers/quickstart-aspnet-core)
