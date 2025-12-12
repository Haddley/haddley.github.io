---
title: "Microsoft SQL Server (Part 2)"
description: "T-SQL, Stored Procedures and Snapshot Isolation."
date: "2021-03-27"
categories: ["SQL","Java","AI","Angular","Mobile","TypeScript"]
tags: ""
slug: "mssqlserver2"
image: "/assets/images/ads.svg"
---


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


## Using cross join to create a table the represents ...

```text
-- Create the Deck
CREATE TABLE Cards
(
    Card CHAR(5) PRIMARY KEY
)
GO

INSERT INTO Cards
VALUES
    ('Ace'),
    ('2'),
    ('3'),
    ('4'),
    ('5'),
    ('6'),
    ('7'),
    ('8'),
    ('9'),
    ('10'),
    ('Jack'),
    ('Queen'),
    ('King')
GO

CREATE TABLE Suits
(
    Suit CHAR(8) PRIMARY KEY
)
GO

INSERT INTO Suits
VALUES
    ('Clubs'),
    ('Diamonds'),
    ('Hearts'),
    ('Spades')
GO

SELECT Id = IDENTITY(INT, 1, 1),
    Suits.Suit,
    Cards.Card
INTO Deck
FROM Cards
CROSS JOIN Suits
GO

ALTER TABLE Deck ADD CONSTRAINT Deck_PK PRIMARY KEY (Id)
GO
```

## SwapCardsV1

```text
-- Stored Procedure 'SwapCardsV1'
CREATE PROCEDURE SwapCardsV1
    @Card1 INT = 1,
    @Card2 INT = 52
AS
BEGIN
    
    BEGIN TRY
		BEGIN TRANSACTION

		SET NOCOUNT ON

		-- Store the first card's details
		SELECT *
        INTO #Temp
        FROM Deck
        WHERE Id = @Card1

		-- Move second card into first card's place
		UPDATE Deck
		SET Card = CardDetails.Card,
			Suit = CardDetails.Suit
		FROM (
			SELECT d.Card,
            d.Suit
        FROM Deck d
        WHERE Id = @Card2
			) CardDetails
		WHERE Id = @Card1

		-- Move first card into second card's place
		UPDATE Deck
		SET Card = CardDetails.Card,
			Suit = CardDetails.Suit
		FROM (
			SELECT Card,
            Suit
        FROM #temp
			) CardDetails
		WHERE Id = @Card2

		COMMIT TRANSACTION;
	END TRY

	BEGIN CATCH
		-- PRINT 'We were unable to make the swap rolling back [' + ERROR_MESSAGE() + '].';
		ROLLBACK TRANSACTION;
        THROW 51000, 'Unable to swap card.', 1; 
	END CATCH
END
GO
```

## SwapCards T-SQL Client Code

```text
-- User Defined Function 'PickACard'
CREATE FUNCTION PickACard (@RAND FLOAT)
RETURNS INT
AS
BEGIN
    RETURN (
			SELECT FLOOR(@RAND * (52 - 1 + 1)) + 1
			)
END
GO

-- Stored Procedure 'SwapCardsAtRandom'
CREATE PROCEDURE SwapCardsAtRandom
AS
BEGIN
    DECLARE @Rnd1 FLOAT

    SET @Rnd1 = RAND()

    DECLARE @Card1 INT

    SET @Card1 = (
			SELECT dbo.PickACard(@Rnd1)
			)

    DECLARE @Rnd2 FLOAT

    SET @Rnd2 = RAND()

    DECLARE @Card2 INT

    SET @Card2 = (
			SELECT dbo.PickACard(@Rnd2)
			)

    -- 'No need to swap a card with itself'
    IF @Card1 != @Card2
	BEGIN
        EXECUTE dbo.SwapCardsV1 @Card1,
			@Card2
    END -- IF @Card1 != @Card2
END -- CREATE PROCEDURE SwapCards
GO

-- Call Swap Cards Multiple times
DECLARE @Counter INT
SET @Counter = 0
DECLARE @ErrorCounter INT
SET @ErrorCounter = 0
WHILE (@Counter < 1000)
BEGIN

    BEGIN TRY
		EXECUTE SwapCardsAtRandom
	END TRY

	BEGIN CATCH
		SET @ErrorCounter = @ErrorCounter+1
        PRINT 'We were unable to swap cards [' + ERROR_MESSAGE() +']. Error Count ['+LTRIM(STR(@ErrorCounter,10))+']'  
	END CATCH
    
    SET @Counter = @Counter + 1
END
GO

-- Review results
SELECT COUNT(*)
FROM Deck
GROUP BY Suit
GO

SELECT *
FROM Deck
ORDER BY Card,Suit
GO
```

## SwapCards with snapshot isolation

