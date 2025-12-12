---
title: "Java Spring Boot (Part 1)"
description: "Spring based Java Applications that you can just run."
date: "2021-04-06"
categories: ["Java","React","AI","Angular","Mobile","TypeScript"]
tags: ""
slug: "spring-boot"
image: "/assets/images/spring-framework-logo-70-no.svg"
---

## Spring Tool Suite

Spring Tool Suite is an Integrated Development Environment based on Eclipse.


## Maven

Maven is a build and dependency management tool for Java.

The pom.xml file is used to maintain a list of modules that the Spring application depends on.

Module jar files are downloaded from a managed repository.


## Creating a REST project using Spring Boot

Open Spring Tool Suite
Create new Spring Starter Project
Add Book class
Add BooksRestController
Run as Spring Boot App
Test using Browser

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.01.43-am-1718x1074.png)
*Create new Spring Starter Project*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.03.13-am-1180x1440.png)
*Enter the project name and package details*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.03.38-am-1174x1440.png)
*The REST API project depends on "Spring Web"*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.04.47-am-1430x436.png)
*Add a new class*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.05.11-am-1180x1254.png)
*Add class "Book"*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.06.30-am-1174x1254.png)
*Add class "BooksRestController"*


## Annotations

The **@RestController** annotation is used to mark the BooksRestController class as a Spring Framework RestController.

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.07.37-am-1836x552.png)
*Add @RestController annotation to BooksRestController classUse CTRL+Space to import org.springframework.web.bind.annotation.RestController*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.10.26-am-1722x1076.png)
*Add "books" ArrayList to the BooksRestController*


## Books REST Controller

The **@GetMapping** annotation is used to mark the book and books methods as HTTP Get method handlers.

The completed BooksRestController code is shown below.

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.17.47-am-560x844.png)
*Run as Spring Boot App*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.19.11-am-1836x874.png)
*http://localhost:8080/books*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.19.46-am-1836x873.png)
*http://localhost:8080/books/1788395549*

![](/assets/images/spring-boot/screen-shot-2021-04-06-at-11.20.30-am-1836x875.png)
*http://localhost:8080/books/1234567890*


## React client

Static files can be added to the /src/main/resources/static folder of the Spring Boot project.

The static files can be image files, html files and javascript files.

The static files can be a [React](reactusestateuseeffect.html) app that calls the REST API exposed by the (same) Spring Boot project.

![](/assets/images/spring-boot/screen-shot-2021-04-08-at-3.28.25-pm-1836x981.png)
*Static files*

![](/assets/images/spring-boot/screen-shot-2021-04-08-at-3.27.02-pm-1286x750.png)
*Running the React/Spring Boot app*


## Book.java

```text
package com.haddley.Books;

public class Book {

	public Book(long id, String title) {
		_id = id;
		_title = title;
	}

	private long _id;

	public long getId() {
		return _id;
	}

	public void setId(long id) {
		this._id = id;
	}

	public String getTitle() {
		return _title;
	}

	public void setTitle(String title) {
		this._title = title;
	}

	private String _title;
	
}
```

## BooksRestController.java

```text
package com.haddley.Books;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


@RestController
public class BooksRestController {

	private static ArrayList<Book> books = new ArrayList<Book>();

	static {
		books.add(new Book(1788395549, "Learning Node.js Development"));
		books.add(new Book(1788620216, "Hands-On Microservices with Node.js"));
	}

	@GetMapping("/books/{id}")
	public Book book(@PathVariable Long id) {
		@SuppressWarnings("unchecked")
		ArrayList<Book> result = (ArrayList<Book>) BooksRestController.books.clone();
		result.removeIf(n -> (n.getId() != id));
		if (result.isEmpty()){
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book Not Found");
		}
		return result.get(0);
	}

	@GetMapping("/books")
	public ArrayList<Book> books() {
		return BooksRestController.books;
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

```html
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
## References

- [QuickStart](https://spring.io/quickstart)