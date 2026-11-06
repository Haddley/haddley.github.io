---
type: post
slug: ticktacktoe
title: "Multiplayer Tick-Tack-Toe"
date: "2023-05-10"
builds_on: []
topics: [real-time-database, firebase-authentication, game-logic, web-development]
tools: [Firebase, HTML, CSS, JavaScript, ChatGPT]
status: current
checked: "2026-11-06"
source_hash: "4617535f7975"
generated_by: gemma4:12b
---

**Summary.** I created a multiplayer version of Tic-Tac-Toe using Firebase Realtime Database, HTML, CSS, and JavaScript. The post explains how to synchronize game states between players and manage user authentication.

## What I did
- I asked ChatGPT for help designing the multiplayer logic.
- I set up a Firebase project and Realtime Database.
- I developed the frontend using HTML and CSS.
- I wrote JavaScript to handle game logic and database synchronization.
- I implemented anonymous authentication to identify players.

## Claims
- I used ChatGPT to assist in the initial creation of the multiplayer game.
  > "I asked ChatGPT for some help creating a multiplayer version of Tick-Tack-Toe."
- I used Firebase Realtime Database to sync the game state.
  > "Database Reference: The code obtains a reference to the Firebase Realtime Database service by calling firebase.database()."
- I implemented anonymous authentication so players do not need a full account.
  > "Anonymous Authentication: The code signs in the user anonymously by calling firebase.auth().signInAnonymously()."
- The updateUI function handles the visual changes on the board.
  > "Update UI: The updateUI() function is responsible for updating the user interface based on the current game state."
- The makeMove function validates the turn and updates the board.
  > "It checks if the game is still in progress, verifies the user's turn, and updates the game board if the move is valid."
- The initGame function listens for database changes to update the local UI.
  > "It also listens for changes in the game state data in the database and updates the local game state and UI accordingly."

## Outcome
I built a functional multiplayer Tic-Tac-Toe game that synchronizes state across different clients using Firebase.

## Caveats
The post does not detail how to handle complex networking edge cases or advanced security rules.
