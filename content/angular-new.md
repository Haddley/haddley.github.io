---
title: "Angular"
description: "A platform for building mobile and desktop web applications"
date: "2025-09-20"
categories: ["Web Development"]
image: "/assets/images/angular"
tags: ["angular","ai","ml"]
hidden: true
slug: "angular-new"
---

An Angular application is defined by a set of NgModules. 

An application always has at least one (root) module that enables bootstrapping.

An application typically has many feature modules.

Components define views (sets of screen elements).

Components use services (functionality not directly related to views).

Service providers can be injected into components as dependencies
.
Modules, components and services are classes (with decorators)


## Getting started

I installed the Angular command line interface using [npm](npm.html)

```bash
% npm i -g @angular/cli
```

I created a new Angular project using "ng new"

```bash
% ng new haddley-angular
```

![](/assets/images/angular/screen-shot-2022-06-18-at-5.38.07-pm-1174x746.png)
*npm i -g @angular/cli*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.39.27-pm-1178x738.png)
*I skipped Angular routing (I can add that later)*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.39.54-pm-1172x746.png)
*I select CSS (no preprocessor required)*


## Running the application locally

I started running the new Angular project by changing to the project directory and  using "ng serve"

```bash
% cd haddley-angular
% ng serve
```

![](/assets/images/angular/screen-shot-2022-06-18-at-5.43.13-pm-1162x744.png)
*I changed to the new project folder and ran "ng serve"*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.43.39-pm-1176x740.png)
*The app is running on localhost:4200*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.44.14-pm-1836x1119.png)
*The out of the box home page*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.47.55-pm-1836x862.png)
*app.component.html is the home page component's "template"*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.49.06-pm-1836x853.png)
*app.component.ts contains the home page component's class*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.49.27-pm-1836x858.png)
*app.component.css contains the home page component's styling (initially empty)*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.49.18-pm-1836x863.png)
*The app.component.spec.ts file provides unit tests that can be run using "ng test"*

![](/assets/images/angular/screen-shot-2022-06-19-at-11.05.45-am-1836x749.png)
*Running unit tests with "ng test"*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.53.50-pm-1836x854.png)
*Updated app.component.html template*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.53.58-pm-1836x1117.png)
*The web page updates*


## Adding a component

I used "ng generate" component to add a component (in a new components folder)

```bash
% ng generate component components/header
```

![](/assets/images/angular/screen-shot-2022-06-18-at-5.55.46-pm-1836x855.png)
*ng generate*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.56.41-pm-1836x855.png)
*The new component has a class. The selector is "app-header"*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.57.15-pm-1836x856.png)
*I updated the app.component's template to use the new component/selector*

![](/assets/images/angular/screen-shot-2022-06-18-at-5.57.22-pm-1836x1117.png)
*The header component is rendered and the title text is discarded*

![](/assets/images/angular/screen-shot-2022-06-18-at-6.07.05-pm-1836x856.png)
*ng-content is used to render the "contents" provided by the parent.*

![](/assets/images/angular/screen-shot-2022-06-18-at-6.03.51-pm-1836x854.png)
*I updated the example to provide the title value to the child component as an attribute*

![](/assets/images/angular/screen-shot-2022-06-18-at-6.04.20-pm-1836x852.png)
*I added @Input() title: string to the header component allowing the header component to accept the "title" attribute*

![](/assets/images/angular/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/angular/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/angular/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

![](/assets/images/angular/screen-shot-2021-03-06-at-9.28.36-pm-1596x894.png)
*esp8266*

