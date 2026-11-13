---
type: post
slug: vbnetconsolesqlserverunittests
title: "VB.NET Console SQL Server Unit Tests"
date: "2023-05-27"
builds_on: []
topics: [test-driven-development, refactoring, separation-of-concerns, unit-testing]
tools: [Visual Basic, SQL Server, ChatGPT, NUnit, .NET Framework]
status: current
checked: "2026-11-06"
source_hash: "3377f6ee174e"
generated_by: gemma4:12b
---

**Summary.** I demonstrate how to implement test-driven development for a Visual Basic Console Application. I show how to refactor code that interacts with a database to make it testable using unit tests.

## What I did
- I created a Console Application to fetch data from a database.
- I added a Unit Test Project to the solution.
- I used ChatGPT to help generate unit tests for the code.
- I refactored the code to separate database logic from console output.
- I wrote unit tests for the extracted logic.

## Claims
- I added unit tests to a console application that used standard SQL classes.
  > "I added unit tests to a Visual Basic Console App that fetched data from a database using SqlConnection, SqlCommand, SqlDataAdapter and DataTable classes."
- Unit tests do not require a running database server to execute.
  > "Unit tests run independent of a running database server."
- I used the .NET Framework 4.7.2 for the project.
  > "*I selected .NET Framework 4.7.2*"
- Mixing database access and console output makes it hard to write unit tests.
  > "It does not help that the database access and Console.WriteLine code is mixed together in a single block."
- I extracted the WriteDataTable code to create a function that is easier to test.
  > "I extracted the WriteDataTable code to create a function that was easier to create Unit Tests for."
- The extracted function accepts a DataTable as input.
  > "*I extracted the WriteDataTable function, which accepts a DataTable as input*"

## Outcome
I built a refactored application where the database logic is separated into a testable function. I successfully wrote unit tests for the data processing logic.

## Caveats
The post does not show how to test the actual connection to the database server.
