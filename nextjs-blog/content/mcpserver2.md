---
title: "Model Context Protocol (Part 2)"
description: "A comprehensive guide covering model context protocol (part 2)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/mcpserver2/hero.png"
tags: ["azure","docker","ai","business central","git"]
---

# Model Context Protocol (Part 2)

## Business Central

![](/assets/images/mcpserver2/mcp-1024x1024.png)
*The Model Context Protocol is an open source project run by Anthropic, PBC.*


## Business Central

I created a Model Context Protocol (MCP) server for Microsoft Business Central

![](/assets/images/mcpserver2/screenshot202025-08-2220at205.09.49e280afpm-2136x1239.png)
*I created a business-central-mcp folder. I ran npm init -y. I updated the generated package.json file adding type: "module".*

![](/assets/images/mcpserver2/screenshot202025-08-2220at205.10.58e280afpm-2136x1239.png)
*I ran npm install @modelcontextprotocol/sdk and npm install zod.*

![](/assets/images/mcpserver2/screenshot202025-08-2220at205.47.16e280afpm-2136x1093.png)
*I ran npx -y @modelcontextprotocol/inspector npx -y tsx main.ts.*

![](/assets/images/mcpserver2/screenshot202025-08-2220at205.48.28e280afpm-2136x1239.png)
*The hello tool returned success*

![](/assets/images/mcpserver2/screenshot202025-08-2220at206.30.50e280afpm-2136x1425.png)
*I replaced the hello tool with a get-vendors tool*

![](/assets/images/mcpserver2/screenshot202025-08-2220at206.35.00e280afpm-2136x1369.png)
*I ran npx -y @modelcontextprotocol/inspector npm run dev. The get_vendors tools returned success.Later I ran npm run build and then npx -y @modelcontextprotocol/inspector npm run start*

For remote servers, set up a Streamable HTTP transport that handles both client requests and server-to-client notifications.

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.10.09e280afpm-2136x1326.png)
*I ran docker build -t business-central-mcp .then npm run docker:run*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.12.04e280afpm-2136x860.png)
*I ran npx -y @modelcontextprotocol/inspector*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.12.56e280afpm-1619x886.png)
*I ran the get_vendors tool*

The Azure Container Apps extension for Visual Studio Code enables you to choose existing Container Apps resources, or create new ones to deploy your applications to.

[https://learn.microsoft.com/en-us/azure/container-apps/deploy-visual-studio-code](https://learn.microsoft.com/en-us/azure/container-apps/deploy-visual-studio-code)

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.28.35e280afpm-2136x374.png)
*I entered the name of new container apps environment*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.28.44e280afpm-2136x413.png)
*I selected a location*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.35.46e280afpm-2136x185.png)
*I selected the Deploy Project from Workspace... menu item*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.36.13e280afpm-2136x303.png)
*I accepted the generated container app name*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.36.27e280afpm-2136x250.png)
*I selected the Managed Identity option*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.36.36e280afpm-2136x205.png)
*I selected the .env file*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.39.11e280afpm-2136x1314.png)
*The deployment finished*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.41.17e280afpm-2136x1079.png)
*I ran a fresh copy of the inspector*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.41.01e280afpm-1620x891.png)
*I tested the deployment using the URL https://business-central-mcp-new.thankfulsea-b533246e.eastus.azurecontainerapps.io/mcp*

I used a Custom Connector to connect Copilot Studio to the Model Context Protocol server.

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.42.53e280afpm-1617x848.png)
*I created an Agent. I selected the Tools tab. I clicked the + Add a tool button*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.45.22e280afpm-1620x601.png)
*I selected Custom connector*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.45.52e280afpm-1619x413.png)
*I selected the Import from Github option*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.46.30e280afpm-1618x747.png)
*I selected the Custom radio button, I selected the dev branch, I selected the MCP-Streamable-HTTP Connector*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.47.14e280afpm-1618x891.png)
*I entered the server url https://business-central-mcp-new.thankfulsea-b533246e.eastus.azurecontainerapps.io/mcp*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.49.34e280afpm-1616x683.png)
*I refreshed the Model Context Protocol options*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.49.48e280afpm-1615x765.png)
*I clicked on the MCP Server Streamable HTTP option*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.49.58e280afpm-1619x788.png)
*I clicked the Create button*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.50.08e280afpm-1617x789.png)
*I clicked the Add and configure button*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.50.48e280afpm-1619x841.png)
*The get_vendors tool was displayed*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.51.42e280afpm-1618x861.png)
*I was directed to the Create or pick a connection form. I clicked the Submit button*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.51.52e280afpm-1619x378.png)
*The status if MCP-Streamable-HTTP was updated to Connected*

![](/assets/images/mcpserver2/screenshot202025-08-2720at206.00.11e280afpm-1728x341.png)
*I had entered this prompt Please show me a table of vendors*

![](/assets/images/mcpserver2/screenshot202025-08-2720at205.52.48e280afpm-1729x924.png)
*Copilot Studio's Large Language Model used the get_vendors tool to establish the context.*

Open LM Studio and navigate to the "Program" tab in the right sidebar.
Click on "Install" and select "Edit mcp.json". This opens the mcp.json file in LM Studio's in-app editor.
Add your MCP server configuration to the mcp.json file.

![](/assets/images/mcpserver2/screenshot202025-08-2820at202.32.16e280afpm-2136x593.png)
*I selected Chats in the left hand menu. I clicked the show settings button at the top right of the LM Studio application. I added the business central mcp server using the url https://business-central-mcp-new.thankfulsea-b533246e.eastus.azurecontainerapps.io/mcp. I enabled the mcp server connection.*

![](/assets/images/mcpserver2/screenshot202025-08-2820at202.18.21e280afpm-2136x1245.png)
*I entered the prompt show me a table of vendor details*
