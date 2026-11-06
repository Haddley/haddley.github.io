---
type: post
slug: azureopenal
title: "Azure AI service"
date: "2025-02-04"
builds_on: []
topics: [azure-ai-services, openai-models, deployment-setup, chat-playground]
tools: [Azure OpenAI Service, GPT-4, GPT-3.5, Codex, Whisper, Azure AI Foundry]
status: current
checked: "2026-11-05"
source_hash: "d32dc911d506"
generated_by: gemma4:12b
---

**Summary.** I explain how to access OpenAI models through the Azure AI Foundry portal. I demonstrate the process of creating a deployment and testing it in the Chat playground.

## What I did
- I identified the available OpenAI models.
- I created a new Azure OpenAI service.
- I navigated to the Azure AI Foundry portal.
- I created a new deployment.
- I tested the model and reviewed the endpoint details.

## Claims
- Azure OpenAI provides access to several generative AI models.
  > "Azure OpenAI is a service that provides access to OpenAI's generative AI models, including:"
- The service supports models for natural language processing.
  > "GPT-4, GPT-3.5 (for natural language processing)"
- The service supports models for code generation.
  > "Codex (for code generation and AI-assisted development)"
- The service supports models for speech-to-text transcription.
  > "Whisper (for speech-to-text transcription)"
- The service supports applications like chatbots and automation.
  > "Azure OpenAI Service is used for AI applications, including chatbots, document summarization, and AI-powered automation."
- I verified the endpoint details including the Target URI and the Key.
  > "*I reviewed the Endpoint details (the Target URI and the Key)*"

## Outcome
I built a functional deployment of an OpenAI model within the Azure environment. I confirmed the configuration by testing it in the Chat playground.

## Caveats
The post does not show the specific configuration of the internal network security for the endpoint.
