---
title: "VB.NET Console SQL Server Unit Tests"
description: "Test driven development"
date: "2023-05-27"
categories: ["SQL","AI",".NET","Angular","Mobile","TypeScript"]
tags: ""
slug: "vbnetconsolesqlserverunittests"
image: "/assets/images/net-logo.svg"
---



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


## UnitTest1.vb

```text
Imports System.Data.SqlClient
Imports System.Text
Imports Microsoft.VisualStudio.TestTools.UnitTesting


<TestClass()> Public Class DatabaseTests
    Private ReadOnly connectionString As String = "Data Source=(local);Initial Catalog=ToDo;user id=sa;password=Passw0rd123"

    <TestMethod()>
    Public Sub GetData_ShouldReturnValidDataTable()
        ' Arrange
        Dim database As New DatabaseInteraction(connectionString)

        ' Act
        Dim result As DataTable = database.GetData()

        ' Assert
        Assert.IsNotNull(result)
        Assert.IsTrue(result.Rows.Count > 0)
    End Sub
End Class

Public Class DatabaseInteraction
    Private ReadOnly connectionString As String

    Public Sub New(connectionString As String)
        Me.connectionString = connectionString
    End Sub

    Public Function GetData() As DataTable
        Dim query As String = "SELECT * FROM Items"
        Dim result As DataTable = Nothing

        Using connection As New SqlConnection(connectionString)
            connection.Open()
            Using command As New SqlCommand(query, connection)
                Using adapter As New SqlDataAdapter(command)
                    result = New DataTable()
                    adapter.Fill(result)
                End Using
            End Using
        End Using

        Return result
    End Function
End Class
```

## Module1.vb

```text
Imports System.Data.SqlClient

Public Module Module1

    Private ReadOnly connectionString As String = "Data Source=(local);Initial Catalog=ToDo;user id=sa;password=Passw0rd123"

    Sub Main()
        Console.WriteLine("Tasks")

        Dim query As String = "SELECT * FROM Items"
        Dim result As DataTable = Nothing
        Using connection As New SqlConnection(connectionString)
            connection.Open()
            Using command As New SqlCommand(query, connection)
                Using adapter As New SqlDataAdapter(command)
                    result = New DataTable()
                    adapter.Fill(result)

                    WriteDataTable(result)

                End Using
            End Using
        End Using

        Console.ReadLine()
    End Sub

    Public Function WriteDataTable(result As DataTable)
        Console.WriteLine("{0,10}{1,20}{2,7}", "ID", "Description", "Done")

        Dim count As Integer = 0
        For Each row As DataRow In result.Rows
            Console.WriteLine("{0,10}{1,20}{2,7}", row("ID"), row("Description"), row("Done"))
            count = count + 1
        Next

        Return count
    End Function
End Module
```

## UnitTestProject1 - UnitTest1.vb

```text
mports System.Data.SqlClient
Imports System.Text
Imports Microsoft.VisualStudio.TestTools.UnitTesting

<TestClass()> Public Class UnitTest1

    Private ReadOnly connectionString As String = "Data Source=(local);Initial Catalog=ToDo;user id=sa;password=Passw0rd123"

    Private _dataTable As New DataTable()

    <TestInitialize>
    Public Sub intialize()

        'reset the test data before each test method is executed
        _dataTable = New DataTable()

        ' Create the example result DataTable
        _dataTable.Columns.Add("ID", GetType(Integer))
        _dataTable.Columns.Add("Description", GetType(String))
        _dataTable.Columns.Add("Done", GetType(Boolean))

        _dataTable.Rows.Add(1000, "Feed Dog", False)

    End Sub

    <TestMethod>
    Public Sub TestDataFromDataTable()

        ' Act
        Dim count = ConsoleApp1.WriteDataTable(_dataTable)

        ' Assert
        Assert.IsNotNull(_dataTable)
        Assert.IsTrue(_dataTable.Rows.Count = 1)
        Assert.IsTrue(count = _dataTable.Rows.Count)
    End Sub

    <TestMethod>
    Public Sub TestDataFromDataTableAddItem()

        'Arrange 
        _dataTable.Rows.Add(1001, "Feed Cat", False)

        ' Act
        Dim count = ConsoleApp1.WriteDataTable(_dataTable)

        ' Assert
        Assert.IsNotNull(_dataTable)
        Assert.IsTrue(_dataTable.Rows.Count = 2)
        Assert.IsTrue(count = _dataTable.Rows.Count)
    End Sub


    <TestMethod>
    Public Sub TestDataFromDataTableAddTwoItems()

        'Arrange 
        _dataTable.Rows.Add(1001, "Feed Snake", False)
        _dataTable.Rows.Add(1001, "Feed Mouse", False)

        ' Act
        Dim count = ConsoleApp1.WriteDataTable(_dataTable)

        ' Assert
        Assert.IsNotNull(_dataTable)
        Assert.IsTrue(_dataTable.Rows.Count = 3)
        Assert.IsTrue(count = _dataTable.Rows.Count)
    End Sub


    <TestMethod>
    Public Sub SelectDataFromDatabaseTest()
        ' Arrange
        Dim query As String = "SELECT * FROM Items"
        Dim result As DataTable = Nothing
        Dim count As Integer = 0

        ' Act
        Using connection As New SqlConnection(connectionString)
            connection.Open()
            Using command As New SqlCommand(query, connection)
                Using adapter As New SqlDataAdapter(command)
                    result = New DataTable()
                    adapter.Fill(result)

                    count = ConsoleApp1.WriteDataTable(result)

                End Using
            End Using
        End Using

        ' Assert
        Assert.IsNotNull(result)
        Assert.IsTrue(result.Rows.Count > 0)
        Assert.IsTrue(count = result.Rows.Count)
    End Sub


End Class
```

