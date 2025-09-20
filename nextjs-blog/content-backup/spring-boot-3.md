---
title: "Java Spring Boot (Part 3)"
description: "A comprehensive guide covering java spring boot (part 3)"
date: "2025-09-20"
category: "Java"
image: "/assets/images/spring-boot-3.png"
tags: ["azure","java","spring","git","github"]
---

# Java Spring Boot (Part 3)

Java Spring Boot (Part 3) Spring Data JPA Spring Framework logo by Pivotal Software is licensed under Apache License 2.0 Spring Data JPA Spring Data JPA provides a set of abstractions and high-level, repository-style interfaces that make it easier to work with Java Persistence API (JPA) for data access in Spring applications. It reduces boilerplate code. I created a Spring Boot application using Spring Data JPA I created a new GitHub repository haddley-spring-data-jpa I opened the repository using GitHub Desktop I cloned the GitHib repository GitHub repository folder I created a new spring boot application springdatajpa I copied the generated files to the GitHub repository folder I updated SpringdatajpaApplication.java so that it would respond to http://localhost/hello requests SpringdatajpaApplication.java I accessed http://localhost/hello using my web browser I created a TodoItem Java class TodoItem.java I created a Spring Data JPA repository interface (based on the TodoItem class) TodoItemRepository.java I created a TodoItemDataLoader to ensure that if the repository was empty two new TodoItems would be added as the application started TodoItemDataLoader.java I updated SpringdatajpaApplication.java to return all of the TodoItems in response to http://localhost/hello requests SpringdatajpaApplication.java (updated) I accessed http://localhost/todos using my web browser I added text to applications.properties application.properties I accessed the h2 console (using values jdbc:h2:mem:testdb, sa and password) I clicked on the TODO_ITEM table I clicked Run to execute the select query The haddley-spring-data-jpa application hosted in Azure Accessing the haddley-spring-data-jpa application hosted in Azure References Spring Data JPA: What is it? And Why Should You Use It? 90 Minutes to a Complete Java Spring Boot TODO App
