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


## main.ts

```text
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "Business Central MCP Server",
    version: "1.0.0"
});

server.tool(
    'hello',
    'A simple hello world tool',
    {
        name: z.string().describe("The name to greet")
    },
    async ({ name }) => {
        return {
            content: [
                {
                    type: "text",
                    text: `Hello, ${name}!`
                }
            ]
        }
    }
);

const transport = new StdioServerTransport();
server.connect(transport);
```

## package.json

```text
{
    "name": "business-central-mcp",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": "",
    "type": "module",
    "dependencies": {
        "@modelcontextprotocol/sdk": "^1.17.3",
        "zod": "^3.25.76"
    }
}
```

## srcmain.ts

```text
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ensureAuthenticated, makeApiCall } from "./business-central-auth.js";

import { configDotenv } from "dotenv";
configDotenv();

const server = new McpServer({
    name: "Business Central MCP Server",
    version: "1.0.0"
});


server.tool(
  'get_vendors',
  'Retrieves vendor list from Business Central',
  {
    filter: z.string().optional().describe('OData filter for vendors'),
    top: z.number().optional().describe('Maximum number of results')
  },
  async ({ filter, top = 100 }) => {
    await ensureAuthenticated();

    const params: any = {
      $top: top
    };
    
    if (filter) {
      params.$filter = filter;
    }

    const result = await makeApiCall('vendors', params);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            data: result.value || [],
            count: result.value?.length || 0
          }, null, 2)
        }
      ]
    };
  }
);


const transport = new StdioServerTransport();
server.connect(transport);
```

## srcbusiness-central-auth.ts

```text
import axios from 'axios';
import qs from 'querystring';

// Configuration interface
interface BusinessCentralConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  environment: string;
  companyId: string;
}

// Token storage
let accessToken: string | null = null;
let tokenExpiry: Date | null = null;

// Get configuration from environment variables
function getConfig(): BusinessCentralConfig {
  return {
    tenantId: process.env.BC_TENANT_ID || '',
    clientId: process.env.BC_CLIENT_ID || '',
    clientSecret: process.env.BC_CLIENT_SECRET || '',
    baseUrl: process.env.BC_BASE_URL || '',
    environment: process.env.BC_ENVIRONMENT || 'Sandbox',
    companyId: process.env.BC_COMPANY_ID || ''
  };
}

// Authenticate with Business Central
export async function ensureAuthenticated(): Promise<void> {
  if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
    return;
  }

  const config = getConfig();
  
  try {
    const tokenUrl = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;
    
    const tokenData = {
      grant_type: 'client_credentials',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      scope: 'https://api.businesscentral.dynamics.com/.default'
    };

    const response = await axios.post(tokenUrl, qs.stringify(tokenData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    accessToken = response.data.access_token;
    tokenExpiry = new Date(Date.now() + (response.data.expires_in * 1000));
    
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.response?.data?.error_description || error.message}`);
  }
}

// Make API call to Business Central
export async function makeApiCall(endpoint: string, params: any = {}): Promise<any> {
  const config = getConfig();
  const url = `${config.baseUrl}/${config.environment}/api/v2.0/companies(${config.companyId})/${endpoint}`;
  
  if (!accessToken) {
    throw new Error('Not authenticated. Call ensureAuthenticated first.');
  }
  
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      },
      params
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(`API call failed: ${error.response?.data?.error?.message || error.message}`);
  }
}

// Clear authentication (useful for testing or re-authentication)
export function clearAuthentication(): void {
  accessToken = null;
  tokenExpiry = null;
}
```

## package.json

```text
{
    "name": "business-central-mcp",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "build": "tsc --outDir dist",
        "start": "node ./dist/main.js",
        "dev": "tsx main.ts"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": "",
    "type": "module",
    "dependencies": {
        "@modelcontextprotocol/sdk": "^1.17.3",
        "axios": "^1.11.0",
        "dotenv": "^17.2.1",
        "zod": "^3.25.76"
    },
    "devDependencies": {
        "@types/node": "^24.3.0",
        "@typescript-eslint/eslint-plugin": "^8.41.0",
        "@typescript-eslint/parser": "^8.41.0",
        "tsx": "^4.20.5",
        "typescript": "^5.9.2"
    }
}
```

## tsconfig.json

```text
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    // "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}
```

## .env

```text
# Configurazione Business Central OAuth 2.0
BC_TENANT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
BC_CLIENT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
BC_CLIENT_SECRET=XXXXX~XX-XXXXXXXXXXXXXXXXXXXXXXXXXX.XXXX

