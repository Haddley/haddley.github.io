---
type: post
slug: spring-boot-4
title: "Java Spring Boot (Part 4)"
date: "2023-10-29"
part: 4
builds_on: []
topics: [spring-mvc, thymeleaf-templating, web-routing, crud-operations]
tools: [Spring Boot, Thymeleaf, Bootstrap, jQuery, H2 Database]
status: current
checked: "2026-11-06"
source_hash: "46c2813ca54f"
generated_by: gemma4:12b
---

**Summary.** I transitioned the application from plain text output to a rendered web page using Spring MVC and Thymeleaf. I also implemented a delete functionality to manage the list of items.

## What I did
- I integrated Thymeleaf, Bootstrap, and jQuery to render the web page.
- I used ModelAndView to pass data from the controller to the view.
- I updated the controller to handle delete requests and redirect to the home page.
- I demonstrated the difference between a direct view return and a redirect.

## Claims
- I used ModelAndView to pass both the view name and the model data to the template.
  > "A: It carries two things from a controller to the page: the name of the view, and the model, which is the data that the view needs."
- Thymeleaf fills HTML placeholders with model data before the browser renders the page.
  > "I write an HTML page with placeholders, and Thymeleaf fills them in with the model data before the browser sees the page."
- Bootstrap and jQuery provide the styling and scripts for the page.
  > "A: They supply the styling and the scripts for the page, and I added them to the project as dependencies, as the first screenshot shows."
- A redirect ensures the page displays the updated list after a deletion.
  > "The redirect sends the browser back to / , and that request runs the index method, which loads the todo items again, so the page shows the list without the deleted item."
- Using a GET request for deletion is only acceptable for a demonstration.
  > "A delete that uses GET is acceptable for a demonstration, but not for a real application."

## Outcome
I built a web page that displays todo items and allows users to delete them. I concluded that a redirect is necessary after a delete action to refresh the model data.

## Caveats
The use of a GET request for the delete action is not secure for a production application.
