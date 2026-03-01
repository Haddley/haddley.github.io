---
title: "DevOps Starter GitHub actions"
description: "Everything you need for developing, deploying, and monitoring your application."
date: "2021-04-25"
categories: ["DevOps", "Azure"]
tags: "github-actions, ci-cd, devops, deployment"
hidden: false
slug: "devopsstartergithubactions"
image: "/assets/images/devopsstartergithubactions/svgexport-22.svg"
---



DevOps Starter makes it easy to get started on Azure using either GitHub actions or Azure DevOps

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.22.36-pm-1836x1028.png)
*I selected "DevOps Starter" in Azure Portal*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.23.43-pm-1836x1035.png)
*I created a Node app*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.23.55-pm-1836x1033.png)
*I selected Express*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.24.23-pm-1836x1035.png)
*I selected Web App for Containers*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.24.40-pm-1836x1032.png)
*I entered my GitHub credentials*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.25.26-pm-1836x1033.png)
*I selected pricing tier "F1 Free"*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.26.05-pm-1836x1033.png)
*Deployment to Azure was in progress*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.28.02-pm-1836x1030.png)
*The GitHub Actions workflow ran Unit Tests*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.28.44-pm-1836x1031.png)
*When Unit Tests passed, the Node app was deployed to Azure*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.31.15-pm-1836x1030.png)
*Once deployed to Azure, Functional Tests (Selenium) ran*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.34.39-pm-1836x1036.png)
*The GitHub Actions workflow completed*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.35.19-pm-1836x1033.png)
*I reviewed the summary of Azure resources*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.35.37-pm-1836x1031.png)
*I navigated to the production URL*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.39.39-pm-1836x1031.png)
*I opened the repository with GitHub Desktop to add the Factorial API*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.39.56-pm-1012x630.png)
*I cloned the repository*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.40.46-pm-1836x1254.png)
*I opened the project in Visual Studio Code*


## Run the updated app locally

```bash
$ cd Application

$ npm install haddley-factorial-cc
# or
$ npm install haddley-factorial-js

$ npm install
$ npm run start
```

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.10.02-pm-1836x1033.png)
*I verified that the updated code returns factorial of 9*


## Run the unit tests locally

```bash
$ cd ../Tests
$ npm install
$ gulp unittest
```

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.13.54-pm-1836x1079.png)
*I ran the updated Unit Tests*


## Run the functional tests locally

```bash
$ xattr -d com.apple.quarantine chromedriver

$ npm run start&
$ cd ../Tests
$ gulp functionaltest --webAppUrl http://localhost:3000/
```

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.50.40-pm-1836x1087.png)
*I ran the functional tests*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.08.12-pm-1836x1259.png)
*I pushed updates to GitHub on origin master*

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-5.05.24-pm-1836x1027.png)
*The GitHub Actions workflow ran again*


## Test factorial API in production

