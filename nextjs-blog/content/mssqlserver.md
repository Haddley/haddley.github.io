---
title: "Microsoft SQL Server (Part 1)"
description: "A comprehensive guide covering microsoft sql server (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/ads.svg"
tags: ["javascript","azure","docker","dotnet","c#"]
---

# Microsoft SQL Server (Part 1)

## Microsoft SQL Server 2019 Docker image.

![](/assets/images/mssqlserver/ads.svg)
*ads by Microsoft Corporation is licensed under Source EULA*


## Docker image

Downloading and running amd64 Docker image from [https://hub.docker.com/_/microsoft-mssql-server](https://hub.docker.com/_/microsoft-mssql-server)

**$ docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Passw0rd****123" -p 1433:1433 --name sql -d mcr.microsoft.com/mssql/server:****2019-latest**

![](/assets/images/mssqlserver/image-28-651x336.png)
*docker run*

![](/assets/images/mssqlserver/screen-shot-2021-03-14-at-5.03.27-pm-1538x1266.png)
*Azure Data Studio - New Connection*

![](/assets/images/mssqlserver/screen-shot-2021-03-14-at-5.05.30-pm-1540x1264.png)
*Connected to database instance running on 192.168.68.109*


## RESTORE DATABASE

Open shell for Docker image and download the AdventureWorks2019.bak database backup

**$ cd /usr**

**$ wget https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak**

Open a database query window and execute this query

RESTORE DATABASE AdventureWorks2019 
FROM DISK = N'/usr/AdventureWorks2019.bak'
WITH MOVE 'AdventureWorks2017' TO '/usr/AdventureWorks2019.mdf',
MOVE 'AdventureWorks2017_Log' TO '/usr/AdventureWorks2019_Log.ldf'

![](/assets/images/mssqlserver/screen-shot-2021-03-14-at-5.56.57-pm-1836x1029.png)
*RESTORE DATABASE*

![](/assets/images/mssqlserver/screen-shot-2021-03-14-at-6.08.10-pm-1836x1031.png)
*AdventureWorks Products*


## Product names in a .NET Core console app

```bash
% dotnet new sln
```

```bash
% dotnet new console -o dotnet-sql 
```

```bash
% dotnet sln add ./dotnet-sql/dotnet-sql.csproj
```

```bash
% cd dotnet-sql

```

```bash
% dotnet new gitignore
```

Add [NuGet](nuget.html) package

```bash
% dotnet add package System.Data.SqlClient
```
**
**

![](/assets/images/mssqlserver/screen-shot-2021-03-15-at-7.10.16-pm-1836x1133.png)
*dotnet add package System.Data.SqlClient*


## Program.cs

The code below retrieves details from the Product table using C#.

![](/assets/images/mssqlserver/screen-shot-2021-03-16-at-8.49.39-pm-1126x740.png)
*dotnet run*


## Product names in a Node console app

**$ node index.js**

The code below retrieves details from the Product table using JavaScript and the 'mssql' node module.

![](/assets/images/mssqlserver/screen-shot-2021-03-25-at-5.50.18-pm-1134x734.png)
*node index.js*


## Product names in a Java console app

**$ javac Program.java**

then

**$ java -cp ".:/Users/neilhaddley/sqljdbc_9.2/enu/mssql-jdbc-9.2.1.jre11.jar" Program**

or

**$ export CLASSPATH=.:/Users/neilhaddley/sqljdbc_9.2/enu/mssql-jdbc-9.2.1.jre11.jar

$ java Program**

The code below retrieves details from the Product table using Java.

![](/assets/images/mssqlserver/screen-shot-2021-03-25-at-5.48.28-pm-1134x736.png)
*java Program.java*
