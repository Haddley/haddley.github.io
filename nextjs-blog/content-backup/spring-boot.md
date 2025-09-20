---
title: "Java Spring Boot (Part 1)"
description: "A comprehensive guide covering java spring boot (part 1)"
date: "2025-09-20"
category: "Java"
image: "/assets/images/spring-boot.png"
tags: ["react","javascript","java","spring","ai"]
---

# Java Spring Boot (Part 1)

Java Spring Boot (Part 1) Spring based Java Applications that you can "just run". Spring Framework logo by Pivotal Software is licensed under Apache License 2.0 Spring Tool Suite Spring Tool Suite is an Integrated Development Environment based on Eclipse. Maven Maven is a build and dependency management tool for Java. The pom.xml file is used to maintain a list of modules that the Spring application depends on. Module jar files are downloaded from a managed repository. Creating a REST project using Spring Boot Open Spring Tool Suite Create new Spring Starter Project Add Book class Add BooksRestController Run as Spring Boot App Test using Browser Create new Spring Starter Project Enter the project name and package details The REST API project depends on "Spring Web" Add a new class Add class "Book" Book.java Add class "BooksRestController" Annotations The @RestController annotation is used to mark the BooksRestController class as a Spring Framework RestController. Add @RestController annotation to BooksRestController class Use CTRL+Space to import org.springframework.web.bind.annotation.RestController Add "books" ArrayList to the BooksRestController Books REST Controller The @GetMapping annotation is used to mark the book and books methods as HTTP Get method handlers. The completed BooksRestController code is shown below. BooksRestController.java Run as Spring Boot App http://localhost:8080/books http://localhost:8080/books/1788395549 http://localhost:8080/books/1234567890 React client Static files can be added to the /src/main/resources/static folder of the Spring Boot project. The static files can be image files, html files and javascript files. The static files can be a React app that calls the REST API exposed by the (same) Spring Boot project. Static files App.js index.html React App You need to enable JavaScript to run this app.
