---
title: "Microsoft SQL Server (Part 3)"
description: "A Node, React and MS SQL Server App."
date: "2025-09-20"
categories: ["SQL"]
image: "/assets/images/mssqlserver3/hero.png"
tags: []
hidden: true
slug: "mssqlserver3"
---


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


## Create Database

```text
-- Create a new database called 'ToDo'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'ToDo'
)
CREATE DATABASE ToDo
GO
```

## Use ToDo

```text
Use ToDo;
```

## Create Table

```text
-- Create a new table called '[Tasks]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[Tasks]', 'U') IS NOT NULL
DROP TABLE [dbo].[Tasks]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[Tasks]
(
    [Id] INT IDENTITY PRIMARY KEY, -- Primary Key column
    [UserId] NVARCHAR(50) NOT NULL,
    [Title] NVARCHAR(50) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    [DueDate] date NOT NULL,
    [DueTime] time(0) NULL,
    [IsDone] BIT default 'FALSE',
    INDEX idx_tasks_userId (UserId)
);
GO
```

## Insert into Tasks

```text
-- Insert rows into table 'Tasks' in schema '[dbo]'
INSERT INTO [dbo].[Tasks]
( -- Columns to insert data into
 [UserId], [Title], [Description], [DueDate], [DueTime]
)
VALUES
( -- First row: values for the columns in the list above
 'Doe', N'Shopping', N'Dinner Party Supplies','2021-12-31','19:00'
),
( -- Second row: values for the columns in the list above
'Doe', N'Yardwork', N'Mow Lawn','2021-12-15',null
)
-- Add more rows here
GO
```

## srcindex.js

```text
"use strict";

const server = require("./server");

const startServer = async () => {
    try {
        const config = {
            host: "localhost",
            port: "8080"
        };
        const app = await server(config);
        await app.start();

        console.log(`Server running at http://${config.host}:${config.port}`);
    } catch (err) {
        console.log("startup error", err);
    }
};

startServer();
```

## srcserver.js

```text
"use strict";

const hapi = require("@hapi/hapi");
const routes = require("./routes");

const app = async config => {
    const { host, port } = config;
    const server = hapi.server({ host, port });
    server.app.config = config;
    await routes.register(server);
    return server;
};

module.exports = app;
```

## srcroutesindex.js

```text
"use strict";

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/",
        handler: async (request, h) => {
            return "Hapi server";
        }
    })
}
```

## .env

```text
# hapi
PORT=8080
HOST=localhost
HOST_URL=http://localhost:8080

# sql
SQL_USER=sa
SQL_PASSWORD=Passw0rd123
SQL_DATABASE=ToDo
SQL_SERVER=192.168.68.109
# true for Azure SQL Server
SQL_ENCRYPT=false

# azure active directory
AZURE_APP_CLIENT_ID=63fe01c7-f396-484e-8a48-760f********
AZURE_DIR_TENANT_ID=1661e837-0a95-4bc6-a655-8653********
AZURE_CLIENT_SECRET=-~nGgWS3F7y~-o2etNGc0BW_ik_*******
AZURE_CLOUD_INSTANCE_ID=https://microsoftonline.com
AZURE_GRAPH_ENDPOINT=https://graph.microsoft.com
```

## srcconfig.js

```text
"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    SQL_SERVER,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT,"Port is required");
assert(HOST,"HOST is required");
assert(HOST_URL,"HOST_URL is required");
assert(SQL_SERVER,"SQL_SERVER is required");
assert(SQL_DATABASE,"SQL_DATABASE is required");
assert(SQL_USER,"SQL_USER is required");
assert(SQL_PASSWORD,"SQL_PASSWORD is required");

module.exports = {
    port: PORT,
    host: HOST,
    database: SQL_DATABASE,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        user: SQL_USER,
        password: SQL_PASSWORD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort:true
        }
    }
}
```

## srcdataindex.js

```text
"use strict";

const tasks = require("./tasks");
const sql = require("mssql");

const client = async (server, config) => {
    let pool = null;

    const closePool = async () => {
        try {
            await pool.close();
            pool = null;
        } catch (err) {
            console.log(err);
        }
    };

    const getConnection = async () => {
        try {
            if (pool) {
                return pool;
            }
            pool = await sql.connect(config) // was connect() in previous version of mssql library
            pool.on("error", async err => {
                console.log(err);
                await closePool();
            })
            return pool;
        } catch (err) {
            console.log(err);
            pool = null;
        }
    };

    return {
        tasks: await tasks.register({ sql, getConnection })
    }

};

module.exports = client;
```

## srcdatautils.js

```text
"use strict";

const fs=require("fs-extra");
const {join}=require("path");

const loadSqlQueries=async folderName=>{

    const filePath = join(process.cwd(),"src","data",folderName);
    const files = await fs.readdir(filePath);
    const sqlFiles = files.filter( f=> f.endsWith(".sql"))
    const queries  = {};
    for(const sqlFile of sqlFiles){
        const query=fs.readFileSync(join(filePath,sqlFile),{encoding:"UTF-8"});
        queries[sqlFile.replace(".sql","")] = query;
    }
    return queries;
}

module.exports = {
    loadSqlQueries
};
```

## srcdatatasksgetTasks.sql

```text
SELECT TOP (1000) [Id],
	[UserId],
	[Title],
	[Description],
	[DueDate],
	[DueTime],
	[IsDone]
FROM [ToDo].[dbo].[Tasks]
WHERE [UserId] = @userId
ORDER BY [DueDate],
	[DueTime]
```

## srcdatatasksindex.js

```text
"use strict";

const utils = require("../utils");

const register = async ({ sql, getConnection }) => {
    const sqlQueries = await utils.loadSqlQueries("tasks");
    const getTasks = async userId => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input("userId", sql.VarChar(50), userId);
        return request.query(sqlQueries.getTasks);
    }

    return {
        getTasks
    };
};

module.exports = { register };
```

## srcpluginsindex.js

```text
"use strict";

const sql=require("./sql");

module.exports.register = async server=>{
    await server.register(sql);
};
```

## srcpluginssql.js

```text
"use strict";

const dataClient = require("../data");

module.exports={
    name:"sql",
    version:"1.0.0",
    register:async server=>{
        const config= server.app.config.sql;
        const client = await dataClient(server,config);
        server.expose("client",client);
    }
}
```

## srcroutesapiindex.js

```text
"use strict";

const tasks = require("./tasks");

module.exports.register=async server=>{
    await tasks.register(server)
};
```

## srcroutesapitasks.js

```text
"use strict";

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/tasks",
        handler: async request => {
            try {
    const db = request.server.plugins.sql.client;
                const userId = "Doe";
                const res = await db.tasks.getTasks(userId);
                return res.recordset;
            } catch (err) {
                console.log(err); 
            }
        }
    });
};
```
## References

- [Build a Secure Node.js App with SQL Server](https://www.youtube.com/watch?v=XJpYH7K7TGM)