```text
-- Stored Procedure 'SwapCards'
CREATE PROCEDURE SwapCards
    @Card1 INT = 1,
    @Card2 INT = 52
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL SNAPSHOT;

    BEGIN TRY
		BEGIN TRANSACTION

		SET NOCOUNT ON

		-- Store the first card's details
		SELECT *
        INTO #Temp
        FROM Deck
        WHERE Id = @Card1

		-- Move second card into first card's place
		UPDATE Deck
		SET Card = CardDetails.Card,
			Suit = CardDetails.Suit
		FROM (
			SELECT d.Card,
            d.Suit
        FROM Deck d
        WHERE Id = @Card2
			) CardDetails
		WHERE Id = @Card1

		-- Move first card into second card's place
		UPDATE Deck
		SET Card = CardDetails.Card,
			Suit = CardDetails.Suit
		FROM (
			SELECT Card,
            Suit
        FROM #temp
			) CardDetails
		WHERE Id = @Card2

		COMMIT TRANSACTION;
	END TRY

	BEGIN CATCH
		-- PRINT 'We were unable to make the swap rolling back [' + ERROR_MESSAGE() + '].';
		ROLLBACK TRANSACTION;
        THROW 51000, 'Unable to swap card.', 1; 
	END CATCH
END
GO
```

## Program.cs

```text
using System;
using System.Data.SqlClient;
using System.Data;

namespace dotnet_sql {
  class Program {
    static void Main(string[] args) {
      var cs = @ "User ID=sa;Password=Passw0rd123;Initial Catalog=Shuffle;Server=192.168.68.109;";

      using var con = new SqlConnection(cs);
      con.Open();

      using(SqlCommand cmd = new SqlCommand("dbo.SwapCards", con)) {
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.Add("@Card1", SqlDbType.Int);
        cmd.Parameters.Add("@Card2", SqlDbType.Int);

        int errorCounter = 0;
        for (int count = 0; count < 1000; count++) {
          Random rn = new Random();
          int card1 = rn.Next(1, 52);
          int card2 = rn.Next(1, 52);

          cmd.Parameters["@Card1"].Value = card1;
          cmd.Parameters["@Card2"].Value = card2;

          try {
            cmd.ExecuteNonQuery();
          } catch (Exception e) {
            errorCounter++;
            Console.WriteLine("We were unable to swap cards [" + e.Message + "]. Error Count [" +
              errorCounter + "]");
          }

        }
      }
    }
  }
}
```

## index.js

```text
const mssql = require('mssql')

const config = {
    user: 'sa',
    password: 'Passw0rd123',
    server: '192.168.68.109',
    database: 'Shuffle',
    options: { enableArithAbort: false }
};

const dbConn = mssql.connect(config, function (err) {

    if (err) {
        console.log(err);
        return
    }

    const request = new mssql.Request();

    request.input('Card1', mssql.Int);
    request.input('Card2', mssql.Int);

    let errorCounter = 0;

    (async () => {
        for (x = 0; x < 1000; x++) {

            const card1 = Math.floor(Math.random() * (52 - 1 + 1)) + 1
            const card2 = Math.floor(Math.random() * (52 - 1 + 1)) + 1

            request.parameters.Card1.value = card1;
            request.parameters.Card2.value = card2;

            if (card1 != card2) {

                try {
                    await request.execute('dbo.SwapCards')
                } catch (e) {
                    errorCounter++;
                    console.error("We were unable to swap cards [" + e.originalError.message + "]. Error Count [" + errorCounter + "]");
                }

            }
        }
        dbConn.close();

    })().catch(err => {
        console.error(err);
    });

})
```

## Program.java

```text
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.CallableStatement;
import java.util.Random;

public class Program {


    public static void main(String[] args) {

        String connectionUrl = "jdbc:sqlserver://192.168.68.109:1433;databaseName=Shuffle;user=sa;password=Passw0rd123";

        try (Connection con = DriverManager.getConnection(connectionUrl);) {

            CallableStatement callableStatement = con.prepareCall("{call dbo.SwapCards(?,?)}");

            int errorCounter = 0;
            for (int count = 0; count < 1000; count++) {

                Random rn = new Random();
                int card1 = rn.nextInt(52 - 1 + 1) + 1;
                int card2 = rn.nextInt(52 - 1 + 1) + 1;

                try {
                    if (card1 != card2) {
                        callableStatement.setInt(1, card1);
                        callableStatement.setInt(2, card2);
                        callableStatement.execute();
                    }
                } catch (SQLException e1) {
                    errorCounter++;
                    System.out.println("We were unable to swap cards [" + e1.getMessage() + "]. Error Count ["
                            + Integer.toString(errorCounter) + "]");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

## Full T-SQL code

```text
DROP DATABASE Shuffle
GO

-- Create the DB
CREATE DATABASE Shuffle
GO

-- Allow snapshot isolation
ALTER DATABASE Shuffle
SET ALLOW_SNAPSHOT_ISOLATION ON
GO

-- Enable accelerated database recovery
ALTER DATABASE Shuffle
SET ACCELERATED_DATABASE_RECOVERY = ON;
GO

-- Use Shuffle DB
USE Shuffle
GO

-- Create the Deck
CREATE TABLE Cards
(
    Card CHAR(5) PRIMARY KEY
)
GO

INSERT INTO Cards
VALUES
    ('Ace'),
    ('2'),
    ('3'),
    ('4'),
    ('5'),
    ('6'),
    ('7'),
    ('8'),
    ('9'),
    ('10'),
    ('Jack'),
    ('Queen'),
    ('King')
