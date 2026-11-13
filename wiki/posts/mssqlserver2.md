---
type: post
slug: mssqlserver2
title: "Microsoft SQL Server (Part 2)"
date: "2021-03-27"
part: 2
builds_on: []
topics: [t-sql, stored-procedures, snapshot-isolation, concurrency-control]
tools: [Microsoft SQL Server, C, JavaScript, mssql node module, Java]
status: current
checked: "2026-11-06"
source_hash: "38c8fe6c3f23"
generated_by: gemma4:12b
---

**Summary.** I explored the use of T-SQL stored procedures to manage concurrent data updates in a card shuffling application. I discovered that standard transaction handling can lead to silent failures under load, which I resolved by implementing Snapshot isolation.

## What I did
- I created stored procedures to manage card shuffling logic within the database.
- I identified a concurrency issue where multiple clients caused transactions to interfere with each other.
- I implemented Snapshot isolation to ensure data consistency during concurrent updates.
- I tested the solution using C#, JavaScript, and Java client applications.

## Claims
- Stored procedures allow for easier performance improvements across all client applications.
  > "Stored procedures are maintained in the database, making it easier to apply performance improvements that benefit all client applications."
- The original stored procedure failed silently when multiple clients accessed the data simultaneously.
  > "With concurrency introduced, the original SwapCards stored procedure failed silently — no errors were raised but transactions were stepping on each other."
- Snapshot isolation ensures that reads see a consistent snapshot and prevents conflicting updates.
  > "Snapshot isolation guarantees that reads in a transaction see a consistent snapshot and that the transaction only commits if no conflicting concurrent update occurred."
- Snapshot isolation causes a commit to fail and raise an error if a conflict occurs.
  > "With snapshot isolation enabled, there is a chance that a commit will fail and raise an error — which is the desired behaviour."
- I used the mssql node module to call the stored procedure from a JavaScript environment.
  > "I wrote JavaScript code to call the SwapCards stored procedure 1,000 times using the `mssql` node module."
- I used Java code to call the stored procedure 1,000 times.
  > "I wrote Java code to call the SwapCards stored procedure 1,000 times."

## Outcome
I built a robust card shuffling system that handles concurrent requests correctly using Snapshot isolation. I demonstrated that this approach prevents silent transaction failures and ensures data integrity.

## Caveats
The post does not detail the specific logic for the retry mechanism that I considered for the client code.
