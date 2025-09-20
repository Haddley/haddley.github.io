---
title: "npm JavaScript"
description: "A comprehensive guide covering npm javascript"
date: "2025-09-20"
category: "Development"
image: "/assets/images/npm/hero.png"
tags: ["javascript","java","ai","git","github"]
---

# npm JavaScript

## Create and publish an npm module using JavaScript.

![](/assets/images/npm/6078720-200x200.png)
*Font_Awesome_5_brands_npm by Font Awesome is licensed under CC*


## Recursion

*When a function is called, the computer must "remember" the place it was called from... so that it can return to that location with the result once the call is complete. Typically, this information is saved on the call stack... For tail calls, there is no need to remember the caller...*

[https://en.wikipedia.org/wiki/Tail_call](https://en.wikipedia.org/wiki/Tail_call)

Some interpreters (and compilers) eliminate the stack frame creation and destruction work when they recognize tail recursion.


## JavaScript

Create a folder for the *new* node module.

$ mkdir haddley-factorial-js

Navigate to the new folder

$ cd haddley-factorial-js

Create a package.json file 

$ npm init -y

![](/assets/images/npm/screen-shot-2021-02-27-at-10.44.11-am-1824x1090.png)
*Image Description*


## Mocha and Chai

Automated testing is added using mocha and chai.

$ npm i --save-dev mocha

$ npm i --save-dev chai

$ mkdir test

![](/assets/images/npm/screen-shot-2021-02-27-at-11.24.32-am-1824x1246.png)
*npm test*


## package.json

This is final package.json file


## Github actions

Github actions ensure that testing is performed using multiple versions of node.

![](/assets/images/npm/screen-shot-2021-02-27-at-11.37.09-am-1836x757.png)
*Tests are running*

![](/assets/images/npm/screen-shot-2021-02-27-at-11.37.29-am-1836x749.png)
*Code passed all of the provided tests*

![](/assets/images/npm/screen-shot-2021-02-27-at-11.38.33-am-1836x809.png)
*Test results for multiple versions of node*


## Publishing to npmjs.com

To publish the module to npmjs.com

$ node login

$ node publish

![](/assets/images/npm/screen-shot-2021-02-27-at-11.50.49-am-1818x1240.png)
*npm publish*
