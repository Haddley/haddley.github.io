---
type: post
slug: devenv
title: "Business Central (Part 7)"
date: "2025-11-17"
part: 7
builds_on: []
topics: [business-central, docker-containers, powershell-automation, development-environments]
tools: [Dynamics 365 Business Central, Docker, BCContainerHelper, PowerShell]
status: current
checked: "2026-11-05"
source_hash: "9a413c486526"
generated_by: gemma4:12b
---

**Summary.** I describe how to set up a container-based development environment for Dynamics 365 Business Central using Docker. I demonstrate how to use the BCContainerHelper module to automate the creation and management of these containers.

## What I did
- I installed the BCContainerHelper PowerShell module.
- I retrieved the latest sandbox artifact URL for the United States.
- I created a new Business Central container named mysandbox.
- I verified the connection and reviewed the demonstration company data.

## Claims
- The BCContainerHelper module simplifies the management of Business Central containers.
  > "A: A PowerShell module that makes it simple to create and manage Business Central containers."
- The Get-BcArtifactUrl command determines which specific build of Business Central to use.
  > "A: Get-BcArtifactUrl chooses which Business Central build to use."
- The name provided during container creation becomes the host name for the browser.
  > "The name that I gave New-BCContainer became the host name."
- The New-BCContainer command includes an option to accept the end-user license agreement automatically.
  > "The -accept_eula option on New-BCContainer agrees to the end-user licence agreement on your behalf."
- The container successfully hosted the CRONUS USA, Inc. demonstration company.
  > "The container held the CRONUS USA, Inc. demonstration company."

## Outcome
I built a container-based development environment for Business Central. I successfully automated the container creation process using PowerShell commands.

## Caveats
The post does not show the specific legal terms of the end-user license agreement.
