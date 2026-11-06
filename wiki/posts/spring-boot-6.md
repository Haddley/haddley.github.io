---
type: post
slug: spring-boot-6
title: "Java Spring Boot (Part 6)"
date: "2023-10-31"
part: 6
builds_on: []
topics: [oauth2-authentication, spring-security, role-based-access-control, github-integration]
tools: [Spring Boot, Spring Security, GitHub, Spring Initializr]
status: current
checked: "2026-11-06"
source_hash: "0cb49a68b413"
generated_by: gemma4:12b
---

**Summary.** I implemented OAuth2 authentication using Spring Security and GitHub to allow users to sign in without the application handling their passwords. I also configured security roles to restrict access to specific pages based on the user's identity.

## What I did
- I integrated GitHub as an OAuth2 provider for user authentication.
- I configured client credentials and callback URLs in the application properties.
- I created a custom user service to assign specific roles to users.
- I configured a SecurityFilterChain to restrict access to admin and user paths.

## Claims
- The application never sees the user's GitHub password.
  > "The application sends the browser to GitHub, the user signs in there, and GitHub sends the browser back with proof, so my application never sees the GitHub password."
- The client secret must be kept out of the public repository.
  > "Keep the real values in environment variables or in a file that Git ignores, and generate a new secret if one is ever exposed."
- The SecurityFilterChain bean determines which paths require specific roles.
  > "A SecurityFilterChain bean decides which paths need which role."
- Only a specific GitHub ID is granted the admin role.
  > "*I created a service that assigns security Roles to users (user with GitHub ID=15018162 is the only ADMIN)*"
- Spring Security provides a default login when it is on the classpath.
  > "A: Spring Security adds a default login when it is on the classpath."

## Outcome
I built a secure application that authenticates users via GitHub and restricts administrative features to specific accounts. The system ensures that sensitive credentials remain secure while providing a seamless login experience.

## Caveats
The post does not show how to manage multiple different OAuth2 providers simultaneously.
