---
title: "Angular and Phaser"
description: "Using Phaser in an Angular Component"
date: "2023-05-10"
categories: ["Angular","TypeScript"]
tags: ""
hidden: false
slug: "angularphaser"
image: "/assets/images/angularphaser/phaser-logo-1836x1530.png"
---

## Highlights

```bash
% npm i -g @angular/cli
% ng new haddley-angular-phaser
% cd haddley-angular-phaser
% npm i phaser
% code .
% ng generate component bounce
```

I updated angular.json:
```json
"scripts": ["node_modules/phaser/dist/phaser.min.js"]
```

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.09.49-pm-1144x740.png)
*I ran ng new haddley-angular-phaser*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.10.31-pm-1136x738.png)
*I installed phaser with npm*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.11.55-pm-1836x1045.png)
*I generated the bounce component*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.16.17-pm-1836x711.png)
*I updated angular.json with "scripts": ["node_modules/phaser/dist/phaser.min.js"]*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-9.29.36-pm-1834x442.png)
*I uploaded files to the /src/assets folder*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.22.39-pm-1836x658.png)
*I added a route*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.23.53-pm-1836x614.png)
*I removed unnecessary html*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.24.39-pm-1836x355.png)
*I enabled allowSyntheticDefaultImports*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.25.08-pm-1836x436.png)
*I added scripthost*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.36.42-pm-1836x261.png)
*I encountered a VideoFrameCallbackMetadata issue*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-9.12.29-pm-1836x476.png)
*I updated the budgets*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-9.22.08-pm-1836x1231.png)
*The app was running*

## References

- [Using Phaser in an Angular 8 Component](https://braelynnn.medium.com/using-phaser-in-an-angular-8-component-53644a2280e3)
- [Github](https://github.com/Haddley/haddley-angular-phaser)
