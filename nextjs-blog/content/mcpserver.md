---
title: "Model Context Protocol (Part 1)"
description: "A comprehensive guide covering model context protocol (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/mcpserver/hero.png"
tags: ["typescript","ai"]
---

# Model Context Protocol (Part 1)

## Typescript Quickstart

![](/assets/images/mcpserver/mcp-1024x1024.png)
*The Model Context Protocol is an open source project run by Anthropic, PBC.*


## Typescript Quickstart

Model Context Protocol (MCP) is a framework designed to enhance the reasoning and planning capabilities of AI agents.

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.17.09e280afpm-2136x1248.png)
*In my Prompt flow with Semantic Kernel and Planner post I demonstrated that large language models rely on tools to do maths.*

![](/assets/images/mcpserver/screenshot202025-08-1320at201.17.25e280afpm-2136x1373.png)
*The model context protocol Typescript quick start demonstrates how to create a model context protocol server with an addition tool. I added a multiplication tool to the model context protocol sample (see the updated code below).*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.40.02e280afpm-2136x895.png)
*I used the model context protocol inspector to test the server*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.40.23e280afpm-2136x1380.png)
*I clicked Connect*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.40.34e280afpm-2136x1374.png)
*I clicked Tools*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.44.46e280afpm-2136x1377.png)
*I clicked on the mulipy tool, entered arguments and clicked Run Tool*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.47.03e280afpm-2136x432.png)
*I clicked the Visual Studio Code Command Palette menu item and entered mcp*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.47.21e280afpm-2136x328.png)
*I selected Command*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.48.16e280afpm-2136x407.png)
*I entered the command needed to run the mcp server npx -y tsx main.ts*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.48.46e280afpm-2136x301.png)
*I accepted the generated name*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.48.56e280afpm-2136x388.png)
*I selected Workspace*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.49.16e280afpm-1052x504.png)
*I clicked Trust*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.54.49e280afpm-2136x1263.png)
*I used Visual Studio Code's chat window to ask the Large Language Model to multiply 2134.567 by 653.23*

![](/assets/images/mcpserver/screenshot202025-08-1320at2012.55.18e280afpm-2136x1256.png)
*With the help of the multiply tool the Large Language Model was able to provide the correct answer*
