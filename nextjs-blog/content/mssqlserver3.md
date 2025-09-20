---
title: "Microsoft SQL Server (Part 3)"
description: "A comprehensive guide covering microsoft sql server (part 3)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/mssqlserver3/hero.png"
tags: ["react","javascript","typescript","azure","java"]
---

# Microsoft SQL Server (Part 3)

## A Node, React and MS SQL Server App.

![](/assets/images/mssqlserver3/ads.svg)
*ads by Microsoft Corporation is licensed under Source EULA*


## Create Database

Start by creating the SQL Server Database


## Use ToDo

Switch to ToDo Database


## Create Table

Create Tasks Table


## Add Sample Rows

Add sample rows to the Tasks table.


## npm init

npm init -y


## hapi

npm install @hapi/hapi


## eslint

$ npm install eslint --save-dev
$CONTENT$nbsp;npx eslint --init
> To check syntax, find problems, and enforce code style
> CommonJS (require/exports)
**React**
> Does your project use TypeScript? 
**No** / Yes
> Where does your code run? 
**Node**
> Use a popular style guide
**Answer questions about your style**
> What format do you want your config file to be in?
**JavaScript**
> What style of indentation do you use?
**Tabs**
> What quotes do you use for strings?
**Double**
> What line endings do you use? 
**Unix**
> Do you require semicolons?
**No**


## src/index.js

$ mkdir src
$ cd src
$ touch index.js


## src/server.js

$ touch server.js


## src/routes/index.js

$ mkdir routes
$ cd routes
$ touch index.js


## package.json

"main": "src/index.js",


## Run and test

$ node .

navigate to http://localhost:8080


## .env

$ npm install dotenv
$ touch .env


## src/config.js

$ cd src
$ touch config.js


## mssql fs-extra

$ npm install mssql
$ npm install fs-extra


## data access

$ cd src
$ mkdir data
$ cd data
$ touch index.js


## src/data/utils.js

Maintain sql statements as .sql files in src/data/... subfolders and read at runtime.

$ touch utils.js


## src/data/tasks folder

$ mkdir tasks
$ cd tasks
$ touch getTasks.sql
$CONTENT$nbsp;touch index.js


## src/plugins

$ mkdir plugins
$ cd plugins
$ touch index.js
$ touch sql.js


## src/routes/api

$ mkdir api
$ cd api
$ touch index.js
$ touch tasks.js


## Run and test

$ node .


## okta

okta is a service that simplifies identity management

![](/assets/images/mssqlserver3/screen-shot-2021-04-17-at-8.02.48-am-1836x926.png)
*esp8266*


## register app

https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app

![](/assets/images/mssqlserver3/screen-shot-2021-04-17-at-8.54.33-am-1130x744.png)
*esp8266*

![](/assets/images/mssqlserver3/screen-shot-2021-04-17-at-8.56.43-am-1678x964.png)
*esp8266*

![](/assets/images/mssqlserver3/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*


## workbench.aspx

https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Quickstart/quickStartType//sourceType/Microsoft_AAD_IAM/appId/c03242fe-84f5-4069-9507-3667965ba3af/objectId/3305d263-36f4-4639-899d-e5d34fd020df/isMSAApp//defaultBlade/Overview/appSignInAudience/AzureADandPersonalMicrosoftAccount/servicePrincipalCreated/true

![](/assets/images/mssqlserver3/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/mssqlserver3/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/mssqlserver3/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*


## okta - Add an external Identity Provider

https://developer.okta.com/docs/guides/add-an-external-idp/microsoft/create-an-app-at-idp/


## <TO DISCUSS>

NAMING CONVENTION FOR TABLE AND TABLE COLUMN NAMES (SQL Server or JavaScript friendly?)

1:26:50

![](/assets/images/mssqlserver3/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*


## error handling

// in production use hapi-pino, winston?
