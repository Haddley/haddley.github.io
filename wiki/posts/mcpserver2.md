---
type: post
slug: mcpserver2
title: "Model Context Protocol (Part 2)"
date: "2025-09-21"
part: 2
builds_on: []
topics: [model-context-protocol, microsoft-business-central, azure-container-apps, streamable-http, copilot-studio]
tools: [Microsoft Business Central, Azure Container Apps, Copilot Studio, LM Studio, Docker, Node.js]
status: current
checked: "2026-11-05"
source_hash: "c809c228ca48"
generated_by: gemma4:12b
---

**Summary.** I built a Model Context Protocol server to connect Microsoft Business Central data to AI clients. I deployed the server to Azure Container Apps and integrated it with both Copilot Studio and LM Studio.

## What I did
- I built an MCP server to provide a get_vendors tool for AI clients.
- I configured a Streamable HTTP transport for remote server communication.
- I deployed the application to Azure Container Apps using a Docker image.
- I connected the server to Copilot Studio via a Custom Connector.
- I integrated the server with LM Studio to query vendor data.

## Claims
- The server provides a standard way for AI clients to access specific tools.
  > "A: A small program that offers tools to an AI client in a standard way."
- The Streamable HTTP transport handles both requests and notifications for remote servers.
  > "The Streamable HTTP transport that I set up handles both the client's requests and the server's notifications back to the client."
- I used the Azure Container Apps extension to deploy the application from my workspace.
  > "I used the Azure Container Apps extension for Visual Studio Code to choose existing Container Apps resources and deploy my application."
- The connection status to the MCP-Streamable-HTTP was confirmed as connected.
  > "*I confirmed the status of MCP-Streamable-HTTP was updated to Connected*"
- The server authenticates to Business Central using OAuth 2.0 and values from a local file.
  > "The server authenticates to Business Central over OAuth 2.0, using values held in `.env`."
- I verified that the get_vendors tool was displayed in the interface.
  > "*I confirmed the get_vendors tool was displayed*"

## Outcome
I built a functional MCP server that allows AI assistants to retrieve real vendor data from Microsoft Business Central. I successfully demonstrated this integration across multiple platforms including Copilot Studio and LM Studio.

## Caveats
The post does not include real credentials and advises keeping the actual .env file out of version control.
