---
title: "Azure Spring Apps (Part 1)"
description: "A comprehensive guide covering azure spring apps (part 1)"
date: "2025-09-20"
category: "Development"
image: "/assets/images/sprint-apps1.png"
tags: ["azure","java","spring","ai","git"]
---

# Azure Spring Apps (Part 1)

Azure Spring Apps (Part 1) hello-world-app Spring Framework logo by Pivotal Software is licensed under Apache License 2.0 Hello World I used Azure Spring Apps to host a Java Web Application in Microsoft Azure I clicked the Azure Spring Apps Create button I reviewed the overview and clicked the Create button I specified a resource group name (haddley-spring-rg) I specified a service details name (haddley-spring) I selected the entry level and clicked the Deploy sample project option GreetingController.java package hello; import org.springframework.stereotype.Controller; import org.springframework.web.bind.annotation.RequestMapping; import org.springframework.web.bind.annotation.ResponseBody; @Controller public class GreetingController { @RequestMapping("/") public @ResponseBody String greeting() { return "Hello World"; } } https://github.com/spring-guides/gs-spring-boot-for-azure/blob/main/complete/src/main/java/hello/GreetingController.java I clicked the Create button Deployment in progress Deployment is complete Overview Apps hello-world-app Running application Scale up Scale out Stop service Quickstarts ./mvnw spring-boot:run Tomcat initialized with port 8080 (http) Running locally References Azure Spring Apps: The easy way to run your apps | ODFP207
