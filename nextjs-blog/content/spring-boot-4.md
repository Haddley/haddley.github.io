---
title: "Java Spring Boot (Part 4)"
description: "A comprehensive guide covering java spring boot (part 4)"
date: "2025-09-20"
category: "Java"
image: "/assets/images/spring-framework-logo-70-no.svg"
tags: ["java","spring"]
---

# Java Spring Boot (Part 4)

## ModelAndView

![](/assets/images/spring-boot-4/spring-framework-logo-2018.svg)
*Spring Framework logo by Pivotal Software is licensed under Apache License 2.0*


## ModelAndView

In Java Spring, ModelAndView is a class that represents both a model and a view for a web application. It is typically used in the context of Spring MVC (Model-View-Controller) to handle web requests and provide a way to pass data to a view template for rendering.

Using ModelAndView allows you to separate the model data and the view template, making your code more modular and following the MVC pattern, which is a common architectural pattern in web development. Note that in more recent versions of Spring, you can often return a Map or a POJO directly from a controller method, simplifying the code and eliminating the need for ModelAndView.

![](/assets/images/spring-boot-4/screenshot-2023-10-29-at-2.18.03-pm-2136x1056.png)
*I added thymeleaf, bootstrap and jquery as dependencies*

![](/assets/images/spring-boot-4/screenshot-2023-10-29-at-2.19.57-pm-2136x1053.png)
*I added a thymeleaf page (as an alternative to JSP)*

![](/assets/images/spring-boot-4/screenshot-2023-10-29-at-2.21.23-pm-2136x1055.png)
*I updated the controller to populate the fetch the todo items and to pass them and the current day of the week to the thymeleaf view.*

![](/assets/images/spring-boot-4/screenshot-2023-10-29-at-2.22.07-pm-2136x963.png)
*The new home page displays the todo items*

![](/assets/images/spring-boot-4/screenshot-2023-10-29-at-2.30.48-pm-2136x832.png)
*I updated the controller to handle a delete request*

![](/assets/images/spring-boot-4/screenshot-2023-10-29-at-2.31.38-pm-2136x874.png)
*I clicked the Delete button on the second todo item*

![](/assets/images/spring-boot-4/screenshot-2023-10-29-at-2.31.47-pm-2136x876.png)
*The second todo item has been deleted*
