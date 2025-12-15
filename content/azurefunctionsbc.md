---
title: "Business Central Azure Functions (Part 1)"
description: "Creating the Azure Functions App"
date: "2025-12-15"
categories: ["Azure","Microsoft Dynamics","Business Central"]
image: "/assets/images/posts-meta.svg"
tags: ["azure","business central","azure functions"]
hidden: false
slug: "azurefunctionsbc"
---

# Business Central Azure Functions

## Azure Functions with Business Central

## project files

```text
qrcode-generator-function/
├── src/
│   └── app.js
├── host.json
├── package.json
```

## src/app.js

```javascript
const { app } = require('@azure/functions');
const qr = require('qrcode');

app.http('QRCodeGenerator', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const text = request.query.get('text');

        if (!text) {
            return { 
                status: 400, 
                body: "Please provide text to encode via the 'text' query parameter." 
            };
        }

        try {
            // Generate a QR code as a Data URI (base64 string)
            const qrCodeDataUrl = await qr.toDataURL(text);
            return {
                status: 200,
                body: qrCodeDataUrl,
                headers: {
                    'Content-Type': 'text/plain'
                }
            };
        } catch (error) {
            return {
                status: 500,
                body: `Error generating QR code: ${error.message}`
            };
        }
    }
});
```

## host.json

```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20
      }
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  }
}
```

## package.json

```json
{
  "name": "qrcode-generator-function",
  "version": "1.0.0",
  "description": "Azure Functions QR Code Generator",
  "main": "src/app.js",
  "scripts": {
    "start": "func start",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "@azure/functions": "^4.0.0",
    "qrcode": "^1.5.3"
  },
  "devDependencies": {
    "@types/node": "^20.x"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Azure Portal (Visual)
I navigated to portal.azure.com

I clicked + Create a resource

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 143133.png)
*+ Create a resource*

I clicked Function App|Create

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 143149.png)
*I clicked "Create"*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 143606.png)
*Select a hosting option*

I filled in:

Name: qrcode-generator-function

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 144520.png)
*I provided a Resource Group and Function App name*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 144553.png)
*I clicked Create*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 144904.png)
*I clicked Go to resource*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 150010.png)
*I clicked Deployment|Deployment Center and entered Github project details*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 150036.png)
*I previewed the Github action details*

## .github/workflows/main_qrcode-generator-function.yml

```yml
# Docs for the Azure Web Apps Deploy action: https://github.com/azure/functions-action
# More GitHub Actions for Azure: https://github.com/Azure/actions

name: Build and deploy Node.js project to Azure Function App - qrcode-generator-function

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  AZURE_FUNCTIONAPP_PACKAGE_PATH: '.' # set this to the path to your web app project, defaults to the repository root
  NODE_VERSION: '22' # set this to the node version to use (supports 8.x, 10.x, 12.x)

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read #This is required for actions/checkout

    steps:
      - name: 'Checkout GitHub Action'
        uses: actions/checkout@v4

      - name: Setup Node ${{ env.NODE_VERSION }} Environment
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: 'Resolve Project Dependencies Using Npm'
        shell: bash
        run: |
          pushd './${{ env.AZURE_FUNCTIONAPP_PACKAGE_PATH }}'
          npm install
          npm run build --if-present
          popd

      - name: Zip artifact for deployment
        run: zip release.zip ./* -r

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build
    permissions:
      id-token: write #This is required for requesting the JWT
      contents: read #This is required for actions/checkout

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: node-app

      - name: Unzip artifact for deployment
        run: |
          unzip release.zip
          rm release.zip
      
      - name: Login to Azure
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZUREAPPSERVICE_CLIENTID_DC52AD8DA7DF437A982237D80ABB5CC7 }}
          tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANTID_32D143B72F614D7EB5E5481E145E9815 }}
          subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTIONID_7D7131AD943A4E09A8845E8BBEBDD7DA }}

      - name: 'Run Azure Functions Action'
        uses: Azure/functions-action@v1
        id: fa
        with:
          app-name: 'qrcode-generator-function'
          slot-name: 'Production'
          package: ${{ env.AZURE_FUNCTIONAPP_PACKAGE_PATH }}
          
```

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 151229.png)
*The Github action built the Function App and deployed to Azure*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 151509.png)
*QRCodeGenerator function details*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 152033.png)
*Testing the QRCodeGenerator function in the Azure portal*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 152054.png)
*Test results*

![](/assets/images/azurefunctionsbc/Screenshot 2025-12-15 152132.png)

[Test results](https://qrcode-generator-function-e5c2d8dwcabsbbfe.eastus-01.azurewebsites.net/api/QRCodeGenerator?text=Neil)


## References

- [Quickstart: Create and deploy function code to Azure using Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/how-to-create-function-vs-code?tabs=go%2Cwindows&pivots=programming-language-javascript)