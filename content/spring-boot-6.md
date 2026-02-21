---
title: "Java Spring Boot (Part 6)"
description: "GitHub"
date: "2023-10-31"
categories: ["Java"]
tags: ""
slug: "spring-boot-6"
image: "/assets/images/spring-boot-6/spring-framework-logo-70-no.svg"
---



OAuth2 authentication using Spring Security and GitHub.

![](/assets/images/spring-boot-6/screenshot-2023-11-01-at-1.43.58-pm-1433x943.png)
*I used spring initializr to create a new project with a dependency on Spring Web and OAuth2 Client*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.10.29-am-1229x1116.png)
*I made a small change to the SpringOauth2Application.java file (see above) and ran the project.The project generated a temporary password*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.10.55-am-1308x404.png)
*I accessed the running code on http://localhost:8080 and I was redirected to a login page*

![](/assets/images/spring-boot-6/screenshot-2023-11-02-at-9.11.47-am-1307x185.png)
*I entered the username "user" and the generated a temporary password and the home page was displayed*


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


## SecurityConfig.java

```text
package com.haddley.springoauth2.controller.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.authorizeRequests(auth -> auth.requestMatchers("/").permitAll());
        http.authorizeRequests(auth -> auth.requestMatchers("/webjars/bootstrap/**", "/webjars/jquery/**", "/webjars/popper.js/**").permitAll());
        http.authorizeRequests(auth -> auth.requestMatchers("/user").hasRole("USER"));
        http.authorizeRequests(auth -> auth.requestMatchers("/admin").hasRole("ADMIN"));
        http.authorizeRequests(auth -> auth.requestMatchers("/api/v1/user").hasRole("USER"));
        http.authorizeRequests(auth -> auth.requestMatchers("/api/v1/admin").hasRole("ADMIN"));

        return http.oauth2Login().and().build();
    }
}
```

## WebConfig.java

```text
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    private static final String WEBJARS_PATH_PATTERN = "/webjars/**";
    private static final String WEBJARS_LOCATION = "/webjars/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(WEBJARS_PATH_PATTERN)
                .addResourceLocations(WEBJARS_LOCATION);
    }
}
```

## CustomOAuthUserService.java

```text
package com.haddley.springoauth2.service;

import com.haddley.springoauth2.model.CustomOAuth2User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    private static final String ADMIN_USER_NAME = "15018162";
    private static final String ROLE_USER = "ROLE_USER";
    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private static final String GITHUB_REGISTRATION_ID = "github";

    @Override
    public CustomOAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        logger.info("User Details: {}", user);
        logger.info("User Name Details: {}", user.getName());

        if (!GITHUB_REGISTRATION_ID.equals(userRequest.getClientRegistration().getRegistrationId())) {
            throw new OAuth2AuthenticationException("ID is not from GitHub");
        }

        return new CustomOAuth2User(user, getAuthorities(user));
    }

    private List<SimpleGrantedAuthority> getAuthorities(OAuth2User user) {
        if (ADMIN_USER_NAME.equals(user.getName())) {
            return Arrays.asList(new SimpleGrantedAuthority(ROLE_USER), new SimpleGrantedAuthority(ROLE_ADMIN));
        }

        return Collections.singletonList(new SimpleGrantedAuthority(ROLE_USER));
    }
}
```

## CustomOAuth2User.java

```text
package com.haddley.springoauth2.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final OAuth2User oAuth2User;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomOAuth2User(OAuth2User oAuth2User, Collection<? extends GrantedAuthority> authorities) {
        this.oAuth2User = oAuth2User;
        this.authorities = Collections.unmodifiableCollection(authorities);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oAuth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return oAuth2User.getName();
    }
}
```

## MyRestController.java

```text
package com.haddley.springoauth2.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.core.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class MyRestController {

    private static final Logger logger = LoggerFactory.getLogger(MyRestController.class);
    private static final String DEFAULT_NAME = "World";
    private static final String SECURED_MESSAGE_FORMAT = "Secured %s!";

    @GetMapping("api/v1/user")
    public String userHello(@RequestParam(value = "name", defaultValue = DEFAULT_NAME) String name, Authentication authentication) {
        logger.info("Authentication Details: {}", authentication);
        return String.format(SECURED_MESSAGE_FORMAT, name);
    }

    @GetMapping("api/v1/admin")
    public String adminHello(@RequestParam(value = "name", defaultValue = DEFAULT_NAME) String name, Authentication authentication) {
        logger.info("Authentication Details: {}", authentication);
        return String.format(SECURED_MESSAGE_FORMAT, name);
    }
}
```

## MyPageController.java

```text
package com.haddley.springoauth2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

@Controller
public class MyPageController {

    private static final Logger logger = LoggerFactory.getLogger(MyPageController.class);
    private static final String AVATAR_URL_KEY = "avatar_url";
    private static final String INDEX_VIEW_NAME = "index";
    private static final String USER_VIEW_NAME = "user";
    private static final String ADMIN_VIEW_NAME = "admin";

    @GetMapping("/")
    public ModelAndView index(Authentication authentication) {
        return prepareModelAndView(authentication, INDEX_VIEW_NAME);
    }

    @GetMapping("/user")
    public ModelAndView user(Authentication authentication) {
        return prepareModelAndView(authentication, USER_VIEW_NAME);
    }

    @GetMapping("/admin")
    public ModelAndView admin(Authentication authentication) {
        return prepareModelAndView(authentication, ADMIN_VIEW_NAME);
    }

    private ModelAndView prepareModelAndView(Authentication authentication, String viewName) {
        logger.info("Authentication Details: {}", authentication);

        ModelAndView modelAndView = new ModelAndView(viewName);
        boolean isAuthenticated = false;
        boolean isUser = false;
        boolean isAdmin = false;

        if (authentication != null && authentication.isAuthenticated()) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String avatarUrl = getAvatarUrl(oAuth2User);

            isAuthenticated = true;
            isUser = authentication.getAuthorities().stream().anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_USER"));
            isAdmin = authentication.getAuthorities().stream().anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

            logger.info("User Avatar URL: {}", avatarUrl);

            modelAndView.addObject("avatarUrl", avatarUrl);

        }

        logger.info("isAuthenticated: {}", isAuthenticated);
        logger.info("isUser: {}", isUser);
        logger.info("isAdmin: {}", isAdmin);

        modelAndView.addObject("isAuthenticated", isAuthenticated);
        modelAndView.addObject("isUser", isUser);
        modelAndView.addObject("isAdmin", isAdmin);

        return modelAndView;
    }

    private String getAvatarUrl(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        return (String) attributes.get(AVATAR_URL_KEY);
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
	<artifactId>spring-oauth2</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>spring-oauth2</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-oauth2-client</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-thymeleaf</artifactId>
		</dependency>


		<dependency>
    		<groupId>org.webjars</groupId>
    		<artifactId>bootstrap</artifactId>
    		<version>5.3.2</version>
		</dependency>
		<dependency>
    		<groupId>org.webjars</groupId>
    		<artifactId>jquery</artifactId>
    		<version>3.1.1</version>
		</dependency>


	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```
## References

- [OAuth2Advanced Spring Security Login Made Easy in Java](https://www.youtube.com/watch?v=us0VjFiHogo)
- [Advanced Spring Security](https://www.youtube.com/watch?v=PczgM2L3w60)