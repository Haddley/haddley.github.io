---
title: "Java Spring Boot (Spare)"
description: "Spring Data JPA"
date: "2025-09-20"
category: "Development"
image: "/assets/images/page141/hero.png"
tags: ["azure","docker","java","spring","postgresql"]
hidden: true
---

# Java Spring Boot (Spare)

## Spring Data JPA

![](/assets/images/page141/spring-framework-logo-2018.svg)
*Spring Framework logo by Pivotal Software is licensed under Apache License 2.0*


## Spring Data JPA

Spring Data JPA provides a set of abstractions and high-level, repository-style interfaces that make it easier to work with Java Persistence API (JPA) for data access in Spring applications. It reduces boilerplate code.

I created a Spring Boot application that used Spring Data JPA to access PostgreSQL.

![](/assets/images/page141/screenshot-2023-10-28-at-4.32.38-pm-2136x1094.png)
*I created a GitHub repository*

![](/assets/images/page141/screenshot-2023-10-28-at-4.33.17-pm-2136x1095.png)
*I opened the repository using GitHub Desktop*

![](/assets/images/page141/screenshot-2023-10-28-at-4.33.40-pm-2136x1112.png)
*I clicked the Open in Visual Studio Code button*


## ProgreSQL running locally

I used Docker to run an instance of ProgreSQL locally.

![](/assets/images/page141/screenshot-2023-10-28-at-4.35.46-pm-2044x1020.png)
*I added a docker-compose.yml file. The docker compose file will start a Docker container running PostgreSQL and a second container running Adminer (a database administration tool). Notice that in the Docker virtual network the PostgreSQL instance has hostname db.*

![](/assets/images/page141/screenshot-2023-10-28-at-4.43.20-pm-2078x204.png)
*I ran docker componse -f docker-compose.yml up*

![](/assets/images/page141/screenshot-2023-10-28-at-4.38.14-pm-2136x938.png)
*The Docker containers were started*

![](/assets/images/page141/screenshot-2023-10-28-at-7.23.40-pm-2136x550.png)
*I used Adminer to login to the local ProgreSQL instance (using hostname db)*

![](/assets/images/page141/screenshot-2023-10-28-at-7.23.52-pm-2136x660.png)
*I clicked the Create database link*

![](/assets/images/page141/screenshot-2023-10-28-at-7.24.08-pm-2136x356.png)
*I added a todo database*

![](/assets/images/page141/screenshot-2023-10-28-at-7.24.20-pm-2136x814.png)
*Initially the todo database contained no tables*

![](/assets/images/page141/screenshot-2023-10-28-at-8.06.56-pm-2136x1141.png)
*The haddley-java-jpa program running locally connected to a local instance of ProgreSQL*

![](/assets/images/page141/screenshot-2023-10-28-at-8.08.08-pm-2136x689.png)
*Contents of the local instance of ProgreSQL*


## ProgreSQL in Azure

I used Microsoft Azure to run an instance of ProgreSQL in Azure.

![](/assets/images/page141/screenshot-2023-10-28-at-12.29.56-pm-2136x875.png)
*I searched for postgreSQL in Azure*

![](/assets/images/page141/screenshot-2023-10-28-at-12.30.44-pm-2136x1129.png)
*I selected the Azure Database for ProgreSQL option*

![](/assets/images/page141/screenshot-2023-10-28-at-12.49.06-pm-2136x1238.png)
*I created a new resource group haddley-progressql-rg (sic)*

![](/assets/images/page141/screenshot-2023-10-28-at-12.49.45-pm-2136x1243.png)
*I specified the server name haddley-postgressql (sic) and the workload type Development*

![](/assets/images/page141/screenshot-2023-10-28-at-12.50.39-pm-2136x1243.png)
*I selected PostgreSQL authentication (providing admin username haddleyroot and a password)*

![](/assets/images/page141/screenshot-2023-10-28-at-12.52.48-pm-2136x1244.png)
*I specified firewall options*

![](/assets/images/page141/screenshot-2023-10-28-at-12.59.58-pm-2136x1241.png)
*The Azure hosted copy of PostgresSQL has server name haddley-postgressql.postgres.database.azure.com*

![](/assets/images/page141/screenshot-2023-10-28-at-1.01.20-pm-2136x532.png)
*I used Adminer running on http://localhost:9090 to access the Azure hosted PostgresSQL instance*

![](/assets/images/page141/screenshot-2023-10-28-at-7.29.24-pm-2136x768.png)
*I clicked on the Create database link*

![](/assets/images/page141/screenshot-2023-10-28-at-7.29.36-pm-2136x363.png)
*I created a todo database*

![](/assets/images/page141/screenshot-2023-10-28-at-7.29.49-pm-2136x762.png)
*The todo database initially contained no tables*

![](/assets/images/page141/screenshot-2023-10-28-at-7.36.47-pm-2136x1205.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.37.29-pm-2136x1209.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*


## Web App

I created an Azure Web App to host the Java application

![](/assets/images/page141/screenshot-2023-10-28-at-7.38.13-pm-2136x1212.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.38.45-pm-2136x1213.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.39.50-pm-2136x1213.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.40.16-pm-2136x1211.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.41.11-pm-2136x1208.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.42.00-pm-2136x1208.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.42.44-pm-2136x1212.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.42.56-pm-2136x1208.png)
*/opt/homebrew/Cellar/glfw/3.3.8/include*

![](/assets/images/page141/screenshot-2023-10-28-at-7.59.40-pm-2136x1210.png)
*The haddley-java-jpa program being deployed to Azure using the GitHub Action*

![](/assets/images/page141/screenshot-2023-10-28-at-8.04.45-pm-2136x1144.png)
*The haddley-java-jpa program running in Azure connected to an Azure hosted instance of ProgreSQL (notice that Azure servers use universal/GMT date and time)*

![](/assets/images/page141/screenshot-2023-10-28-at-8.11.35-pm-2136x710.png)
*Contents of the Azure hosted instance of ProgreSQL*
## References

- [Spring Data JPA: What is it? And Why Should You Use It?](https://www.youtube.com/watch?v=x67yiTHxn00)
- [90 Minutes to a Complete Java Spring Boot TODO App](https://www.youtube.com/watch?v=Hvuij8SOW8Q)

