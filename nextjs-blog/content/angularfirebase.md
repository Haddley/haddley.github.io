---
title: "Angular Firebase"
description: "A comprehensive guide covering angular firebase"
date: "2025-09-20"
category: "Web Development"
image: "/assets/images/logo-lockup-firebase-vertical.svg"
tags: ["angular","react","ai","ml"]
---

# Angular Firebase

## An Angular Firebase App

![](/assets/images/angularfirebase/logo-lockup-firebase-vertical.svg)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


## Creating a new firebase project

I created a firebase project using https://console.firebase.google.com

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.02.39-pm-1836x1011.png)
*haddley-firebase*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.03.04-pm-1836x1009.png)
*disable google analytics*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.05.06-pm-1836x1001.png)
*wait*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.05.38-pm-1836x1011.png)
*firebase project has been created*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.07.10-pm-832x520.png)
*Web*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.10.13-pm-1836x1013.png)
*App nickname*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.11.10-pm-1836x1006.png)
*Firebase SDK*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.14.03-pm-1836x921.png)
*firebase project dashboard*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.14.57-pm-1836x729.png)
*Get started*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.15.48-pm-1836x842.png)
*Email/Password*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.17.21-pm-1836x892.png)
*Email/Password enable*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.18.19-pm-1836x769.png)
*esp8266*


## Creating a new angular project

I installed the Angular command line interface using [npm](npm.html)

```bash
% npm i -g @angular/cli
```

I created a new Angular project using "ng new"

```bash
% ng new haddley-angular
```

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.19.35-pm-1836x983.png)
*ng new haddley-angular*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.22.07-pm-1836x965.png)
*npm start*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.23.19-pm-1836x643.png)
*http://localhost:4200*


## angular fire

https://www.npmjs.com/package/@angular/fire

npm i @angular/fire

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-5.27.16-pm-1366x614.png)
*npm i @angular/fire*


## environments

I added firebaseConfig to environments.ts

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-8.24.03-pm-1836x551.png)
*environments.ts*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-8.43.55-pm-1836x773.png)
*I added provideFirebaseApp, provideFirestore, provideAuth and ReactiveFormsModule to app.module.ts*


## login, register and dashboard components

ng generate component login
ng generate component register
ng generate component dashboard

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-8.34.16-pm-1836x520.png)
*ng generate component login, register and dashboard*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-8.36.08-pm-1836x314.png)
*I removed the sample html from app.component.html*


## bootstrap 5

I used bootstrap for styling the forms

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-8.39.03-pm-1836x563.png)
*CSS stylesheet link*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-8.40.07-pm-1836x483.png)
*CSS stylesheet link added*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-8.41.32-pm-1836x803.png)
*example form*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-9.01.00-pm-1836x647.png)
*register.component.html*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-9.53.35-pm-1836x708.png)
*login.component.html*

![](/assets/images/angularfirebase/screen-shot-2023-04-26-at-11.09.01-am-1836x270.png)
*dashboard.component.html*


## Route

Angular routing configuration

![](/assets/images/angularfirebase/screen-shot-2023-04-26-at-11.26.53-am-1836x589.png)
*authguard.ts*

![](/assets/images/angularfirebase/screen-shot-2023-04-26-at-11.27.17-am-1836x621.png)
*app-routing.module.ts*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-9.57.46-pm-1836x580.png)
*firebase users (none)*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-9.58.10-pm-1836x583.png)
*/register*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-9.58.23-pm-1836x591.png)
*firebase users*

![](/assets/images/angularfirebase/screen-shot-2023-04-25-at-9.58.38-pm-1836x540.png)
*/login*

![](/assets/images/angularfirebase/screen-shot-2023-04-26-at-11.10.48-am-1836x613.png)
*/dashboard*


## ng deploy

I used "ng deploy" to deploy the app.

% ng deploy

![](/assets/images/angularfirebase/screen-shot-2023-04-26-at-11.55.42-am-1720x870.png)
*ng deploy*

![](/assets/images/angularfirebase/screen-shot-2023-04-26-at-11.56.01-am-1836x1011.png)
*https://haddley-firebase-e8e21.web.app*


## Saving and retrieving private message documents

addDoc and query collection

![](/assets/images/angularfirebase/screen-shot-2023-04-27-at-11.08.21-am-1836x476.png)
*rules*

![](/assets/images/angularfirebase/screen-shot-2023-04-27-at-11.08.59-am-1298x808.png)
*dashboard*