## UnitTestProject2 - UnitTest1.vb

```text
Imports System.Data.SqlClient
Imports System.IO
Imports ConsoleApp1

<TestClass()> Public Class DatabaseTests
    Private ReadOnly connectionString As String = "Data Source=(local);Initial Catalog=ToDo;user id=sa;password=Passw0rd123"

    <TestMethod()>
    Public Sub GetData_ShouldReturnValidDataTable()
        ' Arrange
        Dim database As New DatabaseInteraction(connectionString)

        ' Act
        Dim result As DataTable = database.GetData()

        ' Assert
        Assert.IsNotNull(result)
        Assert.IsTrue(result.Rows.Count > 0)
    End Sub
End Class

Public Class DatabaseInteraction
    Private ReadOnly connectionString As String

    Public Sub New(connectionString As String)
        Me.connectionString = connectionString
    End Sub

    Public Function GetData() As DataTable
        Dim query As String = "SELECT * FROM Items"
        Dim result As DataTable = Nothing

        Using connection As New SqlConnection(connectionString)
            connection.Open()
            Using command As New SqlCommand(query, connection)
                Using adapter As New SqlDataAdapter(command)
                    result = New DataTable()
                    adapter.Fill(result)
                End Using
            End Using
        End Using

        Return result
    End Function
End Class




<TestClass()> Public Class Module1Tests
    Private ReadOnly connectionString As String = "Data Source=(local);Initial Catalog=ToDo;user id=sa;password=Passw0rd123"

    <TestMethod>
    Public Sub WriteDataTable_ShouldWriteCorrectData()
        ' Arrange
        Dim result As New DataTable()
        result.Columns.Add("ID", GetType(Integer))
        result.Columns.Add("Description", GetType(String))
        result.Columns.Add("Done", GetType(Boolean))
        result.Rows.Add(1, "Task 1", True)
        result.Rows.Add(2, "Task 2", False)

        Dim expectedOutput As String =
            "        ID         Description   Done" + vbCrLf +
            "         1              Task 1   True" + vbCrLf +
            "         2              Task 2  False" + vbCrLf

        ' Act
        Dim consoleOutput As String = CaptureConsoleOutput(Sub() Module1.WriteDataTable(result))

        Console.WriteLine("Expected")
        Console.WriteLine("<" + expectedOutput + ">")
        Console.WriteLine("Test Result")
        Console.WriteLine("<" + consoleOutput + ">")

        ' Assert
        Assert.AreEqual(expectedOutput, consoleOutput)
    End Sub

    ' Helper method to capture console output during testing
    Private Function CaptureConsoleOutput(action As Action) As String
        Dim originalOut As TextWriter = Console.Out
        Dim writer As New StringWriter()
        Console.SetOut(writer)
        action.Invoke()
        Console.SetOut(originalOut)
        Return writer.ToString()
    End Function
End Class
```