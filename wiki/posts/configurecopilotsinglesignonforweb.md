---
type: post
slug: configurecopilotsinglesignonforweb
title: "Configure Copilot single sign-on for Web"
date: "2024-03-16"
builds_on: []
topics: [single-sign-on, copilot-studio, authentication-configuration, application-registration]
tools: [Microsoft Copilot Studio, Microsoft Entra ID, GitHub]
status: current
checked: "2026-11-05"
source_hash: "1f839bf25657"
generated_by: gemma4:12b
---

**Summary.** I explain how to configure single sign-on for Microsoft Copilot. I demonstrate the process of creating application registrations to allow seamless user authentication on a custom website.

## What I did
- I identified the requirement for single sign-on to authenticate users on a web page.
- I created two Application Registrations to facilitate the authentication flow.
- I configured the Copilot Studio Security page with the necessary Client ID and Client Secret.
- I integrated the Copilot into a custom website using provided sample code.

## Claims
- Microsoft Copilot Studio supports single sign-on.
  > "Microsoft Copilot Studio supports single sign-on (SSO)."
- Single sign-on allows users to stay signed in across the page and the copilot.
  > "SSO allows copilots on your website to sign customers in if they're already signed in to the page or app where the copilot is deployed."
- I created two Application Registrations to configure the single sign-on.
  > "To configure Copilot with single sign-on, I created two Application Registrations."
- I used specific sample code from a GitHub repository to implement the solution.
  > "*I used code from https://github.com/microsoft/CopilotStudioSamples/blob/master/BuildYourOwnCanvasSamples/3.single-sign-on/index.html*"

## Outcome
I built a configuration for Copilot with single sign-on. I successfully integrated the copilot into a custom website using multiple application registrations.

## Caveats
The post does not show the specific internal configuration of the Canvas App Registration.
