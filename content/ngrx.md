---
title: "NGRX"
description: "haddley-ngrx"
date: "2022-11-27"
categories: ["Angular"]
tags: ""
slug: "ngrx"
image: "/assets/images/ngrx.svg"
---


NgRx is inspired by the Redux pattern. 

NgRx stores a single state and uses actions to express state changes.

![](/assets/images/ngrx/state-management-lifecycle-1836x1033.png)
*NGRX state management lifecycle*


I installed the Angular command line interface using [npm](npm.html)

```bash
% npm i -g @angular/cli
```

I created a new Angular project using "ng new"

```bash
% ng new haddley-ngrx
```

![](/assets/images/ngrx/screen-shot-2022-11-27-at-3.16.50-pm-1150x684.png)
*ng new haddley-ngrx*


## State

The state of the haddley-ngrx application is a number between 1 and 6.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-3.48.37-pm-1836x256.png)
*The app component template displays the "value"*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-3.47.45-pm-1836x447.png)
*The app component class sets the "value"*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-3.42.02-pm-1836x589.png)
*The app component style ensures the value is big enough to see at a distance*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-3.42.08-pm-1254x596.png)
*A random number between 1 and 6.*


## (click)

Every time a user refreshes the haddley-ngrx app a random number is displayed.

I updated the code so that the number is updated in response to a mouse click.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.03.37-pm-1380x341.png)
*I added (click)="updateValue()" to app component template*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.05.03-pm-1380x343.png)
*I added code to update "this.value" to app component class*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.08.28-pm-1380x409.png)
*I refactored the code*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.09.00-pm-1380x423.png)
*I created a "valueBetween1And6" function*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.09.30-pm-1380x469.png)
*I updated the declaration of value to use the "valueBetween1And6" function*


## ng test

I ran "ng test" to check that the haddley-ngrx application was working properly.

Two tests passed and one test failed.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.31.42-pm-1836x361.png)
*ng test*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.32.24-pm-1836x969.png)
*karma page*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.36.09-pm-1836x803.png)
*'haddley-ngrx app is running'?*


## Updating the tests

In this case the haddley-ngrx app is working fine and the test is wrong.

I want the application to display a value between 1 and 6. 

I don't want the application to display 'haddley-ngrx app is running'.

So I updated the last test.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.45.52-pm-1836x584.png)
*app component should render a number between 1 and 6*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-4.43.54-pm-1836x254.png)
*ng test*


## Moving to NGRX

Using NGRX I moved "value" out of the app component and into a store.

I updated the app component to dispatch an Action in response to the (click) and to refresh the page content in response to a store Selector.


## Folders

I created a src/app/state folder and a src/app/state/dice folder.


## dice.actions

I created a dice actions typescript file and defined three actions: {roll, rollSuccess, and rollFailure}

The app component will dispatch a "roll" Action in response to a (click).

The app component will not dispatch the rollSuccess Action or the rollFailure Action.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-5.53.50-pm-1836x307.png)
*npm i @ngrx/store*


## dice.state

I created a dice state typescript file and defined a DiceState interface.

NGRX should not throw an exception in response to the app component dispatching an Action. 

Instead a Selector will return a result (to the component) indicating success or failure.

For completeness I have included a (nullable) error value in the DiceState interface.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-5.48.56-pm-1836x273.png)
*DiceState interface*


## dice.reducer

I created a dice reducer typescript file to specify how Actions will be processed.

The rollSuccess action updates the state.value to the number passed to it as a property.

The rollFailure action updates the state.error to the text passed to it as a property.

It might seem odd that the roll Action updates the state.error but does not update the state.value (see Effects below).

![](/assets/images/ngrx/screen-shot-2022-11-27-at-6.08.17-pm-1836x479.png)
*diceReducer*


## app.state

As my application grows it is likely that I will add features that are unrelated to dice.state. 

With that in mind I have created an app.state interface that can be used in the future to access dice.state and state related to other features.

I added an app.state typescript file to the state folder.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-6.54.08-pm-1836x235.png)
*app.state interface*


## dice.selectors

The app.component will access the dice state using selectors.

I added the dice.selectors typescript file and created the two selectors the app.component needs.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-6.58.27-pm-1836x501.png)
*dice.selectors*


## app.module

To get NGRX to work I needed to add two modules to the app.module file.

First I added StoreModule

![](/assets/images/ngrx/screen-shot-2022-11-27-at-7.04.48-pm-1836x579.png)
*adding StoreModule to app.module*


## Using the selectors

I updated app component template and app component class to make use of the selectDiceValue and selectDiceError selectors.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-7.31.49-pm-1836x714.png)
*app component class*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-7.33.16-pm-1836x144.png)
*app component template*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-7.36.00-pm-1260x586.png)
*ng serve -o(click) seems to do nothingrefreshing the page seems to work*


## ng test

After these updates the tests fail.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-7.39.36-pm-1836x1155.png)
*No provider for Store!*


## MockStore

To get the ng tests to pass we need to add a "mock store"

![](/assets/images/ngrx/screen-shot-2022-11-27-at-7.49.48-pm-1836x770.png)
*provideMockStore*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-7.51.03-pm-1836x653.png)
*ng test success*


## dice.effects

When the app component dispatches the "roll" Action the app component does not provide a value.

Without additional effort the roll Action is not in a position to update the state.

NGRX effects address this problem.

I created a DiceEffects class that responds to "roll" Actions.

When the DiceEffects class spots/notices/is notified of a roll Action it calculates a random value between 1 and 6 and then (some moments later) dispatches a corresponding rollSuccess or rollFailure Action.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-8.19.31-pm-1836x798.png)
*dice.effects*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-8.16.52-pm-1836x599.png)
*EffectsModule import added to AppModule*


## Final result

The final result is an Angular application that uses NGRX for state management.

![](/assets/images/ngrx/screen-shot-2022-11-27-at-8.20.53-pm-1836x1021.png)
*ng test*

![](/assets/images/ngrx/screen-shot-2022-11-27-at-8.23.22-pm-1256x592.png)
*ng serve -o*
## References

- [GitHub repository](https://github.com/Haddley/haddley-ngrx)