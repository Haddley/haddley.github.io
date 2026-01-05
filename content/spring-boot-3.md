---
title: "Java Spring Boot (Part 3)"
description: "SpringdatajpaApplication.java"
date: "2023-10-28"
categories: ["Java"]
tags: ""
slug: "spring-boot-3"
image: "/assets/images/spring-framework-logo-70-no.svg"
---



Spring Data JPA provides a set of abstractions and high-level, repository-style interfaces that make it easier to work with Java Persistence API (JPA) for data access in Spring applications. It reduces boilerplate code.

I created a Spring Boot application using Spring Data JPA

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.03.24-am-1836x981.png)
*I created a new GitHub repository haddley-spring-data-jpa*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.04.03-am-1836x911.png)
*I opened the repository using GitHub Desktop*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.04.25-am-1836x956.png)
*I cloned the GitHib repository*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.04.49-am-1830x872.png)
*GitHub repository folder*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.40.07-am-1836x1176.png)
*I created a new spring boot application springdatajpa*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.16.13-am-1834x864.png)
*I copied the generated files to the GitHub repository folder*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.46.13-am-1836x1018.png)
*I updated SpringdatajpaApplication.java so that it would respond to http://localhost/hello requests*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.26.33-am-1836x213.png)
*I accessed http://localhost/hello using my web browser*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-10.52.00-am-1836x1031.png)
*I created a TodoItem Java class*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-11.10.46-am-1836x407.png)
*I created a Spring Data JPA repository interface (based on the TodoItem class)*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-11.17.11-am-1836x1010.png)
*I created a TodoItemDataLoader to ensure that if the repository was empty two new TodoItems would be added as the application started*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.21.33-pm-1836x1013.png)
*I updated SpringdatajpaApplication.java to return all of the TodoItems in response to http://localhost/hello requests*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.25.12-pm-1836x158.png)
*I accessed http://localhost/todos using my web browser*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.35.11-pm-1836x537.png)
*I added text to applications.properties*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.38.23-pm-1836x614.png)
*I accessed the h2 console (using values jdbc:h2:mem:testdb, sa and password)*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.38.56-pm-1836x1063.png)
*I clicked on the TODO_ITEM table*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-12.39.17-pm-1836x575.png)
*I clicked Run to execute the select query*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-1.16.08-pm-2136x1238.png)
*The haddley-spring-data-jpa application hosted in Azure*

![](/assets/images/spring-boot-3/screenshot-2023-10-29-at-1.16.29-pm-2136x418.png)
*Accessing the haddley-spring-data-jpa application hosted in Azure*


```text
package com.haddley.springdatajpa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SpringdatajpaApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringdatajpaApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }
}
```

## TodoItem.java

```text
package com.haddley.springdatajpa.models;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "todo_item")
public class TodoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    @NotBlank(message = "Description is required")
    private String description;

    @Getter
    @Setter
    private boolean complete;

    @Getter
    @Setter
    private Instant createdDate;

    @Getter
    @Setter
    private Instant modifiedDate;

    public TodoItem() {}

    public TodoItem(String description) {
        this.description = description;
        this.complete = false;
        this.createdDate = Instant.now();
        this.modifiedDate = Instant.now();
    }

    @Override
    public String toString() {
        return String.format("TodoItem{id=%d, description='%s', complete='%s', createdDate='%s', modifiedDate='%s'}", id, description, complete, createdDate, modifiedDate);
    }


}
```

## TodoItemRepository.java

```text
package com.haddley.springdatajpa.models;

import com.haddley.springdatajpa.models.TodoItem;
import org.springframework.data.repository.CrudRepository;

public interface TodoItemRepository extends CrudRepository {
}
```

## TodoItemDataLoader.java

```text
package com.haddley.springdatajpa.config;

import com.haddley.springdatajpa.models.TodoItem;
import com.haddley.springdatajpa.repositories.TodoItemRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TodoItemDataLoader implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(TodoItemDataLoader.class);

    @Autowired
    TodoItemRepository todoItemRepository;

    @Override
    public void run(String... args) throws Exception {
        loadSeedData();
    }

    private void loadSeedData() {
        if (todoItemRepository.count() == 0) {
            TodoItem todoItem1 = new TodoItem("get the milk");
            TodoItem todoItem2 = new TodoItem("rake the leaves");

            todoItemRepository.save(todoItem1);
            todoItemRepository.save(todoItem2); 
        }

        logger.info("Number of TodoItems: {}", todoItemRepository.count());
    }

}
```

## SpringdatajpaApplication.java updated

```text
package com.haddley.springdatajpa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.haddley.springdatajpa.models.TodoItem;
import com.haddley.springdatajpa.repositories.TodoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.StreamSupport;
import java.util.stream.Collectors;

@SpringBootApplication
@RestController
public class SpringdatajpaApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringdatajpaApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    @Autowired
    private TodoItemRepository todoItemRepository;

    @GetMapping("/todos")
    public String index() {

        Iterable todos = todoItemRepository.findAll();

        return StreamSupport.stream(todos.spliterator(), false)
            .map(TodoItem::toString) 
            .collect(Collectors.joining(", ")); 

    }

}
```

## application.properties

```text
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```
## References

- [Spring Data JPA: What is it? And Why Should You Use It?](https://www.youtube.com/watch?v=x67yiTHxn00)
- [90 Minutes to a Complete Java Spring Boot TODO App](https://www.youtube.com/watch?v=Hvuij8SOW8Q)