---
title: "Angular and Phaser"
description: "Using Phaser in an Angular Component"
date: "2023-05-10"
categories: ["Angular","TypeScript"]
tags: ""
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

Update angular.json:
```json
"scripts": ["node_modules/phaser/dist/phaser.min.js"]
```

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.09.49-pm-1144x740.png)
*ng new haddley-angular-phaser*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.10.31-pm-1136x738.png)
*npm i phaser*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.11.55-pm-1836x1045.png)
*ng generate component bounce*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.16.17-pm-1836x711.png)
*angular.json "scripts": ["node_modules/phaser/dist/phaser.min.js"]*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-9.29.36-pm-1834x442.png)
*I uploaded files to the /src/assets folder*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.22.39-pm-1836x658.png)
*I added a route*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.23.53-pm-1836x614.png)
*I removed unnecessary html*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.24.39-pm-1836x355.png)
*allowSyntheticDefaultImports*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.25.08-pm-1836x436.png)
*scripthost*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-8.36.42-pm-1836x261.png)
*VideoFrameCallbackMetadata issue*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-9.12.29-pm-1836x476.png)
*updating budgets*

![](/assets/images/angularphaser/screen-shot-2023-04-23-at-9.22.08-pm-1836x1231.png)
*running*

## References

- [Using Phaser in an Angular 8 Component](https://braelynnn.medium.com/using-phaser-in-an-angular-8-component-53644a2280e3)
- [Github](https://github.com/Haddley/haddley-angular-phaser)