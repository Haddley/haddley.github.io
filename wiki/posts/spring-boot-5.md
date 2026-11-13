---
type: post
slug: spring-boot-5
title: "Java Spring Boot (Part 5)"
date: "2023-10-30"
part: 5
builds_on: [graphql]
topics: [graphql-schema, spring-boot, h2-database, many-to-many-relationships]
tools: [Spring for GraphQL, GraphQL Java, H2 Database, GraphiQL, Spring Initializr]
status: current
checked: "2026-11-06"
source_hash: "3b0915d1fe5c"
generated_by: gemma4:12b
---

**Summary.** I built a GraphQL API using Spring for GraphQL and an H2 database. The post demonstrates how to define a schema, implement queries and mutations, and use the GraphiQL explorer to interact with the data.

## What I did
- I created a new project using Spring Initializr.
- I defined a schema with types and entry points.
- I implemented Java methods for queries and mutations.
- I configured an in-memory H2 database to store data.
- I used GraphiQL to test the API functionality.

## Claims
- A query is used to read data while a mutation is used to change it.
  > "A: A query reads data and a mutation changes it."
- The schema acts as the contract between the client and the server.
  > "A: The contract between the client and the server."
- The H2 database stores data in memory so that changes are lost when the application stops.
  > "The H2 database is in memory, so my changes are lost when the application stops."
- Spring for GraphQL connects Java methods to schema fields by matching their names.
  > "Spring for GraphQL connects Java methods to the fields in a schema file by name."
- A join table is used to store the many-to-many relationship between books and authors.
  > "Books and authors are linked many-to-many, which the database stores in a join table."
- The GraphiQL tool provides a browser page to test queries and mutations.
  > "GraphiQL gave me a page to try queries and mutations in the browser."

## Outcome
I built a GraphQL application that supports complex data relationships and provides a web interface for testing queries.

## Caveats
The data is stored in memory, so any changes made during a session are lost when the application stops.
