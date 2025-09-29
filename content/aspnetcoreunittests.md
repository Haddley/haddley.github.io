---
title: "ASP.NET Core Unit Tests"
description: "Test driven development"
date: "2023-03-26"
categories: [".NET"]
tags: []
slug: "aspnetcoreunittests"
image: "/assets/images/net-logo.svg"
---

## Test driven development

![](/assets/images/aspnetcoreunittests/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## Unit Tests

Unit tests are automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended.

I wanted to add unit tests that could be run as part of a continuous integration pipeline.

![](/assets/images/aspnetcoreunittests/screen-shot-2023-03-26-at-10.49.22-am-1536x877.png)
*$ dotnet test*


## UnitTest1.cs

```text
using haddley_blazor_api.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using haddley_blazor_api.Server.Controllers;

namespace haddley_blazor_app.Tests;


[TestClass]
public class ToDoControllerTests
{
    private ToDoContext? _context;
    private ToDo? _controller;

    [TestInitialize]
    public void Initialize()
    {
        // Create an in-memory database for testing
        var options = new DbContextOptionsBuilder<ToDoContext>()
            .UseInMemoryDatabase(databaseName: "ToDo_TestDatabase")
            .Options;

        _context = new ToDoContext(options);

        // reset in memory database
        _context.Database.EnsureDeleted();

        // Seed the database with test data
        _context.Items.AddRange(new List<Item>
        {
            new Item { Id = 1, Description = "Buy milk", Done = false },
            new Item { Id = 2, Description = "Walk the dog", Done = true },
            new Item { Id = 3, Description = "Do laundry", Done = false }
        });

        _context.SaveChanges();

        // Create an instance of the controller to be tested
        _controller = new ToDo(_context);
    }

    [TestMethod]
    public async Task GetItems_ReturnsAllItems()
    {
        Assert.IsNotNull(_controller);

        // Arrange

        // Act

        var result = await _controller.GetItems();

        // Assert
        Assert.IsNotNull(result.Value);
        Assert.AreEqual(3, result.Value.Count());
    }



    [TestMethod]
    public async Task GetItem_ReturnsNotFound_ForNonExistentId()
    {
        Assert.IsNotNull(_controller);

        // Arrange
        var nonExistentId = 999;

        // Act
        var result = await _controller.GetItem(nonExistentId);

        // Assert
        Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));

    }


    [TestMethod]
    public async Task PostItem_AddsNewItem()
    {
        Assert.IsNotNull(_controller);
        Assert.IsNotNull(_context);

        // Arrange
        var newItem = new Item { Description = "Clean the house", Done = false };

        // Act
        var result = await _controller.PostItem(newItem);

        Assert.IsNotNull(result);

        // Assert
        Assert.IsInstanceOfType(result.Result, typeof(CreatedAtActionResult));

        // Check that the new item was added to the database
        Assert.AreEqual(4, _context.Items.Count());
        Assert.IsTrue(_context.Items.Any(i => i.Description == newItem.Description));

    }


    [TestMethod]
    public async Task DeleteItem_RemovesExistingItem()
    {
        Assert.IsNotNull(_controller);
        Assert.IsNotNull(_context);

        // Arrange
        var existingItem = await _context.Items.FirstOrDefaultAsync(i => i.Description == "Walk the dog");

        Assert.IsNotNull(existingItem);

        // Act
        var result = await _controller.DeleteItem(existingItem.Id);

        // Assert
        Assert.IsInstanceOfType(result, typeof(NoContentResult));

        // Check that the item was removed from the database
        Assert.AreEqual(2, _context.Items.Count());
        Assert.IsFalse(_context.Items.Any(i => i.Id == existingItem.Id));
    }


}
```