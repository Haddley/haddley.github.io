---
title: "Java Spring Boot (Part 5)"
description: "A comprehensive guide covering java spring boot (part 5)"
date: "2025-09-20"
category: "Java"
image: "/assets/images/spring-boot-5/hero.png"
tags: ["java","spring","ai","ml","git"]
---

# Java Spring Boot (Part 5)

## Spring for GraphQL

![](/assets/images/spring-boot-5/spring-framework-logo-2018.svg)
*Spring Framework logo by Pivotal Software is licensed under Apache License 2.0*


## Spring for GraphQL

Build GraphQL applications with Spring for [GraphQL](GraphQL.html) and GraphQL Java.

![](/assets/images/spring-boot-5/screenshot-2023-10-30-at-12.13.17-pm-1253x813.png)
*I created a new GitHub repository*

![](/assets/images/spring-boot-5/screenshot-2023-10-30-at-12.46.56-pm-1251x1056.png)
*I used spring initializr to create a new project*


## The finished project

I used http://localhost:8080/graphiql to demonstrate the finished code (in line with my [node GraphQL](GraphQL.html) implementation)

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.07.53-am-1432x1011.png)
*books*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.10.30-am-1433x515.png)
*author(id: 6)*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.17.34-am-1430x386.png)
*addAuthor*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.20.06-am-1433x540.png)
*addBook*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.22.12-am-1429x591.png)
*SELECT * FROM AUTHOR*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.22.36-am-1434x515.png)
*SELECT * FROM BOOK*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.23.00-am-1433x553.png)
*SELECT * FROM BOOK_AUTHORS*


## Implementation

Here are the Java implementation details

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.24.59-am-2136x1230.png)
*application.properties*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.29.07-am-2136x1231.png)
*SeedDataConfig.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.34.19-am-2136x1227.png)
*Author.js*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.43.31-am-2136x1231.png)
*Book.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.44.20-am-2136x883.png)
*AuthorRepository.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.45.39-am-2136x713.png)
*BookRepository.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.47.25-am-2136x923.png)
*schema.graphqls*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.49.44-am-2136x1182.png)
*AuthorController.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.52.27-am-2136x1175.png)
*BookController.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.53.42-am-2136x1017.png)
*pom.xml*
