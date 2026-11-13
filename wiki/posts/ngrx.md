---
type: post
slug: ngrx
title: "NGRX"
date: "2022-11-27"
builds_on: [npm]
topics: [ngrx-state-management, angular-components, redux-pattern, typescript-interfaces]
tools: [NgRx, Angular, npm, TypeScript]
status: current
checked: "2026-11-06"
source_hash: "db8f541f8dbf"
generated_by: gemma4:12b
---

**Summary.** I built an Angular application that uses NgRx to manage state. I demonstrated how to use actions, reducers, and selectors to handle a dice rolling feature.

## What I did
- I implemented the NgRx pattern to manage a single state.
- I created a state structure for dice rolls including success and failure cases.
- I used selectors to provide data to the component.
- I implemented effects to handle asynchronous logic like generating random numbers.

## Claims
- The application state is a number between one and six.
  > "The state of the haddley-ngrx application is a number between 1 and 6."
- The application is working correctly even when a test fails.
  > "In this case the haddley-ngrx app is working fine and the test is wrong."
- The rollSuccess action updates the state value to the number passed as a property.
  > "The rollSuccess action updates `state.value` to the number passed as a property."
- The rollFailure action updates the state error to the text passed as a property.
  > "The rollFailure action updates `state.error` to the text passed as a property."
- The DiceEffects class calculates a random value and dispatches a corresponding action.
  > "When the DiceEffects class spots/notices/is notified of a roll Action it calculates a random value between 1 and 6 and then (some moments later) dispatches a corresponding rollSuccess or rollFailure Action."
- The final result was an Angular application using NgRx for state management.
  > "The result was an Angular application using NgRx for state management."

## Outcome
I built an Angular application using NgRx for state management. The application successfully displays a dice roll value updated by a mouse click.

## Caveats
The post does not show how the application handles features unrelated to the dice state.
