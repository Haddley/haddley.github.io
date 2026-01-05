---
title: "A Power Apps Custom Connector"
description: "Create a GitHub Repository"
date: "2021-06-27"
categories: ["Power Platform"]
tags: ""
slug: "powerappswithrest"
image: "/assets/images/office-365-icon-500x500.png"
---




Create a GitHub Repository for the REST API code.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.42.54-am-810x938.png)
*Create Repository*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.43.12-am-930x676.png)
*Publish Repository*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.43.36-am-1022x234.png)
*open in Visual Studio Code*


## Download example project code

Open a Visual Studio Code terminal and use the command:

```bash
% dotnet new api
```

to download example ASP.NET Core Web API code.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.44.38-am-1544x460.png)
*dotnet new webapi*


## Test the example project code

Create a dotnet project gitignore file:

```bash
% dotnet new gitignore
```

Start the project:

```bash
% dotnet run
```

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-11.46.31-am-1544x564.png)
*dotnet new gitignore and dotnet run*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-12.07.27-pm-1712x472.png)
*navigate to https://localhost:5001/WeatherForecast*


## Book class

The Book class include id and title properties


## BookController class

The BookController class is able to handle GET, POST, PUT and DELETE actions


## Enable Swagger in production

Comment out the if (env.IsDevelopment()) condition to enable Swagger in production (Azure)

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.57.03-pm-1380x724.png)
*comment out the "if (env.IsDevelopement())" code*


## Deploy the updated project code to Azure

Create new web app.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-1.42.47-pm-1020x214.png)
*haddley-power-app-api*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-1.43.00-pm-1020x201.png)
*.NET Core 3.1 runtime*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-1.43.10-pm-1020x277.png)
*Select pricing tier*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.45.46-pm-942x248.png)
*Deploy the code to the new web app*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.47.32-pm-550x530.png)
*confirm deployment of the code*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.57.45-pm-1020x654.png)
*navigate to http://haddley-power-app-api.azurewebsites.net/swagger to see a list of the GET, POST, PUT and DELETE actions*


## Use the Swagger user interface to test the API

In three steps:

**Get the books**
                        **Add a book**
                        **Get the books (list should now include the *new* book)**

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.45.31-pm-1836x1137.png)
*Expand the GET /Book action*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.45.43-pm-1836x1135.png)
*execute the GET /Book action*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.45.56-pm-1836x1137.png)
*Review the server response*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.46.27-pm-1836x1132.png)
*Expand the POST /Book action*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.46.44-pm-1836x1131.png)
*Update the request body*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.47.32-pm-1836x1134.png)
*Execute the POST /Book action using the Request body*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.47.51-pm-1836x1128.png)
*Review the Server response*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.48.05-pm-1836x1119.png)
*Execute the GET /Book action*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-5.48.20-pm-1836x1129.png)
*Review the Server response*


## API description

Click the "/swagger/v1/swagger.json" link to review a description of the API.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.04.59-pm-1786x854.png)
*Export/Save the API description (openapi version 3 format)*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.09.40-pm-1836x1027.png)
*Upload the API description to API Transformer*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.12.05-pm-1836x1025.png)
*Download the API description (openapi version 2 format)*


## New custom connector

Navigate to make.powerapps.com and select the "Custom Connectors" menu item.

Click the "+ New custom connector" button.

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-2.44.57-pm-1836x1152.png)
*Custom Connectors*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.04.21-pm-522x530.png)
*Select the Import an OpenAPI file option*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.13.11-pm-732x600.png)
*Import the API description (openapi version 2)*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.14.57-pm-1836x1153.png)
*Books*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.15.06-pm-1836x1149.png)
*Review the General settings*

![](/assets/images/powerappswithrest/screen-shot-2021-06-19-at-3.15.23-pm-1836x1148.png)
*Select "No Authentication" (for now)*

![](/assets/images/powerappswithrest/screen-shot-2021-06-27-at-4.25.58-pm-1836x1356.png)
*Test the Book related actions*

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