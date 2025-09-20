---
title: "Java Spring Boot (Part 3)"
description: "A comprehensive guide covering java spring boot (part 3)"
date: "2025-09-20"
category: "Java"
image: "/assets/images/spring-boot-3/hero.png"
tags: ["azure","java","spring","git","github"]
---

# Java Spring Boot (Part 3)

## Spring Data JPA

![](/assets/images/spring-boot-3/spring-framework-logo-2018.svg)
*Spring Framework logo by Pivotal Software is licensed under Apache License 2.0*


## Spring Data JPA

Spring Data JPA provides a set of abstractions and high-level, repository-style interfaces that make it easier to work with Java Persistence API (JPA) for data access in Spring applications. It reduces boilerplate code.

I created a Spring Boot application using Spring Data JPA

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.03.24-am-1836x981.png)
*I created a new GitHub repository haddley-spring-data-jpa*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.04.03-am-1836x911.png)
*I opened the repository using GitHub Desktop*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.04.25-am-1836x956.png)
*I cloned the GitHib repository*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.04.49-am-1830x872.png)
*GitHub repository folder*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.40.07-am-1836x1176.png)
*I created a new spring boot application springdatajpa*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.16.13-am-1834x864.png)
*I copied the generated files to the GitHub repository folder*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.46.13-am-1836x1018.png)
*I updated SpringdatajpaApplication.java so that it would respond to http://localhost/hello requests*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.26.33-am-1836x213.png)
*I accessed http://localhost/hello using my web browser*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.52.00-am-1836x1031.png)
*I created a TodoItem Java class*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-11.10.46-am-1836x407.png)
*I created a Spring Data JPA repository interface (based on the TodoItem class)*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-11.17.11-am-1836x1010.png)
*I created a TodoItemDataLoader to ensure that if the repository was empty two new TodoItems would be added as the application started*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.21.33-pm-1836x1013.png)
*I updated SpringdatajpaApplication.java to return all of the TodoItems in response to http://localhost/hello requests*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.25.12-pm-1836x158.png)
*I accessed http://localhost/todos using my web browser*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.35.11-pm-1836x537.png)
*I added text to applications.properties*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.38.23-pm-1836x614.png)
*I accessed the h2 console (using values jdbc:h2:mem:testdb, sa and password)*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.38.56-pm-1836x1063.png)
*I clicked on the TODO_ITEM table*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.39.17-pm-1836x575.png)
*I clicked Run to execute the select query*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-1.16.08-pm-2136x1238.png)
*The haddley-spring-data-jpa application hosted in Azure*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-1.16.29-pm-2136x418.png)
*Accessing the haddley-spring-data-jpa application hosted in Azure*
