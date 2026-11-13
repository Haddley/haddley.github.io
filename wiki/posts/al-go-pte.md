---
type: post
slug: al-go-pte
title: "AL-Go-PTE"
date: "2023-08-26"
builds_on: []
topics: [business-central, per-tenant-extensions, devops-automation, docker-containers]
tools: [Business Central, AL-Go, VS Code, Docker, GitHub, PowerShell]
status: current
checked: "2026-11-05"
source_hash: "2d9fa5d438fd"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to use the AL-Go-PTE template to create a Business Central per-tenant extension. I show how to set up a local development environment using Docker and PowerShell to test changes without affecting a live company.

## What I did
- I used the AL-Go-PTE template to create a per-tenant extension.
- I configured Docker to run Windows containers for the Business Central image.
- I ran the localDevEnv.ps1 script to build a local container.
- I published a hello world extension and verified the changes in the browser.

## Claims
- I used a specific template for per-tenant extensions.
  > "I used the AL-Go-PTE template, which is for a per-tenant extension."
- I switched to Windows containers because the Business Central image is a Windows image.
  > "A: The Business Central container image is a Windows image, so Docker had to run Windows containers and not Linux ones."
- The localDevEnv.ps1 script builds a local Business Central container for publishing.
  > "localDevEnv.ps1 builds a local Business Central container that I can publish to."
- I verified the change by seeing the new message in the running container.
  > "I changed the hello world message and saw the change in the running container."
- I used a specific set of tools to set up the development environment.
  > "I needed Docker set to Windows containers, Git, GitHub Desktop and VS Code with the AL extension."

## Outcome
I built a local development environment where I can develop and test per-tenant extensions. I successfully verified that changes to the hello world extension appeared in the running container.

## Caveats
The post does not show the specific internal configuration of the localDevEnv.ps1 script beyond its primary function of building the container.
