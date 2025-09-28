---
title: "Angular (Part 1)"
description: "A platform for building mobile and desktop web applications"
date: "2025-09-20"
category: "Web Development"
image: "/assets/images/angular1/hero.png"
tags: ["angular","typescript","ai","ml","testing"]
hidden: true
---

# Angular (Part 1)

## A platform for building mobile and desktop web applications

![](/assets/images/angular1/angular-full-color-logo.svg)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


## Angular

An Angular application is a set of [modules](https://angular.io/guide/architecture-modules). 

An application has at least one (root) module.

For large applications (with many routes) lazy loading [modules](https://angular.io/guide/feature-modules) keeps bundle sizes small.


## Getting started

I installed the Angular command line interface using [npm](npm.html)

```bash
% npm i -g @angular/cli
```

I created a new Angular project using "ng new"

```bash
% ng new haddley-angular
```

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.38.07-pm-1174x746.png)
*npm i -g @angular/cli*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.39.27-pm-1178x738.png)
*I skipped Angular routing (I can add that later)*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.39.54-pm-1172x746.png)
*I select CSS (no preprocessor required)*


## Running the application locally

I started running the new Angular project by changing to the project directory and  using "ng serve"

```bash
% cd haddley-angular
% ng serve
```

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.43.13-pm-1162x744.png)
*I changed to the new project folder and ran "ng serve"*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.43.39-pm-1176x740.png)
*The app is running on localhost:4200*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.44.14-pm-1836x1119.png)
*The out of the box home page*


## App Component

**ng new** creates a single app component.

The app component is defined using four files:

The **app.component.css** file is the component's cascading style sheet.
The **app.component.html** file is the component's html template.
The **app.component.spec.ts** file is used for testing.
The **app.component.ts** file is the component's typescript code.

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.47.55-pm-1836x862.png)
*app.component.html is the home page component's template*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.49.06-pm-1836x853.png)
*app.component.ts contains the home page component's class*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.49.27-pm-1836x858.png)
*app.component.css contains the home page component's styling (initially empty)*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.49.18-pm-1836x863.png)
*The app.component.spec.ts file provides unit tests that can be run using "ng test"*


## App Module

**ng new** creates a single module.

The app module includes a reference to the App Component.


## main.ts

The app module is referenced in the project's main.ts file.


## Updating the app.component

I updated app.component.html to

<h1>{{title}}</h1>

At runtime the {{title}} Angular expression is replaced with the value of the app component's title property.

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.53.50-pm-1836x854.png)
*Updated app.component.html template*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.53.58-pm-1836x1117.png)
*The web page updated*


## Adding a component

I used "ng generate" component to add a header component (in a "components" folder)

```bash
% ng generate component components/header
```

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.55.46-pm-1836x855.png)
*ng generate*

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.56.41-pm-1836x855.png)
*The new component's selector is "app-header"*


## Selector prefix

The angular.json file contains project specific settings.

The prefix value ("app" in this case) is added to the component name to create the selector.


## Updating the app.component (again)

I updated the app component's html template to make use of the header component.

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.57.15-pm-1836x856.png)
*I updated the app.component's template to use the new component/selector*


## Passing content to a component

Replacing the <h1> tags with the <app-header> tags resulted in the {{title}} value being lost.

![](/assets/images/angular1/screen-shot-2022-06-18-at-5.57.22-pm-1836x1117.png)
*The header component is rendered and the title text is discarded*


## ng-content can be used to access the missing content

I updated the header component's html template and used <ng-content> to return the parent component's content.

![](/assets/images/angular1/screen-shot-2022-06-18-at-6.07.05-pm-1836x856.png)
*ng-content is used to render the "contents" provided by the parent.*


## Passing properties

Then I updated the <app-header> tag to pass the {{title}} value as a component attribute

![](/assets/images/angular1/screen-shot-2022-06-18-at-6.03.51-pm-1836x854.png)
*I updated the example to provide the title value to the child component as an attribute*


## @Input

I made a corresponding update to the header component.

I added the **@Input() title: string;** property (and the **import { Input } from 'angular/core';** import)

![](/assets/images/angular1/screen-shot-2022-06-18-at-6.04.20-pm-1836x852.png)
*I added @Input() title: string to the header component allowing the header component to accept the "title" attribute*


## Updating the tests

I updated the app component and header component tests (in line with the changes made above).

The app component and header component are shown in the test results.


## ng build

ng build is used to build the dist folder that will be uploaded to the web server.
