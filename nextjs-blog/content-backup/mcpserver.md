---
title: "Model Context Protocol (Part 1)"
description: "A comprehensive guide covering model context protocol (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/mcpserver.png"
tags: ["typescript","ai"]
---

# Model Context Protocol (Part 1)

Model Context Protocol (Part 1) Typescript Quickstart The Model Context Protocol is an open source project run by Anthropic, PBC. Typescript Quickstart Model Context Protocol (MCP) is a framework designed to enhance the reasoning and planning capabilities of AI agents. In my Prompt flow with Semantic Kernel and Planner post I demonstrated that large language models rely on tools to do maths. The model context protocol Typescript quick start demonstrates how to create a model context protocol server with an addition tool. I added a multiplication tool to the model context protocol sample (see the updated code below). main.ts I used the model context protocol inspector to test the server I clicked Connect I clicked Tools I clicked on the mulipy tool , entered arguments and clicked Run Tool I clicked the Visual Studio Code Command Palette menu item and entered mcp I selected Command I entered the command needed to run the mcp server npx -y tsx main.ts I accepted the generated name I selected Workspace I clicked Trust I used Visual Studio Code's chat window to ask the Large Language Model to multiply 2134.567 by 653.23 With the help of the multiply tool the Large Language Model was able to provide the correct answer References Building Your First MCP Server: A Beginners Tutorial New Lab! Learn How to Connect MCP to Copilot Studio
