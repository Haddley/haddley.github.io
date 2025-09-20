---
title: "Angular"
description: "A comprehensive guide covering angular"
date: "2025-09-20"
category: "Web Development"
image: "/assets/images/angular.png"
tags: ["angular","ai","ml"]
---

# Angular

Angular A platform for building mobile and desktop web applications This file is licensed under the Creative Commons Attribution 4.0 International license. Angular An Angular application is defined by a set of NgModules. An application always has at least one (root) module that enables bootstrapping. An application typically has many feature modules. Components define views (sets of screen elements). Components use services (functionality not directly related to views). Service providers can be injected into components as dependencies . Modules, components and services are classes (with decorators) Getting started I installed the Angular command line interface using npm % npm i -g @angular/cli I created a new Angular project using "ng new" % ng new haddley-angular npm i -g @angular/cli I skipped Angular routing (I can add that later) I select CSS (no preprocessor required) Running the application locally I started running the new Angular project by changing to the project directory and using "ng serve" % cd haddley-angular % ng serve I changed to the new project folder and ran "ng serve" The app is running on localhost:4200 The out of the box home page app.component.html is the home page component's "template" app.component.ts contains the home page component's class app.component.css contains the home page component's styling (initially empty) The app.component.spec.ts file provides unit tests that can be run using "ng test" Running unit tests with "ng test" Updated app.component.html template The web page updates Adding a component I used "ng generate" component to add a component (in a new components folder) % ng generate component components/header ng generate The new component has a class. The selector is "app-header" I updated the app.component's template to use the new component/selector The header component is rendered and the title text is discarded ng-content is used to render the "contents" provided by the parent. I updated the example to provide the title value to the child component as an attribute I added @Input() title: string to the header component allowing the header component to accept the "title" attribute esp8266 esp8266 esp8266 esp8266
