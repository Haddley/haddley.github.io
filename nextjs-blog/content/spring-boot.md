---
title: "Java Spring Boot (Part 1)"
description: "A comprehensive guide covering java spring boot (part 1)"
date: "2025-09-20"
category: "Java"
image: "/assets/images/spring-framework-logo-70-no.svg"
tags: ["react","javascript","java","spring","ai"]
---

# Java Spring Boot (Part 1)

## Spring based Java Applications that you can "just run".

![](/assets/images/spring-boot/spring-framework-logo-2018.svg)
*Spring Framework logo by Pivotal Software is licensed under Apache License 2.0*


## Spring Tool Suite

Spring Tool Suite is an Integrated Development Environment based on Eclipse.


## Maven

Maven is a build and dependency management tool for Java.

The pom.xml file is used to maintain a list of modules that the Spring application depends on.

Module jar files are downloaded from a managed repository.


## Creating a REST project using Spring Boot

Open Spring Tool Suite
Create new Spring Starter Project
Add Book class
Add BooksRestController
Run as Spring Boot App
Test using Browser

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.01.43-am-1718x1074.png)
*Create new Spring Starter Project*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.03.13-am-1180x1440.png)
*Enter the project name and package details*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.03.38-am-1174x1440.png)
*The REST API project depends on "Spring Web"*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.04.47-am-1430x436.png)
*Add a new class*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.05.11-am-1180x1254.png)
*Add class "Book"*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.06.30-am-1174x1254.png)
*Add class "BooksRestController"*


## Annotations

The **@RestController** annotation is used to mark the BooksRestController class as a Spring Framework RestController.

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.07.37-am-1836x552.png)
*Add @RestController annotation to BooksRestController classUse CTRL+Space to import org.springframework.web.bind.annotation.RestController*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.10.26-am-1722x1076.png)
*Add "books" ArrayList to the BooksRestController*


## Books REST Controller

The **@GetMapping** annotation is used to mark the book and books methods as HTTP Get method handlers.

The completed BooksRestController code is shown below.

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.17.47-am-560x844.png)
*Run as Spring Boot App*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.19.11-am-1836x874.png)
*http://localhost:8080/books*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.19.46-am-1836x873.png)
*http://localhost:8080/books/1788395549*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.20.30-am-1836x875.png)
*http://localhost:8080/books/1234567890*


## React client

Static files can be added to the /src/main/resources/static folder of the Spring Boot project.

The static files can be image files, html files and javascript files.

The static files can be a [React](reactusestateuseeffect.html) app that calls the REST API exposed by the (same) Spring Boot project.

![](/assets/images/spring-boot/screen-shot-2021-04-08-at-3.28.25-pm-1836x981.png)
*Static files*

![](/assets/images/spring-boot/screen-shot-2021-04-08-at-3.27.02-pm-1286x750.png)
*Running the React/Spring Boot app*
