---
title: "Multiplayer Game"
description: "A comprehensive guide covering multiplayer game"
date: "2025-09-20"
category: "Development"
image: "/assets/images/multiplayer/hero.png"
tags: ["javascript","java","database","ai","ml"]
---

# Multiplayer Game

## Multiplayer Game

![](/assets/images/multiplayer/logo-lockup-firebase-vertical.svg)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


## Creating a new firebase project

I created a firebase project using https://console.firebase.google.com

I deployed [Drew Conley's Multiplayer Game](https://www.youtube.com/watch?v=xhURh2RDzzg) to Firebase.

![](/assets/images/multiplayer/screen-shot-2023-05-09-at-9.26.22-am-1814x1582.png)
*https://haddley-multiplayer.web.app/*

![](/assets/images/multiplayer/screen-shot-2023-05-09-at-9.59.28-am-1536x959.png)
*Firebase project settings*

![](/assets/images/multiplayer/screen-shot-2023-05-08-at-5.19.41-pm-1470x786.png)
*firebase initfirebase deploy*


## Responding to updated state

The state of the games is maintained in a Firebase Realtime Database.

The allPlayersRef.on("XXX", (snapshot) => {...}) functions are called when a player joins the game, leaves the game or moves.

The   allCoinsRef.on("value", (snapshot) => {...}) functions are called when coins are created or collected.

![](/assets/images/multiplayer/screen-shot-2023-05-09-at-9.39.39-am-1836x1151.png)
*Realtime Database*


## ChatGPT's commentary

This code appears to be a JavaScript implementation of a game that involves players moving characters on a map and collecting coins. Let's go through the code and explain its different parts:

1. The mapData object defines the boundaries of the game map (minX, maxX, minY, maxY) and the coordinates of blocked spaces on the map (blockedSpaces).
2. The playerColors array contains different colors that can be assigned to players in the game.
3. The randomFromArray function takes an array as input and returns a random element from that array.
4. The getKeyString function takes x and y coordinates and returns a string in the format "x:y".
5. The createName function generates a random name for a player by combining a random prefix and a random animal name.
6. The isSolid function checks if a given coordinate (x, y) represents a solid space on the map. It returns true if the space is blocked or if the coordinates are outside the map boundaries.
7. The getRandomSafeSpot function returns a random coordinate from a predefined set of safe spots on the map where players can initially spawn.
8. The code then defines an immediately-invoked function expression (IIFE) that encapsulates the game logic. Inside this function, various variables are declared and initialized:
playerId and playerRef represent the unique ID and reference for the current player.
players is an object that stores information about all the players in the game.
playerElements is an object that stores references to DOM elements representing each player's character.
coins is an object that stores information about the coins present on the map.
coinElements is an object that stores references to DOM elements representing each coin.
9. The code selects relevant DOM elements using document.querySelector.
10. The placeCoin function is responsible for randomly placing a coin on the map. It selects a safe spot using getRandomSafeSpot, creates a reference to the coin in the Firebase database, and schedules a recursive call to placeCoin after a random timeout.
11. The attemptGrabCoin function is called when a player moves to a new coordinate. It checks if there is a coin at the given coordinates and, if so, removes the coin from the database and increments the player's coin count.
12. The handleArrowPress function is called when a player presses an arrow key to move their character. It calculates the new coordinates based on the current position and the arrow key pressed. If the new coordinates represent a valid move (not blocked by a solid space), it updates the player's position, direction, and saves the changes to the database. It also calls attemptGrabCoin to check if the player grabbed a coin at the new position.
13. The initGame function initializes the game by adding event listeners for arrow key presses, setting up database listeners for player and coin updates, and creating DOM elements for players and coins.
14. The code sets up Firebase authentication using anonymous sign-in (firebase.auth().signInAnonymously()) and handles the authentication state change using firebase.auth().onAuthStateChanged. When a user is authenticated, the game initializes by generating a random name for the player, setting up the player's initial position, and adding the player to the database. It also sets up a disconnection handler to remove the player's data from the database when they disconnect.
15. Finally, the IIFE is invoked immediately, starting the execution of the game code.

In summary, this JavaScript code sets up a multiplayer game where players can control characters on a map. The game uses Firebase for real-time data synchronization. Players can move their characters using arrow keys, collect coins, and see the positions and coin counts of other players. The code initializes the game, handles player authentication, updates player and coin data in the database, and manages the rendering of player and coin elements in the game interface.
