---
title: "npm JavaScript"
description: "Create and publish an npm module using JavaScript."
date: "2021-02-25"
categories: ["JavaScript","DevOps"]
tags: []
slug: "npm"
image: "/assets/images/6078720-200x200.png"
---


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


## index.js

```javascript
const factorial = (n) => {
    if (n < 2) return 1;
    return n * factorial(n - 1);
}

exports.factorial = factorial

const factorial_tr = (n) => {

    function fact(n, acc) {
        if (n < 2) return acc;
        return fact(n - 1, n * acc);
    }

    return fact(n, 1)
}

exports.factorial_tr = factorial_tr

const factorial_it = (n) => {

    let acc = 1

    for (i = n; i > 1; i--) {
        acc = acc * i
    }

    return acc
}

exports.factorial_it = factorial_it
```

## testtest.js

```javascript
var module = require('../index')
var expect = require('chai').expect;

describe('#factorial()', function () {

    // test recursive function
    it('should calculate factorial of 9 using recursion', function () {
        // add an assertion
        expect(module.factorial(9)).to.equal(362880);
    })

    // test tail recursion version
    it('should calculate factorial of 9 using tail recursion', function () {
        // add an assertion
        expect(module.factorial_tr(9)).to.equal(362880);
    })

    // test iteration version
    it('should calculate factorial of 9 using iteration', function () {
        // add an assertion
        expect(module.factorial_it(9)).to.equal(362880);
    })

    // test tail recursion version
    it('should calculate factorial of 170 using recursion', function () {
        // add an assertion
        expect(module.factorial(170)).to.equal(7.257415615307994e+306);
    })

    // test tail recursion version
    it('should calculate factorial of 170 using tail recursion', function () {
        // add an assertion
        expect(module.factorial_tr(170)).to.equal(7.257415615308004e+306);
    })

    // test iteration version
    it('should calculate factorial of 170 using iteration', function () {
        // add an assertion
        expect(module.factorial_it(170)).to.equal(7.257415615308004e+306);
    })

    // test tail recursion version
    it('should calculate factorial of 171 using recursion', function () {
        // add an assertion
        expect(module.factorial(171)).to.equal(Infinity);
    })

    // test tail recursion version
    it('should calculate factorial of 171 using tail recursion', function () {
        // add an assertion
        expect(module.factorial_tr(171)).to.equal(Infinity);
    })

    // test iteration version
    it('should calculate factorial of 171 using iteration', function () {
        // add an assertion
        expect(module.factorial_it(171)).to.equal(Infinity);
    })

    // test recursive function
    it('should calculate factorial of 10000 using recursion', function () {
        this.timeout(10000);
        // add an assertion
        expect(module.factorial(10000)).to.equal(Infinity);
    })

    // test recursive function
    it('should calculate factorial of 10000 using tail recursion', function () {
        this.timeout(10000);
        // add an assertion
        expect(module.factorial_tr(10000)).to.equal(Infinity);
    })

    // test recursive function
    it('should calculate factorial of 1600000 using iteration', function () {
        this.timeout(10000);
        // add an assertion
        expect(module.factorial_it(1600000)).to.equal(Infinity);
    })


})
```

## package.json

```javascript
{
  "name": "haddley-factorial-js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Haddley/haddley-factorial-js.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Haddley/haddley-factorial-js/issues"
  },
  "homepage": "https://github.com/Haddley/haddley-factorial-js#readme",
  "devDependencies": {
    "chai": "^4.3.0",
    "mocha": "^8.3.0"
  }
}
```

## node.js.yml

```javascript
# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.x, 12.x, 14.x, 15.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```