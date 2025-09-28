---
title: ".NET Core (Part 1)"
description: "Creating a REST API Service using Microsoft cross-platform framework."
date: "2025-09-20"
category: ".NET"
image: "/assets/images/dotnet-core-part1/hero.png"
tags: ["react","javascript","dotnet","ai"]
---

## Creating a REST API Service using Microsoft's cross-platform framework.

![](/assets/images/dotnet-core-part1/net-logo.svg)
*Microsoft Dotnet Logo by Microsoft Corporation is licensed under Creative Commons CC0 1.0 Universal Public Domain Dedication*


## Creating a REST project using Dotnet Command Line Interface (CLI)

$ dotnet new webapi
$ dotnet new gitignore
$ dotnet run

![](/assets/images/dotnet-core-part1/screen-shot-2021-04-11-at-3.10.16-pm-1482x960.png)
*Example Controller*


## Creating a Book class

$ code .
Add Book class


## Books REST Controller

Add BooksController class


## dotnet run

$ dotnet run

![](/assets/images/dotnet-core-part1/screen-shot-2021-04-11-at-3.55.12-pm-1836x802.png)
*https://localhost:5001/books*

![](/assets/images/dotnet-core-part1/screen-shot-2021-04-06-at-11.19.46-am-1836x873.png)
*https://localhost:5001/books/1788395549*

![](/assets/images/dotnet-core-part1/screen-shot-2021-04-11-at-4.13.17-pm-1836x809.png)
*https://localhost:5001/books/1234567890*


## Swagger

Notice that by default Swagger is available.

![](/assets/images/dotnet-core-part1/screen-shot-2021-04-11-at-4.18.49-pm-1834x1328.png)
*https://localhost:5001/swagger/index.html*


## Startup

Support for Swagger is added in the project's Startup.cs file


## Static files

Static files can be added to a wwwroot folder in a Dotnet Core webapi project.

The static files can be image files, html files and javascript files.

To enable the static files add "app.UseStaticFiles();" to Startup.cs as shown below.

![](/assets/images/dotnet-core-part1/screen-shot-2021-04-11-at-4.33.18-pm-644x302.png)
*app.UseStaticFiles()*


## React client

The static files can be a React app that calls the REST API exposed by the (same) Dotnet Core project.

![](/assets/images/dotnet-core-part1/screen-shot-2021-04-11-at-4.45.21-pm-1836x1255.png)
*Running React/Dotnet Core app*


## haddley_power_app_api

The BooksController code can be extended to support POST, PUT and DELETE actions

![](/assets/images/dotnet-core-part1/screen-shot-2021-06-19-at-2.57.45-pm-1836x1178.png)
*haddley_power_app_api*


## Book.cs

```text
using System;

namespace dotnet_api
{
    public class Book
    {
        public Book(long id, String title)
        {
            this.id = id;
            this.title = title;
        }

        public long id { get; set; }

        public string title { get; set; }
    }
}
```

## BooksController.cs

```text
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnet_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private static readonly List<Book> books = new List<Book>()
        {
            (new Book(1788395549, "Learning Node.js Development")),
            (new Book(1788620216, "Hands-On Microservices with Node.js"))
        };

        private readonly ILogger<BooksController> _logger;

        public BooksController(ILogger<BooksController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            return books.ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetBooks(long id)
        {
            Book book = books.Find(x => (x.id == id));
            if (book == null)
            {
                return NotFound("Book Not Found");
            }
            return book;
        }


    }
}
```

## Startup.cs

```text
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace dotnet_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "dotnet_api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "dotnet_api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
```

## App.js

```text
import React, { useEffect, useState } from 'react';

function App() {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    console.log("use effect");
    fetch('/books')
      .then(
        (d) => {
          d.json().then((b) => {
            setBooks(() => b)
          });
        }
      )

  }
    , [])

  return (

    <>
        {books.map(book =>
            <h4>{book.title}</h4>)}
    </>

  );
}

export default App;
```

## index.html

```text
<!DOCTYPE html>
<html lang="en">

<head>
	<title>React App</title>
</head>

<body>

	<noscript>You need to enable JavaScript to run this app.</noscript>
	<div id="root"></div>

	<script>!function (e) {function r(r) {for (var n, i, l = r[0], p = r[1], f = r[2], c = 0, s = []; c < l.length; c++)i = l[c], Object.prototype.hasOwnProperty.call(o, i) && o[i] && s.push(o[i][0]), o[i] = 0; for (n in p) Object.prototype.hasOwnProperty.call(p, n) && (e[n] = p[n]); for (a && a(r); s.length;)s.shift()(); return u.push.apply(u, f || []), t()} function t() {for (var e, r = 0; r < u.length; r++) {for (var t = u[r], n = !0, l = 1; l < t.length; l++) {var p = t[l]; 0 !== o[p] && (n = !1)} n && (u.splice(r--, 1), e = i(i.s = t[0]))} return e} var n = {}, o = {1: 0}, u = []; function i(r) {if (n[r]) return n[r].exports; var t = n[r] = {i: r, l: !1, exports: {}}; return e[r].call(t.exports, t, t.exports, i), t.l = !0, t.exports} i.m = e, i.c = n, i.d = function (e, r, t) {i.o(e, r) || Object.defineProperty(e, r, {enumerable: !0, get: t})}, i.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})}, i.t = function (e, r) {if (1 & r && (e = i(e)), 8 & r) return e; if (4 & r && "object" == typeof e && e && e.__esModule) return e; var t = Object.create(null); if (i.r(t), Object.defineProperty(t, "default", {enumerable: !0, value: e}), 2 & r && "string" != typeof e) for (var n in e) i.d(t, n, function (r) {return e[r]}.bind(null, n)); return t}, i.n = function (e) {var r = e && e.__esModule ? function () {return e.default} : function () {return e}; return i.d(r, "a", r), r}, i.o = function (e, r) {return Object.prototype.hasOwnProperty.call(e, r)}, i.p = "/"; var l = this["webpackJsonpnode-spring-client"] = this["webpackJsonpnode-spring-client"] || [], p = l.push.bind(l); l.push = r, l = l.slice(); for (var f = 0; f < l.length; f++)r(l[f]); var a = p; t()}([])</script>
	<script src="/js/2.bd91be3c.chunk.js"></script>
	<script src="/js/main.d36b6e09.chunk.js"></script>

</body>

</html>
```

## BookController.cs

```text
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace haddley_power_app_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {

        private static readonly List<Book> books = new List<Book>()
            {
                (new Book(1788395549, "Learning Node.js Development")),
                (new Book(1788620216, "Hands-On Microservices with Node.js"))
            };

        private readonly ILogger<BookController> _logger;

        public BookController(ILogger<BookController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            return books.ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetBooks(long id)
        {
            var itemFound = books.SingleOrDefault(book => book.id == id);
            if (itemFound == null)
            {
                return NotFound("Book Not Found");
            }

            return itemFound;
        }

        
        [HttpPost]
        public IActionResult Post([FromBody] Book book)
        {
            books.Add(book);

            System.Console.WriteLine(book.title);

            return StatusCode(200);
        }


        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Book book)
        {
            var itemToUpdate = books.SingleOrDefault(book => book.id == id);
            if (itemToUpdate != null)
                itemToUpdate.title = book.title;

            return StatusCode(200);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var itemToRemove = books.SingleOrDefault(book => book.id == id);
            if (itemToRemove != null)
                books.Remove(itemToRemove);
            return StatusCode(200);
        }

    }

}
```
## References

- [Static files in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files)

