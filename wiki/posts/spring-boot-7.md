---
type: post
slug: spring-boot-7
title: "Java Spring Boot (Part 7)"
date: "2025-09-20"
part: 7
builds_on: []
topics: [spring-boot, azure-cloud, kubernetes-management, application-scaling]
tools: [Azure Spring Apps, Kubernetes, Azure Monitor, Azure CLI, Maven, Tomcat]
status: current
checked: "2026-11-06"
source_hash: "f94c8b23a0dc"
generated_by: gemma4:12b
---

**Summary.** I explain how to host a Java Web Application on Azure Spring Apps while highlighting the service's upcoming retirement. I demonstrate the process of creating a service, deploying an application, and scaling the infrastructure.

## What I did
- I created a service instance and deployed a sample project.
- I explored the differences between scaling up and scaling out.
- I ran the same sample application locally using the Maven wrapper.
- I documented the retirement timeline and the recommended alternatives.

## Claims
- Azure Spring Apps is a managed service that handles the underlying Kubernetes infrastructure.
  > "**It is fully managed, and it runs on Kubernetes.** Each service instance has two dedicated Kubernetes clusters that Azure Spring Apps manages and hides from me."
- The service is entering a three-year retirement period starting in March 2025.
  > "Microsoft's retirement announcement says that all Azure Spring Apps plans, Basic, Standard and Enterprise, entered a three-year retirement period on March 17, 2025, and will be retired on March 31, 2028."
- Microsoft recommends Azure Container Apps and Azure Kubernetes Service as replacements.
  > "The service has not accepted new customers since March 17, 2025, and Microsoft recommends Azure Container Apps and Azure Kubernetes Service as the replacements."
- Scaling out is the preferred method for handling a high volume of concurrent visitors.
  > "Scale out is the usual first choice for many visitors at once, because more instances share the requests."
- The local execution uses an embedded Tomcat server on port 8080.
  > "That is why the log says Tomcat initialized with port 8080: the application brings its own web server, and nothing else needs to be installed to run it."
- The entry-level plan for the service starts at 170.82 USD per month.
  > "The create page described the entry-level plan as starting from 170.82 USD a month, so check what your plan charges while the service is running, and stop or delete the resources when you have finished."

## Outcome
I built a running hello-world-app on Azure Spring Apps and documented the service's lifecycle. I concluded that while the service is convenient, users should transition to Azure Container Apps due to the upcoming retirement.

## Caveats
I used screenshots from October 2023, so the post serves as a historical record rather than a guide for new projects.
