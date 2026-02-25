---
title: "A Power Apps Custom Connector"
description: "Create a GitHub Repository"
date: "2021-06-27"
categories: ["Power Platform"]
tags: "power-apps, custom-connector, rest-api, github"
slug: "powerappswithrest"
image: "/assets/images/powerappswithrest/office-365-icon-500x500.png"
---




I created a GitHub Repository for the REST API code.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.42.54-am-810x938.png)
*I created the repository*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.43.12-am-930x676.png)
*I published the repository*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.43.36-am-1022x234.png)
*I opened the project in Visual Studio Code*


## Download example project code

I opened a Visual Studio Code terminal and ran `dotnet new webapi` to download example ASP.NET Core Web API code.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.44.38-am-1544x460.png)
*dotnet new webapi*


## Test the example project code

I created a dotnet project gitignore file and started the project.

```bash
% dotnet new gitignore
```

```bash
% dotnet run
```

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.46.31-am-1544x564.png)
*dotnet new gitignore and dotnet run*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-12.07.27-pm-1712x472.png)
*I navigated to https://localhost:5001/WeatherForecast*


## Book class

The Book class includes id and title properties.


## BookController class

The BookController class handles GET, POST, PUT, and DELETE actions.


## Enable Swagger in production

I commented out the if (env.IsDevelopment()) condition to enable Swagger in production (Azure).

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.57.03-pm-1380x724.png)
*I commented out the "if (env.IsDevelopement())" code*


## Deploy the updated project code to Azure

I created a new web app.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-1.42.47-pm-1020x214.png)
*haddley-power-app-api*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-1.43.00-pm-1020x201.png)
*.NET Core 3.1 runtime*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-1.43.10-pm-1020x277.png)
*I selected a pricing tier*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.45.46-pm-942x248.png)
*I deployed the code to the new web app*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.47.32-pm-550x530.png)
*I confirmed the deployment*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.57.45-pm-1020x654.png)
*I navigated to http://haddley-power-app-api.azurewebsites.net/swagger to see the GET, POST, PUT and DELETE actions*


## Use the Swagger user interface to test the API

In three steps:

**Get the books**
                        **Add a book**
                        **Get the books (list should now include the *new* book)**

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.45.31-pm-1836x1137.png)
*I expanded the GET /Book action*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.45.43-pm-1836x1135.png)
*I executed the GET /Book action*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.45.56-pm-1836x1137.png)
*I reviewed the server response*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.46.27-pm-1836x1132.png)
*I expanded the POST /Book action*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.46.44-pm-1836x1131.png)
*I updated the request body*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.47.32-pm-1836x1134.png)
*I executed the POST /Book action using the request body*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.47.51-pm-1836x1128.png)
*I reviewed the server response*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.48.05-pm-1836x1119.png)
*I executed the GET /Book action again*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.48.20-pm-1836x1129.png)
*I reviewed the server response*


## API description

I clicked the "/swagger/v1/swagger.json" link to review a description of the API.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.04.59-pm-1786x854.png)
*I exported the API description (OpenAPI version 3 format)*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.09.40-pm-1836x1027.png)
*I uploaded the API description to API Transformer*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.12.05-pm-1836x1025.png)
*I downloaded the API description (OpenAPI version 2 format)*


## New custom connector

I navigated to make.powerapps.com, selected the "Custom Connectors" menu item, and clicked the "+ New custom connector" button.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.44.57-pm-1836x1152.png)
*Custom Connectors*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.04.21-pm-522x530.png)
*I selected the Import an OpenAPI file option*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.13.11-pm-732x600.png)
*I imported the API description (OpenAPI version 2)*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.14.57-pm-1836x1153.png)
*Books*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.15.06-pm-1836x1149.png)
*I reviewed the General settings*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.15.23-pm-1836x1148.png)
*I selected "No Authentication" (for now)*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-4.25.58-pm-1836x1356.png)
*I tested the Book related actions*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.17.35-pm-1632x184.png)
*Books Custom Connector*


## swagger.json-Swagger20.json

```json
{
  "swagger": "2.0",
  "info": {
    "version": "v1",
    "title": "haddley_power_app_api",
    "contact": {}
  },
  "host": "www.example.com",
  "basePath": "/",
  "schemes": [
    "https"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/Book": {
      "get": {
        "description": "",
        "summary": "Book_GET",
        "tags": [
          "Book"
        ],
        "operationId": "Book_GET",
        "deprecated": false,
        "produces": [
          "text/plain",
          "application/json",
          "text/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Book"
              }
            },
            "headers": {}
          }
        }
      },
      "post": {
        "description": "",
        "summary": "Book_POST",
        "tags": [
          "Book"
        ],
        "operationId": "Book_POST",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": false,
            "description": "",
            "schema": {
              "$ref": "#/definitions/Book"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "headers": {}
          }
        }
      }
    },
    "/Book/{id}": {
      "get": {
        "description": "",
        "summary": "BookById_GET",
        "tags": [
          "Book"
        ],
        "operationId": "BookById_GET",
        "deprecated": false,
        "produces": [
          "text/plain",
          "application/json",
          "text/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "integer",
            "format": "int64",
            "description": ""
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/Book"
            },
            "headers": {}
          }
        }
      },
      "put": {
        "description": "",
        "summary": "BookById_PUT",
        "tags": [
          "Book"
        ],
        "operationId": "BookById_PUT",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "integer",
            "format": "int64",
            "description": ""
          },
          {
            "name": "body",
            "in": "body",
            "required": false,
            "description": "",
            "schema": {
              "$ref": "#/definitions/Book"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "headers": {}
          }
        }
      },
      "delete": {
        "description": "",
        "summary": "BookById_DELETE",
        "tags": [
          "Book"
        ],
        "operationId": "BookById_DELETE",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "integer",
            "format": "int64",
            "description": ""
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "headers": {}
          }
        }
      }
    }
  },
  "definitions": {
    "Book": {
      "title": "Book",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "title": {
          "type": "string"
        }
      }
    }
  },
  "tags": [
    {
      "name": "Book",
      "description": ""
    }
  ]
}
```