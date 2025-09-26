---
title: "DevOps Starter GitHub actions"
description: "A comprehensive guide covering devops starter github actions"
date: "2025-09-20"
category: "Development"
image: "/assets/images/devopsstartergithubactions/hero.png"
tags: ["azure","devops","ai","git","github"]
---

## Everything you need for developing, deploying, and monitoring your application.

![](/assets/images/devopsstartergithubactions/svgexport-22.svg)
*Microsoft DevOps Logo by Microsoft Corporation is Public Domain*


DevOps Starter makes it easy to get started on Azure using either GitHub actions or Azure DevOps

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.22.36-pm-1836x1028.png)
*Select "DevOps Starter" in Azure Portal*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.23.43-pm-1836x1035.png)
*Create a Node app*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.23.55-pm-1836x1033.png)
*Select Express*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.24.23-pm-1836x1035.png)
*Select Web App for Containers or Windows Web App (free $)*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.24.40-pm-1836x1032.png)
*Enter GitHub credentials*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.25.26-pm-1836x1033.png)
*Select pricing tier "F1 Free"*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.26.05-pm-1836x1033.png)
*Deployment to Azure in progress*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.28.02-pm-1836x1030.png)
*GitHub Actions workflow runs Unit Tests*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.28.44-pm-1836x1031.png)
*If Unit Tests pass deploy Node app to Azure*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.31.15-pm-1836x1030.png)
*Once deployed to Azure run Functional Tests (Selenium)*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.34.39-pm-1836x1036.png)
*GitHub Actions workflow complete*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.35.19-pm-1836x1033.png)
*Summary of Azure resources*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.35.37-pm-1836x1031.png)
*Navigate to production URL*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.39.39-pm-1836x1031.png)
*To add Factorial API... Open with GitHub Desktop*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.39.56-pm-1012x630.png)
*Clone repository*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-3.40.46-pm-1836x1254.png)
*Open in Visual Studio Code*


## Run the updated app locally

$ cd Application

$ npm install haddley-factorial-cc
or
$ npm install haddley-factorial-js

$ npm install
$ npm run start

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.10.02-pm-1836x1033.png)
*Updated code returns factorial of 9*


## Run the unit tests locally

$ cd ../Tests
$ npm install
$ gulp unittest

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.13.54-pm-1836x1079.png)
*Updated Unit Tests*


## Run the functional tests locally

$ xattr -d com.apple.quarantine chromedriver

$ npm run start&
$ cd ../Tests
$ gulp functionaltest --webAppUrl http://localhost:3000/

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.50.40-pm-1836x1087.png)
*Functional tests*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-4.08.12-pm-1836x1259.png)
*Push updates to GitHub... origin master*

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-5.05.24-pm-1836x1027.png)
*GitHub Actions workflow runs again*


## Test factorial API in production

[https://haddley-factorial-api.azurewebsites.net/factorial/9](https://haddley-factorial-api.azurewebsites.net/factorial/9)

![](/assets/images/devopsstartergithubactions/screen-shot-2021-04-26-at-5.06.36-pm-1836x1034.png)
*Factorial API running in production*


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

```text
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

```text
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

