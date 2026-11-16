---
type: concept
slug: spring-boot
title: "Spring Boot"
description: "I demonstrate how to build, secure, and deploy full-stack web applications using the Spring Boot framework."
posts: [spring-boot-7, spring-boot-6, spring-boot-5, spring-boot-4, spring-boot-3, spring-boot-2, spring-boot]
status: current
checked: "2026-11-16"
source_hash: "6c145bc74391"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to build, secure, and deploy full-stack web applications using the Spring Boot framework. These posts cover everything from creating REST APIs and GraphQL endpoints to managing data with Spring Data JPA and deploying to Azure.

## The idea
- Build and deploy web applications using Spring Boot and Java.
- Integrate security features like OAuth2 and role-based access control.
- Manage data using H2 in-memory databases and Spring Data JPA.
- Deploy applications to cloud platforms like Azure using GitHub Actions.
- Develop both RESTful APIs and GraphQL interfaces.

## Claims
- The @RestController annotation ensures that methods return data instead of web pages.
  > "A: It marks the class as a controller whose methods return data, not web pages." — spring-boot
- Spring Data JPA allows for data storage using Java classes and interfaces without writing SQL.
  > "Spring Data JPA lets me store a TodoItem with a Java class and a repository interface, with no SQL." — spring-boot-3
- The application never sees the user's GitHub password during OAuth2 authentication.
  > "The application sends the browser to GitHub, the user signs in there, and GitHub sends the browser back with proof, so my application never sees the GitHub password." — spring-boot-6
- The schema acts as the contract between the client and the server in a GraphQL API.
  > "A: The contract between the client and the server." — spring-boot-5
- I used ModelAndView to pass both the view name and the model data to the template.
  > "A: It carries two things from a controller to the page: the name of the view, and the model, which is the data that the view needs." — spring-boot-4
- Azure Spring Apps is a managed service that handles the underlying Kubernetes infrastructure.
  > "**It is fully managed, and it runs on Kubernetes.** Each service instance has two dedicated Kubernetes clusters that Azure Spring Apps manages and hides from me." — spring-boot-7
- The build job sets up the environment and creates the JAR file.
  > "A build job checks out the code, sets up Java 17, runs mvn clean install, and uploads the JAR file." — spring-boot-2

## Where the posts differ
- The application transitioned from storing data in memory only to using an H2 database and later to Spring Data JPA.
  > "The books are held in memory only, so they are lost when the application stops." — spring-boot
  > "Spring Data JPA lets me store a TodoItem with a Java class and a repository interface, with no SQL." — spring-boot-3

## What I concluded
Spring Boot provides a comprehensive ecosystem for building production-ready applications with integrated security, data persistence, and cloud deployment capabilities. By following these steps, you can move from a simple REST API to a complex, secured web application hosted on Azure.
