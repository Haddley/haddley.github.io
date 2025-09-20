---
title: "Java Spring Boot (Part 6)"
description: "A comprehensive guide covering java spring boot (part 6)"
date: "2025-09-20"
category: "Java"
image: "/assets/images/spring-boot-6/hero.png"
tags: ["java","spring","ai","git","github"]
---

# Java Spring Boot (Part 6)

## OAuth2 Login

![](/assets/images/spring-boot-6/spring-framework-logo-2018.svg)
*Spring Framework logo by Pivotal Software is licensed under Apache License 2.0*


## OAuth2 Login

OAuth2 authentication using Spring Security and GitHub.

![](/assets/images/spring-boot-6/screenshot-2023-11-01-at-1.43.58-pm-1433x943.png)
*I used spring initializr to create a new project with a dependency on Spring Web and OAuth2 Client*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.10.29-am-1229x1116.png)
*I made a small change to the SpringOauth2Application.java file (see above) and ran the project.The project generated a temporary password*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.10.55-am-1308x404.png)
*I accessed the running code on http://localhost:8080 and I was redirected to a login page*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.11.47-am-1307x185.png)
*I entered the username "user" and the generated a temporary password and the home page was displayed*


## GitHub

To switch to using GitHub as an OAuth2 authentication service I would need a github.client-id and a github.client-secret.

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-8.47.31-am-1307x726.png)
*I logged into my GitHub account and clicked on the Settings menu item*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-8.47.51-am-1309x1284.png)
*I clicked on the Developer settings menu item*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-8.48.11-am-1307x543.png)
*I selected the existing localhost OAuth application (if it had not already existed I would have created it)*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-8.48.23-am-1306x1285.png)
*I updated the Authorization callback URL and took a note of the Client ID and a newly generated Client Secret*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-8.51.22-am-1229x289.png)
*I added the github.client-id and a github.client-secret values to my application.properties file*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.15.52-am-1306x820.png)
*Now when I tried to access http://localhost:8080 I was redirected to a GitHub page*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.16.04-am-1308x767.png)
*I provided the Authentication code from my two-factor authentication app*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.21.11-am-1306x153.png)
*I was redirected back to the http://localhost:8080 home page*


## Adding Views and Roles

I added an admin, user and index view.
I added a USER role and an ADMIN role

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-3.02.01-pm-1474x383.png)
*I added a Thymeleaf dependency*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.29.08-pm-1661x862.png)
*I created a SecurityFilterChain Bean to control access*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.29.37-pm-1663x868.png)
*I created a service that assigns security Roles to users (user with GitHub ID=15018162 is the only ADMIN)*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.32.46-pm-1665x589.png)
*REST Controller (not used here because we are generating pages server-side only)*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.33.54-pm-1661x867.png)
*ModelAndView Controller*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.30.20-pm-1665x656.png)
*index view*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.30.43-pm-1666x696.png)
*navbar fragment*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.34.49-pm-1413x869.png)
*Home view*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.35.41-pm-1413x866.png)
*I clicked on the Login button*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.36.13-pm-1412x870.png)
*I entered an Authentication code*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.37.30-pm-1413x870.png)
*Home view with User Menu Item, Admin Menu Item and User Avatar.*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.38.09-pm-1411x867.png)
*User view*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.38.32-pm-1414x868.png)
*Admin view*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.39.20-pm-1414x272.png)
*user api result*

![](/assets/images/spring-boot-6/screenshot-2023-11-04-at-10.39.41-pm-1416x235.png)
*admin api result*
