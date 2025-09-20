---
title: "Java Spring Boot (Part 5)"
description: "A comprehensive guide covering java spring boot (part 5)"
date: "2025-09-20"
category: "Java"
image: "/assets/images/spring-boot-5/hero.png"
tags: ["java","spring","ai","ml","git"]
---

# Java Spring Boot (Part 5)

## Spring for GraphQL

![](/assets/images/spring-boot-5/spring-framework-logo-2018.svg)
*Spring Framework logo by Pivotal Software is licensed under Apache License 2.0*


## Spring for GraphQL

Build GraphQL applications with Spring for [GraphQL](GraphQL.html) and GraphQL Java.

![](/assets/images/spring-boot-5/screenshot-2023-10-30-at-12.13.17-pm-1253x813.png)
*I created a new GitHub repository*

![](/assets/images/spring-boot-5/screenshot-2023-10-30-at-12.46.56-pm-1251x1056.png)
*I used spring initializr to create a new project*


## The finished project

I used http://localhost:8080/graphiql to demonstrate the finished code (in line with my [node GraphQL](GraphQL.html) implementation)

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.07.53-am-1432x1011.png)
*books*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.10.30-am-1433x515.png)
*author(id: 6)*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.17.34-am-1430x386.png)
*addAuthor*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.20.06-am-1433x540.png)
*addBook*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.22.12-am-1429x591.png)
*SELECT * FROM AUTHOR*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.22.36-am-1434x515.png)
*SELECT * FROM BOOK*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.23.00-am-1433x553.png)
*SELECT * FROM BOOK_AUTHORS*


## Implementation

Here are the Java implementation details

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.24.59-am-2136x1230.png)
*application.properties*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.29.07-am-2136x1231.png)
*SeedDataConfig.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.34.19-am-2136x1227.png)
*Author.js*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.43.31-am-2136x1231.png)
*Book.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.44.20-am-2136x883.png)
*AuthorRepository.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.45.39-am-2136x713.png)
*BookRepository.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.47.25-am-2136x923.png)
*schema.graphqls*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.49.44-am-2136x1182.png)
*AuthorController.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.52.27-am-2136x1175.png)
*BookController.java*

![](/assets/images/spring-boot-5/screenshot-2023-10-31-at-10.53.42-am-2136x1017.png)
*pom.xml*


## application.properties

```text
server.port=8080

logging.level.web=DEBUG
logging.level.sql=DEBUG
logging.level.com.example=DEBUG

# generate the hibernate entities
spring.jpa.generate-ddl=true

spring.graphql.graphiql.enabled=true

spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

## SeedDataConfig.java

```text
package com.haddley.haddleyspringgraphql.config;

import com.haddley.haddleyspringgraphql.models.Book;
import com.haddley.haddleyspringgraphql.models.Author;
import com.haddley.haddleyspringgraphql.repositories.BookRepository;
import com.haddley.haddleyspringgraphql.repositories.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class SeedDataConfig implements CommandLineRunner {

    private final AuthorRepository authorRepository;
    private final BookRepository BookRepository;

    @Override
    public void run(String... args) throws Exception {


        if (authorRepository.count() == 0) {


                /* 
                const authors = [
                { id: 1, name: 'Samer Buna' },
                { id: 2, name: 'Robin Wieruch' },
                { id: 3, name: 'Nader Dabit' },
                { id: 4, name: 'Sebastian Grebe' },
                { id: 5, name: 'Eve Porcello' },
                { id: 6, name: 'Alex Banks' }
                ]
                */


            Author author1 = Author.builder()
                    .name("Samer Buna")
                    .build();

            author1 = authorRepository.save(author1);

            Author author2 = Author.builder()
                    .name("Robin Wieruch")
                    .build();

            author2 = authorRepository.save(author2);

            Author author3 = Author.builder()
                    .name("Nader Dabit")
                    .build();

            author3 = authorRepository.save(author3);

            Author author4 = Author.builder()
                    .name("Sebastian Grebe")
                    .build();

            author4 = authorRepository.save(author4);
            
            Author author5 = Author.builder()
                    .name("Eve Porcello")
                    .build();

            author5 = authorRepository.save(author5);

            Author author6 = Author.builder()
                    .name("Alex Banks")
                    .build();

            author6 = authorRepository.save(author6);

                /* 
                const books = [
                { id: 1, isbn10: '161729568X', name: 'GraphQL in Action', authorIds: [1] },
                { id: 2, isbn10: '1730853935', name: 'The Road to GraphQL: Your journey to master pragmatic GraphQL in JavaScript with React.js and Node.js', authorIds: [2] },
                { id: 3, isbn10: '1492059897', name: 'Full Stack Serverless: Modern Application Development with React, AWS, and GraphQL', authorIds: [3] },
                { id: 4, isbn10: '1789134528', name: 'Hands-On Full-Stack Web Development with GraphQL and React', authorIds: [4] },
                { id: 5, isbn10: '1492030716', name: 'Learning GraphQL: Declarative Data Fetching for Modern Web Apps', authorIds: [5, 6] },
                { id: 6, isbn10: '1492051721', name: 'Learning React: Modern Patterns for Developing React Apps', authorIds: [5, 6] },
                ]
                */

                Book book1 = Book.builder()
                    .isbn10("161729568X")
                    .name("GraphQL in Action")
                    .authors(new ArrayList<>(Arrays.asList(author1)))
                    .build();

                Book book2 = Book.builder()
                    .isbn10("1730853935")
                    .name("The Road to GraphQL: Your journey to master pragmatic GraphQL in JavaScript with React.js and Node.js")
                    .authors(new ArrayList<>(Arrays.asList(author2)))
                    .build();

                Book book3 = Book.builder()
                    .isbn10("1492059897")
                    .name("Full Stack Serverless: Modern Application Development with React, AWS, and GraphQL")
                    .authors(new ArrayList<>(Arrays.asList(author3)))
                    .build();

                Book book4 = Book.builder()
                    .isbn10("1789134528")
                    .name("Hands-On Full-Stack Web Development with GraphQL and React")
                    .authors(new ArrayList<>(Arrays.asList(author4)))
                    .build();

                Book book5 = Book.builder()
                    .isbn10("1492030716")
                    .name("Learning GraphQL: Declarative Data Fetching for Modern Web Apps")
                    .authors(new ArrayList<>(Arrays.asList(author5,author6)))
                    .build();

                Book book6 = Book.builder()
                    .isbn10("1492051721")
                    .name("Learning React: Modern Patterns for Developing React Apps")
                    .authors(new ArrayList<>(Arrays.asList(author5,author6)))
                    .build();

            BookRepository.save(book1);
            BookRepository.save(book2);
            BookRepository.save(book3);
            BookRepository.save(book4);
            BookRepository.save(book5);
            BookRepository.save(book6);

        }
    }

}
```

## Author.js

```text
package com.haddley.haddleyspringgraphql.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@ToString
@Builder
@AllArgsConstructor
@EqualsAndHashCode(exclude = "books")
public class Author {

