---
title: "NGRX devtools"
description: "A comprehensive guide covering ngrx devtools"
date: "2025-09-20"
category: "Development"
image: "/assets/images/ngrxdevtools.png"
tags: ["angular","git","github"]
---

# NGRX devtools

NGRX devtools Troubleshooting NGRX applications This file is licensed under the Creative Commons 4.0. haddley-ngrx I updated the version of @angular and @ngrx using in the haddley-ngrx project % npm i % ng update % ng update @angular/cli % ng update @ngrx/store I added support for NGRX devtools using "ng add" % ng add @ngrx/store-devtools@latest I added the corresponding chrome extension from https://github.com/reduxjs/redux-devtools/ setup instructions ng update @angular/cli ng update @angular/core ng update @ngrx/store ng add @ngrx/store-devtools@latest chrome devtools extension reviewing store state and actions clicking the dice to roll clicking (pin) to focus on dice/value replaying actions and reviewing dice/value updates Using Jump to navigate to an action Using Jump to navigate to review previous state corresponding with an older action Dispatch Actions can be dispatched using the Chrome addin { type: '[Dice] Roll' } Dispatch References GitHub repository
