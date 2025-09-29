---
title: "NGRX devtools"
description: "haddley-ngrx"
date: "2023-01-25"
categories: ["Angular"]
tags: []
slug: "ngrxdevtools"
image: "/assets/images/ngrx.svg"
---


I updated the version of @angular and @ngrx using in the haddley-ngrx project

```bash
% npm i

% ng update

% ng update @angular/cli
% ng update @ngrx/store

```

I added support for NGRX devtools using "ng add"

```bash
% ng add @ngrx/store-devtools@latest
```

I added the corresponding chrome extension from

**https://github.com/reduxjs/redux-devtools/
**

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-1.02.21-pm-1380x1013.png)
*setup instructions*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-1.50.27-pm-1822x1047.png)
*ng update @angular/cli*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-1.52.17-pm-1822x1056.png)
*ng update @angular/core ng update @ngrx/store*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-1.53.07-pm-1822x308.png)
*ng add @ngrx/store-devtools@latest*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-1.58.00-pm-1822x1078.png)
*chrome devtools extension*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-2.01.37-pm-1822x858.png)
*reviewing store state and actions*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-2.01.56-pm-1822x788.png)
*clicking the dice to roll*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-2.03.03-pm-1822x855.png)
*clicking (pin) to focus on dice/value*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-2.03.33-pm-1822x847.png)
*replaying actions and reviewing dice/value updates*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-2.03.52-pm-1822x787.png)
*Using Jump to navigate to an action*

![](/assets/images/ngrxdevtools/screen-shot-2023-01-25-at-2.04.27-pm-1822x792.png)
*Using Jump to navigate to review previous state corresponding with an older action*


## Dispatch

![](/assets/images/ngrxdevtools/screen-shot-2023-02-05-at-9.56.59-am-1836x1040.png)
*Dispatch*
## References

- [GitHub repository](https://github.com/Haddley/haddley-ngrx)