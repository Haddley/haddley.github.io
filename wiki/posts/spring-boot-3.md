---
type: post
slug: spring-boot-3
title: "Java Spring Boot (Part 3)"
date: "2023-10-28"
part: 3
builds_on: []
topics: [spring-boot, spring-data-jpa, h2-database, azure-deployment]
tools: [Spring Boot, Spring Data JPA, H2 Database, GitHub, Azure]
status: current
checked: "2026-11-06"
source_hash: "d33cbd130bd4"
generated_by: gemma4:12b
---

**Summary.** I built a Spring Boot application that uses Spring Data JPA to manage todo items. I demonstrated how to use an in-memory H2 database for storage and deployed the final application to Azure.

## What I did
- I created a Spring Boot application with Spring Data JPA to reduce boilerplate code.
- I implemented a TodoItem repository and a data loader to populate the database.
- I configured and accessed an H2 in-memory database to verify the data.
- I deployed the application to Azure.

## Claims
- Spring Data JPA reduces the amount of boilerplate code needed for data access.
  > "I created a Spring Boot application using Spring Data JPA, which provides high-level, repository-style interfaces for data access and reduces boilerplate code."
- The repository interface inherits standard methods like findById and save from the framework.
  > "The interface has no methods of its own, but it inherits ones such as findAll, findById, save, delete and count, and Spring supplies the implementation when the application starts."
- The CommandLineRunner ensures the list is not empty by checking the count before adding items.
  > "The zero check is what stops it adding duplicates."
- The H2 database is stored in memory and loses all data when the application stops.
  > "Everything in it disappears when the application stops, and the data loader puts the two items back on the next start."
- The application reports two items every time because the loader adds them to the empty database on startup.
  > "It reports 2 each time, because the database starts empty and the loader adds the two items."
- Spring Data JPA allows for data storage using Java classes and interfaces without writing SQL.
  > "Spring Data JPA lets me store a TodoItem with a Java class and a repository interface, with no SQL."

## Outcome
I built a functional todo application that demonstrates how to map Java objects to database tables without manual SQL. I also successfully deployed this application to a cloud environment.

## Caveats
The post uses an in-memory database which does not persist data between runs, unlike a production database.
