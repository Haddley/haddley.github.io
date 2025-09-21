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


## Security Rules

```text
{
  "rules": {
    ".read": "auth != null",
    ".write": false,
    "players": {
      "$uid": {
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "coins": {
        ".write": "auth != null"
    }
  }
}
```

## index.html

```text
<html>

<head>
  <title>Multiplayer Demo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css" type="text/css">
</head>

<body>

  <div class="game-container">
  </div>
  <div class="player-info">
    <div>
      <label for="player-name">Your Name</label>
      <input id="player-name" maxlength="10" type="text" />
    </div>
    <div>
      <button id="player-color">Change Color</button>
    </div>
  </div>

  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
  <script>
    // NOTE - INCLUDE YOUR FIREBASE CONFIG HERE FOR ANYTHING TO WORK:
    const firebaseConfig = {
      apiKey: "AIzaSyBfoImSImcCkM7TD-Z3X-LxWs4OEbGOaUQ",
      authDomain: "haddley-multiplayer.firebaseapp.com",
      projectId: "haddley-multiplayer",
      storageBucket: "haddley-multiplayer.appspot.com",
      messagingSenderId: "119673300748",
      appId: "1:119673300748:web:8cb5b0ba8dbbae0834cb29"
    };
    firebase.initializeApp(firebaseConfig);
  </script>


  <script src="/KeyPressListener.js"></script>
  <script src="/app.js"></script>
</body>

</html>
```

## app.js

