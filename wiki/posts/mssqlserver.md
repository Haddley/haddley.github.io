---
type: post
slug: mssqlserver
title: "Microsoft SQL Server (Part 1)"
date: "2021-03-14"
part: 1
builds_on: [nuget]
topics: [sql-server, docker-containers, database-integration, multi-language-querying]
tools: [Docker, Microsoft SQL Server, C, JavaScript, Java, NuGet]
status: current
checked: "2026-11-06"
source_hash: "dd82f31587c6"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to set up and interact with a Microsoft SQL Server 2019 instance using Docker. I show how to connect to the database and query the Product table using C#, JavaScript, and Java.

## What I did
- I deployed a Microsoft SQL Server Docker image.
- I imported the AdventureWorks2019 database backup.
- I configured the environment for various programming languages.
- I wrote code in multiple languages to retrieve data from the Product table.

## Claims
- I used a specific Docker image for the SQL Server instance.
  > "I downloaded and ran the amd64 Docker image from https://hub.docker.com/_/microsoft-mssql-server"
- I retrieved the database backup from a GitHub repository.
  > "**$ wget https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak**"
- I used the mssql node module to query the database with JavaScript.
  > "I wrote code to retrieve details from the Product table using JavaScript and the `mssql` node module."
- I configured the CLASSPATH to use the mssql-jdbc driver for Java.
  > "**$ export CLASSPATH=.:/Users/neilhaddley/sqljdbc_9.2/enu/mssql-jdbc-9.2.1.jre11.jar"

## Outcome
I built a functional SQL Server environment and demonstrated how to query it using three different programming languages.

## Caveats
The post does not show the specific internal configuration of the Docker container beyond the initial image pull.