[https://haddley-factorial-api.azurewebsites.net/factorial/9](https://haddley-factorial-api.azurewebsites.net/factorial/9)

![](assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-5.06.36-pm-1836x1034.png)
*The Factorial API was running in production*


## devops-starter-workflow.yaml

```yaml
name: Build and Deploy node Express app to azure
on:
  push:
    branches:
      - master

env:
  AZURE_WEBAPP_NAME: "haddley-factorial-api"    # set this to your application's name
  AZURE_WEBAPP_PACKAGE_PATH: "Application"      # set this to the path to your web app project, defaults to the repository root
  NODE_VERSION: '8.11.1'                        # set this to the node version to use
  RESOURCEGROUPNAME: "haddley-factorial-api-rg"
  LOCATION: "South Central US"
  HOSTINGPLANNAME: "haddley-factorial-api-plan"
  APPINSIGHTLOCATION: "South Central US"
  SKU: "F1 Free"

jobs:
  build:
    name: Build and Run tests
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Use Node.js ${{ env.NODE_VERSION }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ env.NODE_VERSION }}

    - name: npm install and build
      continue-on-error: false
      run: |
        cd Application
        npm install
        npm run build --if-present

    - name: Run unit tests
      continue-on-error: false
      run: |
        cd Tests
        npm install
        gulp unittest

    - name: Creating artifact directories
      run: |
        mkdir buildartifacts
        mkdir deploymenttemplates

    # Archive build artifact
    - name: Archive Application
      run: |
        zip -qq -r ./buildartifacts/Application.zip ./Application

    # Uploading application to build artifact
    - name: Upload Application to Build Artifact
      continue-on-error: false
      uses: actions/upload-artifact@v2
      with:
        name: buildartifacts
        path: buildartifacts

    # Archive Arm templates
    - name: Archive ArmTemplates
      uses: montudor/action-zip@v0.1.0
      with:
        args: zip -qq -r ./deploymenttemplates/armtemplates.zip ./armTemplates

    # Uploading Arm Templates to artifacts
    - name: Upload Arm templates to Artifact
      continue-on-error: false
      uses: actions/upload-artifact@v2
      with:
        name: deploymenttemplates
        path: deploymenttemplates

  Deploy:
    name: Deploy to azure web app
    needs: build
    runs-on: ubuntu-latest
    steps:
    # Downloading build artifact
    - name: Download a Build Artifact
      uses: actions/download-artifact@v2
      continue-on-error: false
      with:
        name: buildartifacts
        path: buildartifacts

    # Uzipping build artifacts
    - name: unzipping build artifact
      run: |
        unzip -qq ./buildartifacts/Application.zip -d .

  # Downloading Arm Templates
    - name: Download an Arm template
      uses: actions/download-artifact@v2
      continue-on-error: false
      with:
        name: deploymenttemplates
        path: deploymenttemplates

    # Uzipping Arm template directory
    - name: unzipping arm artifact
      run: |
        unzip -qq ./deploymenttemplates/armtemplates.zip -d .

    # Login to azure
    - name: Login to Azure
      uses: azure/login@v1
      continue-on-error: false
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}

    # Deploy Arm template
    - name: Deploy ARM Template
      uses: azure/CLI@v1
      continue-on-error: false
      with:
        inlineScript: |
          az group create --name "${{ env.RESOURCEGROUPNAME }}" --location "${{ env.LOCATION }}"
          az deployment group create --resource-group "${{ env.RESOURCEGROUPNAME }}" --template-file ./armTemplates/windows-webapp-template.json --parameters webAppName="${{ env.AZURE_WEBAPP_NAME }}" hostingPlanName="${{ env.HOSTINGPLANNAME }}" appInsightsLocation="${{ env.APPINSIGHTLOCATION }}" sku="${{ env.SKU }}"

    # Deploy web app on azure
    - name: 'Deploy to Azure WebApp'
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}

  # Job to run functional tests
  FunctionalTests:
    name: Run Functional tests
    runs-on: windows-latest
    needs: Deploy
    steps:
    - uses: actions/checkout@v2

    - name: Use Node.js ${{ env.NODE_VERSION }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ env.NODE_VERSION }}

    # Run functional tests
    - name: Run Functional Tests
      continue-on-error: false
      run: |
        cd Application
        npm install
        cd ../Tests
        npm install
        gulp functionaltest --webAppUrl https://${{ env.AZURE_WEBAPP_NAME }}.azurewebsites.net/
```

## routesindex.js

```javascript
'use strict';
var express = require('express');
var router = express.Router();
// var factorial = require('haddley-factorial-cc');
var factorial = require('haddley-factorial-js');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/factorial/:n', (request, response) => {
    try {
        const n = Number(request.params.n);
        const result = factorial.factorial_it(n);
        response.json(result);
    }
    catch (err) {
        response.status(500).send(err);
    }
});

module.exports = router;
```

## unittestssampleUnitTests.js

```javascript
var assert = require('assert');
var app = require('../../Application/app');
var http = require('http');

describe('sampleUnitTests', function () {
    before(function () {
    });

    after(function () {
        app.close();
    });

    it('Should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode, 'Result code should be 200.');
            done();
        });
    });

    it('Assert title', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode, 'Result code should be 200.');
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                assert.equal(true, data.includes('<title>Express - Node.js Express Application</title>'), 'Title should be Express - Node.js Express Application.');
                done();
            })
        });
    });


    it('Assert factorial 9', function (done) {
        http.get('http://localhost:3000/factorial/9', function (res) {
            assert.equal(200, res.statusCode, 'Result code should be 200.');
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                assert.equal(true, data.includes('362880'));
                done();
            })
        });
    });

});
```
## References

- [DevOps Starter](https://docs.microsoft.com/en-us/azure/devops-project/overview)