GO

CREATE TABLE Suits
(
    Suit CHAR(8) PRIMARY KEY
)
GO

INSERT INTO Suits
VALUES
    ('Clubs'),
    ('Diamonds'),
    ('Hearts'),
    ('Spades')
GO

SELECT Id = IDENTITY(INT, 1, 1),
    Suits.Suit,
    Cards.Card
INTO Deck
FROM Cards
CROSS JOIN Suits
GO

ALTER TABLE Deck ADD CONSTRAINT Deck_PK PRIMARY KEY (Id)
GO

-- User Defined Function 'PickACard'
CREATE FUNCTION PickACard (@RAND FLOAT)
RETURNS INT
AS
BEGIN
    RETURN (
			SELECT FLOOR(@RAND * (52 - 1 + 1)) + 1
			)
END
GO

-- Stored Procedure 'SwapCardsV1'
CREATE PROCEDURE SwapCardsV1
    @Card1 INT = 1,
    @Card2 INT = 52
AS
BEGIN
    
    BEGIN TRY
		BEGIN TRANSACTION

		SET NOCOUNT ON

		-- Store the first card's details
		SELECT *
        INTO #Temp
        FROM Deck
        WHERE Id = @Card1

		-- Move second card into first card's place
		UPDATE Deck
		SET Card = CardDetails.Card,
			Suit = CardDetails.Suit
		FROM (
			SELECT d.Card,
            d.Suit
        FROM Deck d
        WHERE Id = @Card2
			) CardDetails
		WHERE Id = @Card1

		-- Move first card into second card's place
		UPDATE Deck
		SET Card = CardDetails.Card,
			Suit = CardDetails.Suit
		FROM (
			SELECT Card,
            Suit
        FROM #temp
			) CardDetails
		WHERE Id = @Card2

		COMMIT TRANSACTION;
	END TRY

	BEGIN CATCH
		-- PRINT 'We were unable to make the swap rolling back [' + ERROR_MESSAGE() + '].';
		ROLLBACK TRANSACTION;
        THROW 51000, 'Unable to swap card.', 1; 
	END CATCH
END
GO

-- Stored Procedure 'SwapCards'
CREATE PROCEDURE SwapCards
    @Card1 INT = 1,
    @Card2 INT = 52
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL SNAPSHOT;

    BEGIN TRY
		BEGIN TRANSACTION

		SET NOCOUNT ON

		-- Store the first card's details
		SELECT *
        INTO #Temp
        FROM Deck
        WHERE Id = @Card1

		-- Move second card into first card's place
		UPDATE Deck
		SET Card = CardDetails.Card,
			Suit = CardDetails.Suit
		FROM (
			SELECT d.Card,
            d.Suit
        FROM Deck d
        WHERE Id = @Card2
			) CardDetails
		WHERE Id = @Card1

		-- Move first card into second card's place
		UPDATE Deck
		SET Card = CardDetails.Card,
			Suit = CardDetails.Suit
		FROM (
			SELECT Card,
            Suit
        FROM #temp
			) CardDetails
		WHERE Id = @Card2

		COMMIT TRANSACTION;
	END TRY

	BEGIN CATCH
		-- PRINT 'We were unable to make the swap rolling back [' + ERROR_MESSAGE() + '].';
		ROLLBACK TRANSACTION;
        THROW 51000, 'Unable to swap card.', 1; 
	END CATCH
END
GO

-- Stored Procedure 'SwapCardsAtRandom'
CREATE PROCEDURE SwapCardsAtRandom
AS
BEGIN
    DECLARE @Rnd1 FLOAT

    SET @Rnd1 = RAND()

    DECLARE @Card1 INT

    SET @Card1 = (
			SELECT dbo.PickACard(@Rnd1)
			)

    DECLARE @Rnd2 FLOAT

    SET @Rnd2 = RAND()

    DECLARE @Card2 INT

    SET @Card2 = (
			SELECT dbo.PickACard(@Rnd2)
			)

    -- 'No need to swap a card with itself'
    IF @Card1 != @Card2
	BEGIN
        EXECUTE dbo.SwapCards @Card1,
			@Card2
    END -- IF @Card1 != @Card2
END -- CREATE PROCEDURE SwapCards
GO

-- Call SwapCardsAtRandom Multiple times
DECLARE @Counter INT
SET @Counter = 0
DECLARE @ErrorCounter INT
SET @ErrorCounter = 0
WHILE (@Counter < 1000)
BEGIN

    BEGIN TRY
		EXECUTE SwapCardsAtRandom
	END TRY

	BEGIN CATCH
		SET @ErrorCounter = @ErrorCounter+1
        PRINT 'We were unable to swap cards [' + ERROR_MESSAGE() +']. Error Count ['+LTRIM(STR(@ErrorCounter,10))+']'  
	END CATCH
    
    SET @Counter = @Counter + 1
END
GO

-- Review results
SELECT COUNT(*)
FROM Deck
GROUP BY Suit
GO

SELECT *
FROM Deck
ORDER BY Card,Suit
GO
```