---
type: post
slug: mcpserver
title: "Model Context Protocol (Part 1)"
date: "2025-08-13"
part: 1
builds_on: []
topics: [model-context-protocol, typescript-development, ai-agent-tools, visual-studio-code-integration]
tools: [TypeScript, MCP Inspector, Visual Studio Code, npx]
status: current
checked: "2026-11-05"
source_hash: "42ceed36db51"
generated_by: gemma4:12b
---

**Summary.** I explain the Model Context Protocol and how it enhances the reasoning capabilities of AI agents. I demonstrate how to build a server with a multiplication tool and test it using the MCP Inspector and Visual Studio Code.

## What I did
- I built an MCP server using the TypeScript quick start.
- I added a multiplication tool to the server.
- I tested the tools using the MCP Inspector.
- I integrated the server with the Visual Studio Code chat window.

## Claims
- The Model Context Protocol improves how AI agents plan and reason.
  > "Model Context Protocol (MCP) is a framework designed to enhance the reasoning and planning capabilities of AI agents."
- The Inspector serves as a test client for the server.
  > "The Inspector is a test client."
- The server functions independently of the Inspector.
  > "The server runs on its own, and the Inspector only calls its tools so you can check them."
- The Inspector allows for direct testing of tools before an AI client is involved.
  > "The MCP Inspector tests those tools directly, before any AI client is involved."
- The usefulness of a tool depends on the description provided to the model.
  > "A tool you add, like multiplication, is only as useful as the description the model sees."

## Outcome
I built a functional MCP server that provides a multiplication tool to an AI chat interface. I confirmed that the Inspector is an effective tool for verifying server functionality.

## Caveats
The post does not detail the specific internal logic of the multiplication tool beyond its description.