    @Id
    @GeneratedValue
    Long id;

    String name;

    @ManyToMany(mappedBy = "authors", cascade = CascadeType.ALL)
    List<Book> books;

    public Author() {
        books = new ArrayList<>();
    }
}
```

## Book.java

```text
package com.haddley.haddleyspringgraphql.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@ToString
@Builder
@AllArgsConstructor
@EqualsAndHashCode(exclude = "authors")
public class Book {

    @Id
    @GeneratedValue
    Long id;

    String name;

    String isbn10;

    @ManyToMany(fetch = FetchType.LAZY)
    List<Author> authors;

    public Book() {
        authors = new ArrayList<>();
    }
}
```

## AuthorRepository.java

```text
package com.haddley.haddleyspringgraphql.repositories;

import com.haddley.haddleyspringgraphql.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
```

## BookRepository.java

```text
package com.haddley.haddleyspringgraphql.repositories;

import com.haddley.haddleyspringgraphql.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
```

## schema.graphqls

```text
type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
}

type Mutation {
    deleteBook(id: ID!): Book
    addBook( isbn10: String!, name: String!, authorIds: [ID]!): Book
    addAuthor( name: String!): Author
}

type Author {
    id: ID!
    name: String!
    books: [Book]
}

type Book {
    id: ID!
    isbn10: String!
    name: String!
    authors: [Author]
}
```

## AuthorController.java

```text
package com.haddley.haddleyspringgraphql.controllers;

import com.haddley.haddleyspringgraphql.models.Author;
import com.haddley.haddleyspringgraphql.repositories.AuthorRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorRepository authorRepository;

    @QueryMapping
    public Iterable<Author> authors() {
        return authorRepository.findAll();
    }

    @QueryMapping
    public Optional<Author> author(@Argument Long id) {
        return authorRepository.findById(id);
    }

    @MutationMapping
    public Author addAuthor(@NonNull @Argument String name) {
        Author author = Author.builder()
                        .name(name)
                        .build();

        authorRepository.save(author);

        return author;
    }
}
```

## BookController.java

```text
package com.haddley.haddleyspringgraphql.controllers;

import com.haddley.haddleyspringgraphql.models.Book;
import com.haddley.haddleyspringgraphql.models.Author;
import com.haddley.haddleyspringgraphql.repositories.BookRepository;
import com.haddley.haddleyspringgraphql.repositories.AuthorRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final AuthorRepository authorRepository;
    private final BookRepository bookRepository;

    @QueryMapping
    public Iterable<Book> books() {
        return bookRepository.findAll();
    }

    @QueryMapping
    public Optional<Book> book(@Argument Long id) {
        return bookRepository.findById(id);
    }

    @MutationMapping
    public Optional<Book> deleteBook(@Argument Long id) {
        Optional<Book> book = bookRepository.findById(id);
        book.ifPresent(b -> bookRepository.deleteById(id));
        return book;
    }

    @MutationMapping
    public Book addBook(@NonNull @Argument String isbn10, @NonNull @Argument String name, @NonNull @Argument List<Long> authorIds) {
        List<Author> authors = authorIds.stream()
                                        .map(authorRepository::findById)
                                        .flatMap(Optional::stream)
                                        .collect(Collectors.toList());

        Book book = Book.builder()
                        .isbn10(isbn10)
                        .name(name)
                        .authors(authors)
                        .build();

        bookRepository.save(book);

        return book;
    }
}
```

## pom.xml

```text
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.1.5</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.haddley</groupId>
	<artifactId>haddley-spring-graphql</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>haddley-spring-graphql</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-graphql</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>runtime</scope>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webflux</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.graphql</groupId>
			<artifactId>spring-graphql-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<configuration>
					<excludes>
						<exclude>
							<groupId>org.projectlombok</groupId>
							<artifactId>lombok</artifactId>
						</exclude>
					</excludes>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>
```