```text
const mapData = {
  minX: 1,
  maxX: 14,
  minY: 4,
  maxY: 12,
  blockedSpaces: {
    "7x4": true,
    "1x11": true,
    "12x10": true,
    "4x7": true,
    "5x7": true,
    "6x7": true,
    "8x6": true,
    "9x6": true,
    "10x6": true,
    "7x9": true,
    "8x9": true,
    "9x9": true,
  },
};

// Options for Player Colors... these are in the same order as our sprite sheet
const playerColors = ["blue", "red", "orange", "yellow", "green", "purple"];

//Misc Helpers
function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function getKeyString(x, y) {
  return `${x}x${y}`;
}

function createName() {
  const prefix = randomFromArray([
    "COOL",
    "SUPER",
    "HIP",
    "SMUG",
    "COOL",
    "SILKY",
    "GOOD",
    "SAFE",
    "DEAR",
    "DAMP",
    "WARM",
    "RICH",
    "LONG",
    "DARK",
    "SOFT",
    "BUFF",
    "DOPE",
  ]);
  const animal = randomFromArray([
    "BEAR",
    "DOG",
    "CAT",
    "FOX",
    "LAMB",
    "LION",
    "BOAR",
    "GOAT",
    "VOLE",
    "SEAL",
    "PUMA",
    "MULE",
    "BULL",
    "BIRD",
    "BUG",
  ]);
  return `${prefix} ${animal}`;
}

function isSolid(x,y) {

  const blockedNextSpace = mapData.blockedSpaces[getKeyString(x, y)];
  return (
    blockedNextSpace ||
    x >= mapData.maxX ||
    x < mapData.minX ||
    y >= mapData.maxY ||
    y < mapData.minY
  )
}

function getRandomSafeSpot() {
  //We don't look things up by key here, so just return an x/y
  return randomFromArray([
    { x: 1, y: 4 },
    { x: 2, y: 4 },
    { x: 1, y: 5 },
    { x: 2, y: 6 },
    { x: 2, y: 8 },
    { x: 2, y: 9 },
    { x: 4, y: 8 },
    { x: 5, y: 5 },
    { x: 5, y: 8 },
    { x: 5, y: 10 },
    { x: 5, y: 11 },
    { x: 11, y: 7 },
    { x: 12, y: 7 },
    { x: 13, y: 7 },
    { x: 13, y: 6 },
    { x: 13, y: 8 },
    { x: 7, y: 6 },
    { x: 7, y: 7 },
    { x: 7, y: 8 },
    { x: 8, y: 8 },
    { x: 10, y: 8 },
    { x: 8, y: 8 },
    { x: 11, y: 4 },
  ]);
}


(function () {

  let playerId;
  let playerRef;
  let players = {};
  let playerElements = {};
  let coins = {};
  let coinElements = {};

  const gameContainer = document.querySelector(".game-container");
  const playerNameInput = document.querySelector("#player-name");
  const playerColorButton = document.querySelector("#player-color");


  function placeCoin() {
    const { x, y } = getRandomSafeSpot();
    const coinRef = firebase.database().ref(`coins/${getKeyString(x, y)}`);
    coinRef.set({
      x,
      y,
    })

    const coinTimeouts = [2000, 3000, 4000, 5000];
    setTimeout(() => {
      placeCoin();
    }, randomFromArray(coinTimeouts));
  }

  function attemptGrabCoin(x, y) {
    const key = getKeyString(x, y);
    if (coins[key]) {
      // Remove this key from data, then uptick Player's coin count
      firebase.database().ref(`coins/${key}`).remove();
      playerRef.update({
        coins: players[playerId].coins + 1,
      })
    }
  }


  function handleArrowPress(xChange=0, yChange=0) {
    const newX = players[playerId].x + xChange;
    const newY = players[playerId].y + yChange;
    if (!isSolid(newX, newY)) {
      //move to the next space
      players[playerId].x = newX;
      players[playerId].y = newY;
      if (xChange === 1) {
        players[playerId].direction = "right";
      }
      if (xChange === -1) {
        players[playerId].direction = "left";
      }
      playerRef.set(players[playerId]);
      attemptGrabCoin(newX, newY);
    }
  }

  function initGame() {

    new KeyPressListener("ArrowUp", () => handleArrowPress(0, -1))
    new KeyPressListener("ArrowDown", () => handleArrowPress(0, 1))
    new KeyPressListener("ArrowLeft", () => handleArrowPress(-1, 0))
    new KeyPressListener("ArrowRight", () => handleArrowPress(1, 0))

    const allPlayersRef = firebase.database().ref(`players`);
    const allCoinsRef = firebase.database().ref(`coins`);

    allPlayersRef.on("value", (snapshot) => {
      //Fires whenever a change occurs
      players = snapshot.val() || {};
      Object.keys(players).forEach((key) => {
        const characterState = players[key];
        let el = playerElements[key];
        // Now update the DOM
        el.querySelector(".Character_name").innerText = characterState.name;
        el.querySelector(".Character_coins").innerText = characterState.coins;
        el.setAttribute("data-color", characterState.color);
        el.setAttribute("data-direction", characterState.direction);
        const left = 16 * characterState.x + "px";
        const top = 16 * characterState.y - 4 + "px";
        el.style.transform = `translate3d(${left}, ${top}, 0)`;
      })
    })
    allPlayersRef.on("child_added", (snapshot) => {
      //Fires whenever a new node is added the tree
      const addedPlayer = snapshot.val();
      const characterElement = document.createElement("div");
      characterElement.classList.add("Character", "grid-cell");
      if (addedPlayer.id === playerId) {
        characterElement.classList.add("you");
      }
      characterElement.innerHTML = (`
        <div class="Character_shadow grid-cell"></div>
        <div class="Character_sprite grid-cell"></div>
        <div class="Character_name-container">
          <span class="Character_name"></span>
          <span class="Character_coins">0</span>
        </div>
        <div class="Character_you-arrow"></div>
      `);
      playerElements[addedPlayer.id] = characterElement;

      //Fill in some initial state
      characterElement.querySelector(".Character_name").innerText = addedPlayer.name;
      characterElement.querySelector(".Character_coins").innerText = addedPlayer.coins;
      characterElement.setAttribute("data-color", addedPlayer.color);
      characterElement.setAttribute("data-direction", addedPlayer.direction);
      const left = 16 * addedPlayer.x + "px";
      const top = 16 * addedPlayer.y - 4 + "px";
      characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;
      gameContainer.appendChild(characterElement);
    })


    //Remove character DOM element after they leave
    allPlayersRef.on("child_removed", (snapshot) => {
      const removedKey = snapshot.val().id;
      gameContainer.removeChild(playerElements[removedKey]);
      delete playerElements[removedKey];
    })


    //New - not in the video!
    //This block will remove coins from local state when Firebase `coins` value updates
    allCoinsRef.on("value", (snapshot) => {
      coins = snapshot.val() || {};
    });
    //

    allCoinsRef.on("child_added", (snapshot) => {
      const coin = snapshot.val();
      const key = getKeyString(coin.x, coin.y);
      coins[key] = true;

      // Create the DOM Element
      const coinElement = document.createElement("div");
      coinElement.classList.add("Coin", "grid-cell");
      coinElement.innerHTML = `
        <div class="Coin_shadow grid-cell"></div>
        <div class="Coin_sprite grid-cell"></div>
      `;

      // Position the Element
      const left = 16 * coin.x + "px";
      const top = 16 * coin.y - 4 + "px";
      coinElement.style.transform = `translate3d(${left}, ${top}, 0)`;

      // Keep a reference for removal later and add to DOM
      coinElements[key] = coinElement;
      gameContainer.appendChild(coinElement);
    })
    allCoinsRef.on("child_removed", (snapshot) => {
      const {x,y} = snapshot.val();
      const keyToRemove = getKeyString(x,y);
      gameContainer.removeChild( coinElements[keyToRemove] );
      delete coinElements[keyToRemove];
    })


    //Updates player name with text input
    playerNameInput.addEventListener("change", (e) => {
      const newName = e.target.value || createName();
      playerNameInput.value = newName;
      playerRef.update({
        name: newName
      })
    })

    //Update player color on button click
    playerColorButton.addEventListener("click", () => {
      const mySkinIndex = playerColors.indexOf(players[playerId].color);
      const nextColor = playerColors[mySkinIndex + 1] || playerColors[0];
      playerRef.update({
        color: nextColor
      })
    })

    //Place my first coin
    placeCoin();

  }

  firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
      //You're logged in!
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      const name = createName();
      playerNameInput.value = name;

      const {x, y} = getRandomSafeSpot();


      playerRef.set({
        id: playerId,
        name,
        direction: "right",
        color: randomFromArray(playerColors),
        x,
        y,
        coins: 0,
      })

      //Remove me from Firebase when I diconnect
      playerRef.onDisconnect().remove();

      //Begin the game now that we are signed in
      initGame();
    } else {
      //You're logged out.
    }
  })

  firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });


})();
```
## References

- [Build a Multiplayer Game with JavaScript &amp; Firebase](https://www.youtube.com/watch?v=xhURh2RDzzg)
- [Multiplayer Game](https://github.com/Haddley/haddley.github.io/raw/main/firebase-multiplayer-demo-upload-4-18-22.zip)

