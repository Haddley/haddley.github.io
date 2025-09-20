---
title: "Microsoft SQL Server (Part 1)"
description: "A comprehensive guide covering microsoft sql server (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/mssqlserver.png"
tags: ["javascript","azure","docker","dotnet","c#"]
---

# Microsoft SQL Server (Part 1)

Microsoft SQL Server (Part 1) Microsoft SQL Server 2019 Docker image. ads by Microsoft Corporation is licensed under Source EULA Docker image Downloading and running amd64 Docker image from https://hub.docker.com/_/microsoft-mssql-server $ docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Passw0rd 123" -p 1433:1433 --name sql -d mcr.microsoft.com/mssql/server: 2019-latest docker run Azure Data Studio - New Connection Connected to database instance running on 192.168.68.109 RESTORE DATABASE Open shell for Docker image and download the AdventureWorks2019.bak database backup $ cd /usr $ wget https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak Open a database query window and execute this query RESTORE DATABASE AdventureWorks2019 FROM DISK = N'/usr/AdventureWorks2019.bak' WITH MOVE 'AdventureWorks2017' TO '/usr/AdventureWorks2019.mdf', MOVE 'AdventureWorks2017_Log' TO '/usr/AdventureWorks2019_Log.ldf' RESTORE DATABASE AdventureWorks Products Product names in a .NET Core console app % dotnet new sln % dotnet new console -o dotnet-sql % dotnet sln add ./dotnet-sql/dotnet-sql.csproj % cd dotnet-sql % dotnet new gitignore Add NuGet package % dotnet add package System.Data.SqlClient dotnet add package System.Data.SqlClient Program.cs The code below retrieves details from the Product table using C#. Program.cs dotnet run Product names in a Node console app $ node index.js The code below retrieves details from the Product table using JavaScript and the 'mssql' node module. index.js node index.js Product names in a Java console app $ javac Program.java then $ java -cp ".:/Users/neilhaddley/sqljdbc_9.2/enu/mssql-jdbc-9.2.1.jre11.jar" Program or $ export CLASSPATH=.:/Users/neilhaddley/sqljdbc_9.2/enu/mssql-jdbc-9.2.1.jre11.jar $ java Program The code below retrieves details from the Product table using Java. Program.java java Program.java
