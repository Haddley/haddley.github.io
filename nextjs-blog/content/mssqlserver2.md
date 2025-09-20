---
title: "Microsoft SQL Server (Part 2)"
description: "A comprehensive guide covering microsoft sql server (part 2)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/mssqlserver2/hero.png"
tags: ["javascript","dotnet","c#","java","sql"]
---

# Microsoft SQL Server (Part 2)

## T-SQL, Stored Procedures and Snapshot Isolation.

![](/assets/images/mssqlserver2/ads.svg)
*ads by Microsoft Corporation is licensed under Source EULA*


## Stored procedures

Transact SQL (T-SQL) statements are used to create Microsoft SQL Server Stored Procedures.

Stored Procedures are maintained in the database making it easier to apply updates that improve the performance of all client applications.

Stored Procedures that help customers to purchase cinema tickets or reserve seats on airplanes need to be written with isolation levels in mind.


## Shuffling cards

Consider how a stored procedure might be used to shuffle the contents of a table representing a deck of playing cards.


## Swap cards

To shuffle a deck of standard playing cards we could select any two cards from the deck at random and swap their positions. If we did this enough times the deck would be shuffled.

Here is a stored procedure that will swap the data in two rows of the deck table.


## Pick two cards, swap and repeat

To test the SwapCards stored procedure we can create:

**a PickACard function **that selects a card from the deck at random
                        **a SwapCardsAtRandom stored procedure **that uses the PickACard function (twice) and the SwapCards stored procedure (above) to swap the random pair of cards; **and**
                        **client code **that calls the SwapCardsAtRandom stored procedure 1,000 times.


## With a single client

Running a single copy of client code that calls the SwapCardV1 stored procedure is fine.

The result is a shuffled deck with 13 cards of each suit.

![](/assets/images/mssqlserver2/screen-shot-2021-03-27-at-9.01.56-pm-1836x1139.png)
*Shuffle results single client*


## Concurrency issues

However, running multiple copies of the client code that calls the SwapCardV1 stored procedure reveals an issue.

![](/assets/images/mssqlserver2/screen-shot-2021-03-27-at-9.08.55-pm-1836x1136.png)
*Shuffle failure*


## Snapshot issolation

When concurrency is introduced our original SwapCards stored procedure does not work. No errors are being raised but transactions are stepping on each other.

We can use Snapshot isolation to address the issue.


## Multiple clients

With the updated SwapCard stored procedure we can run multiple updates concurrently.

![](/assets/images/mssqlserver2/screen-shot-2021-03-27-at-9.25.19-pm-1836x1138.png)
*Shuffle success*


## Catching the errors

Snapshot isolation guarantees that reads made in a transaction will see a consistent snapshot of the database and that the transaction will commit only if no update made in the transaction conflicts with another concurrent update.

With snapshot isolation enabled there is a chance that a commit will fail and that an error will be raised. This is a good thing.

In the code shown above if SwapCards throws an error the client code catches the error, prints a message and continues. Perhaps instead the client code should retry the swap?

![](/assets/images/mssqlserver2/screen-shot-2021-03-27-at-9.25.30-pm-1836x1131.png)
*Concurrency exceptions (that the client code needs to handle)*


## .NET Core console app

**$ dotnet run**

The code below calls the SwapCards stored procedure 1000 times using C#.**
**


## Node console app

**$ node index.js**

The code below calls the SwapCards stored procedure 1000 times using JavaScript and the 'mssql' node module.**
**


## Java console app

**$ javac Program.java**

then

**$ java -cp ".:/Users/neilhaddley/sqljdbc_9.2/enu/mssql-jdbc-9.2.1.jre11.jar" Program**

or

**$ export CLASSPATH=.:/Users/neilhaddley/sqljdbc_9.2/enu/mssql-jdbc-9.2.1.jre11.jar**

**$ java Program**

The code below calls the SwapCards stored procedure 1000 times using Java.