# Business Central API base URL
BC_BASE_URL=https://api.businesscentral.dynamics.com/v2.0/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# Business Central Company ID
BC_COMPANY_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# Sandbox or Production?
BC_ENVIRONMENT=Production
```

## srcmain.ts

```text
import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js"
import { ensureAuthenticated, makeApiCall } from "./business-central-auth.js";
import { z } from "zod";

const app = express();
app.use(express.json());

// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

// Handle POST requests for client-to-server communication
app.post('/mcp', async (req, res) => {
  // Check for existing session ID
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    // Reuse existing transport
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    // New initialization request
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        // Store the transport by session ID
        transports[sessionId] = transport;
      },
      // DNS rebinding protection is disabled by default for backwards compatibility. If you are running this server
      // locally, make sure to set:
      // enableDnsRebindingProtection: true,
      // allowedHosts: ['127.0.0.1'],
    });

    // Clean up transport when closed
    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports[transport.sessionId];
      }
    };
    const server = new McpServer({
      name: "example-server",
      version: "1.0.0"
    });

    // ... set up server resources, tools, and prompts ...

    server.tool(
      'get_vendors',
      'Retrieves vendor list from Business Central',
      {
        filter: z.string().optional().describe('OData filter for vendors'),
        top: z.number().optional().describe('Maximum number of results')
      },
      async ({ filter, top = 100 }) => {
        await ensureAuthenticated();
        const params: any = { $top: top };
        if (filter) params.$filter = filter;

        const result = await makeApiCall('vendors', params);
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              data: result.value || [],
              count: result.value?.length || 0
            }, null, 2)
          }]
        };
      }
    );

    // Connect to the MCP server
    await server.connect(transport);
  } else {
    // Invalid request
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Bad Request: No valid session ID provided',
      },
      id: null,
    });
    return;
  }

  // Handle the request
  await transport.handleRequest(req, res, req.body);
});

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (req: express.Request, res: express.Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }

  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
};

// Handle GET requests for server-to-client notifications via SSE
app.get('/mcp', handleSessionRequest);

// Handle DELETE requests for session termination
app.delete('/mcp', handleSessionRequest);

app.listen(3000);
```

## package.json

```text
{
    "name": "business-central-mcp",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "build": "tsc --outDir dist",
        "start": "TRANSPORT=http node ./dist/main.js",
        "dev:stdio": "tsx ./src/main.ts",
        "dev:http": "TRANSPORT=http tsx ./src/main.ts",
        "docker:build": "docker build -t business-central-mcp .",
        "docker:run": "docker run -p 3000:3000 --env-file .env business-central-mcp"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": "",
    "type": "module",
    "dependencies": {
        "@modelcontextprotocol/sdk": "^1.17.3",
        "axios": "^1.11.0",
        "cors": "^2.8.5",
        "dotenv": "^17.2.1",
        "express": "^5.1.0",
        "zod": "^3.25.76"
    },
    "devDependencies": {
        "@types/cors": "^2.8.19",
        "@types/express": "^5.0.3",
        "@types/node": "^24.3.0",
        "@typescript-eslint/eslint-plugin": "^8.41.0",
        "@typescript-eslint/parser": "^8.41.0",
        "tsx": "^4.20.5",
        "typescript": "^5.9.2"
    }
}
```

## dockerfile

```text
FROM node:20-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV TRANSPORT=http
ENV PORT=3000

# Start the server
CMD ["npm", "start"]
```

## docker-compose.yml

```text
services:
  business-central-mcp:
    build: .
    ports:
      - "3000:3000"
    environment:
      - TRANSPORT=http
      - PORT=3000
      # Add your Business Central environment variables here
      - BC_TENANT_ID=${BC_TENANT_ID}
      - BC_CLIENT_ID=${BC_CLIENT_ID}
      - BC_CLIENT_SECRET=${BC_CLIENT_SECRET}
      - BC_BASE_URL=${BC_BASE_URL}
      - BC_COMPANY_ID=${BC_COMPANY_ID}
      - BC_ENVIRONMENT=${BC_ENVIRONMENT}
    restart: unless-stopped
```

