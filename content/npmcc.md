---
title: "npm C++"
description: "Create and publish an npm module using C++."
date: "2025-09-20"
category: "Development"
image: "/assets/images/npmcc/hero.png"
tags: ["ai","git","github","testing"]
---

## Create and publish an npm module using C++.

![](/assets/images/npmcc/6078720-200x200.png)
*Font_Awesome_5_brands_npm by Font Awesome is licensed under CC*


## Recursion

*When a function is called, the computer must "remember" the place it was called from... so that it can return to that location with the result once the call is complete. Typically, this information is saved on the call stack... For tail calls, there is no need to remember the caller...*

[https://en.wikipedia.org/wiki/Tail_call](https://en.wikipedia.org/wiki/Tail_call)

Some interpreters (and compilers) eliminate the stack frame creation and destruction work when they recognize tail recursion.


## C++

Create a folder for the *new* node module.

$ mkdir haddley-factorial-cc

Navigate to the new folder

$ cd haddley-factorial-cc

Create a package.json file 

$ npm init -y


## Mocha and Chai

Automated testing is added using mocha and chai.

$ npm i --save-dev mocha

$ npm i --save-dev chai

$ mkdir test

![](/assets/images/npmcc/screen-shot-2021-02-27-at-12.55.34-pm-1790x1188.png)
*npm test*


## package.json

This is the final package.json file


## Github actions

Github actions ensure that testing is performed using multiple versions of node.

![](/assets/images/npmcc/screen-shot-2021-02-27-at-6.04.35-pm-1836x745.png)
*Tests are running*

![](/assets/images/npmcc/screen-shot-2021-02-27-at-6.05.09-pm-1836x757.png)
*Code passed all of the provided tests*

![](/assets/images/npmcc/screen-shot-2021-02-27-at-6.05.25-pm-1836x830.png)
*Test results for multiple versions of node*


## Publishing to npmjs.com

To publish the module to npmjs.com

$ node login

$ node publish

![](/assets/images/npmcc/screen-shot-2021-02-27-at-6.08.25-pm-1836x1284.png)
*npm publish*


## addon.c

```text
#include <assert.h>
#include <node_api.h>
#include <stdio.h>

double fac(int n)
{
  if (n < 2)
    return 1;
  return n * fac(n - 1);
}

double fac_tr_aux(int n, double acc)
{
  if (n < 2)
    return acc;
  return fac_tr_aux(n - 1, n * acc);
}

double fac_tr(int n)
{
  return fac_tr_aux(n, 1);
}

double fac_it(int n)
{
  double acc = 1;

  for (int i = n; i > 1; i--)
  {
    acc = acc * i;
  }

  return acc;
}

static napi_value Factorial_aux(napi_env env, napi_callback_info info, double (*funcp)(int))
{
  napi_status status;

  size_t argc = 1;
  napi_value args[1];
  status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
  assert(status == napi_ok);

  if (argc < 1)
  {
    napi_throw_type_error(env, NULL, "Wrong number of arguments");
    return NULL;
  }

  napi_valuetype valuetype0;
  status = napi_typeof(env, args[0], &valuetype0);
  assert(status == napi_ok);

  if (valuetype0 != napi_number)
  {
    napi_throw_type_error(env, NULL, "Wrong arguments");
    return NULL;
  }

  double value0;
  status = napi_get_value_double(env, args[0], &value0);
  assert(status == napi_ok);

  napi_value result;

  double res = funcp(value0);

  status = napi_create_double(env, res, &result);
  assert(status == napi_ok);

  return result;
}

static napi_value Factorial(napi_env env, napi_callback_info info)
{
  return Factorial_aux(env, info, &fac);
}

static napi_value Factorial_tr(napi_env env, napi_callback_info info)
{
  return Factorial_aux(env, info, &fac_tr);
}

static napi_value Factorial_it(napi_env env, napi_callback_info info)
{
  return Factorial_aux(env, info, &fac_it);
}

#define DECLARE_NAPI_METHOD(name, func)     \
  {                                         \
    name, 0, func, 0, 0, 0, napi_default, 0 \
  }

napi_value Init(napi_env env, napi_value exports)
{
  napi_status status;
  napi_property_descriptor desc[] = {
      DECLARE_NAPI_METHOD("factorial", Factorial),
      DECLARE_NAPI_METHOD("factorial_tr", Factorial_tr),
      DECLARE_NAPI_METHOD("factorial_it", Factorial_it)};

  status = napi_define_properties(env, exports, 3, desc);

  assert(status == napi_ok);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
```

## addon.js

```javascript
const addon = require('bindings')('addon.node')

exports.factorial = addon.factorial

exports.factorial_tr = addon.factorial_tr

exports.factorial_it = addon.factorial_it
```

## binding.gyp

```javascript
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.c" ]
    }
  ]
}
```

## testtest.js

```javascript
var module = require('../addon')
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
    it('should calculate factorial of 200000 using recursion', function () {
        this.timeout(10000);
        // add an assertion
        expect(module.factorial(200000)).to.equal(Infinity);
    })

    // test recursive function
    it('should calculate factorial of 800000 using tail recursion', function () {
        this.timeout(10000);
        // add an assertion
        expect(module.factorial_tr(800000)).to.equal(Infinity);
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
  "name": "haddley-factorial-cc",
  "version": "1.0.0",
  "description": "",
  "main": "addon.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Haddley/haddley-factorial-cc.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Haddley/haddley-factorial-cc/issues"
  },
  "homepage": "https://github.com/Haddley/haddley-factorial-cc#readme",
  "dependencies": {
    "bindings": "~1.2.1"
  },
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

