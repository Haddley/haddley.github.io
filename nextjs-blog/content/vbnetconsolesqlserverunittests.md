---
title: "VB.NET Console SQL Server Unit Tests"
description: "A comprehensive guide covering vb.net console sql server unit tests"
date: "2025-09-20"
category: "Development"
image: "/assets/images/net-logo.svg"
tags: ["dotnet","sql","database","ai","testing"]
---

# VB.NET Console SQL Server Unit Tests

## Test driven development

![](/assets/images/vbnetconsolesqlserverunittests/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## Unit Tests

Unit tests are automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended.

I wanted to add unit tests to a Visual Basic Console App that fetched data from a database using SqlConnection, SqlCommand, SqlDataAdapter and DataTable classes.

In any case it is best practice is for Unit Tests to run independent of a running database server.

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000001-890x625.png)
*I created a new project (in a new solution)*

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000002-889x626.png)
*I selected the .NET Framework (old school)*

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000003-890x624.png)
*I selected .NET Framework 4.7.2*

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000004-1325x674.png)
*Main*

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000005-1363x382.png)
*I added Hello World code*

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000006-1359x567.png)
*I updated the Console Application to connect to a database and display the contents of a Tasks table*

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000017-1361x656.png)
*I added a second project to the solution. I selected the Unit Test Project (.NET Framework) template*

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000018-1362x683.png)
*I accepted the defaults*

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000019-1360x250.png)
*I added a reference to the Test project*


## ChatGPT

I asked ChatGPT to generate unit tests for the code.

**Write Unit Tests for this code

Imports System.Data.SqlClient

Module Module1
...**

To write unit tests for the given code, you can use a testing framework such as NUnit or xUnit. However, since the code primarily consists of database interactions and console output, it may not be feasible to write traditional unit tests for it.

Instead, you can consider refactoring the code to improve testability by separating concerns. One approach could be to move the database-related code into a separate class or method that returns the result DataTable. Then, you can write unit tests specifically for that database-related code.

Here's an example of how you can refactor the code and write unit tests for the database interaction part using NUnit:

...

![](/assets/images/vbnetconsolesqlserverunittests/database-unit-test-1366x728.png)
*Database Tests*


## Refactoring the code with testing in mind

As ChatGPT explained it is hard to create Unit Tests for the database and Console code contained in the Module1.vb. 

It does not help that the database access and Console.WriteLine code is mixed together in a single block.

I extracted the WriteDataTable code to create a function that was easier to create Unit Tests for.

I wrote the UnitTestProject2 tests with the help of ChatGPT.

![](/assets/images/vbnetconsolesqlserverunittests/capture-unit-test-aaa-0000020-1098x244.png)
*The WriteDataTable function expects to be passed a DataTable.*

![](/assets/images/vbnetconsolesqlserverunittests/mixed-unit-tests-1366x728.png)
*Running the Unit Tests*
