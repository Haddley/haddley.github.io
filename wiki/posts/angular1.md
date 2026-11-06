---
type: post
slug: angular1
title: "Angular"
date: "2025-09-20"
builds_on: [npm]
topics: [angular-modules, component-architecture, lazy-loading, property-binding]
tools: [Angular, npm, TypeScript, CSS]
status: current
checked: "2026-11-05"
source_hash: "a2ae28a5ee28"
generated_by: gemma4:12b
---

**Summary.** I built an Angular application to demonstrate the core architecture of the framework. I explored component structure, module organization, and the process of passing data between components.

## What I did
- I initialized the project using the Angular CLI.
- I organized the application using modules and managed bundle sizes.
- I created and linked the app component and header component.
- I implemented data passing using the @Input decorator.
- I built the final production files for web deployment.

## Claims
- I used lazy loading to keep bundle sizes small for large applications.
  > "For large applications (with many routes) I used lazy loading modules to keep bundle sizes small."
- The app component is defined using four specific files.
  > "The app component is defined using four files:"
- The app module includes a reference to the App Component.
  > "The app module includes a reference to the App Component."
- I used ng-content to return the parent component content.
  > "I updated the header component's html template and used `<ng-content>` to return the parent component's content."
- I added the Input property to the header component.
  > "I added the `@Input() title: string;` property (and the `import { Input } from '@angular/core';` import)"
- I used ng build to create the dist folder for the web server.
  > "I used ng build to build the dist folder that I uploaded to the web server."

## Outcome
I built a functional Angular application with a modular structure and a header component that accepts input attributes.

## Caveats
I skipped the implementation of Angular routing in this post.
