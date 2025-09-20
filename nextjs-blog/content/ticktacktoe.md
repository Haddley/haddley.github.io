---
title: "Multiplayer Tick-Tack-Toe"
description: "A comprehensive guide covering multiplayer tick-tack-toe"
date: "2025-09-20"
category: "Development"
image: "/assets/images/logo-lockup-firebase-vertical.svg"
tags: ["javascript","java","database","ai","ml"]
---

# Multiplayer Tick-Tack-Toe

## Multiplayer Tick-Tack-Toe

![](/assets/images/ticktacktoe/logo-lockup-firebase-vertical.svg)
*This file is licensed under the Creative Commons Attribution 4.0 International license.*


## Creating a new firebase project

I asked ChatGPT for some help creating a multiplayer version of Tick-Tack-Toe.


## ChatGPT

**How would I write a multiplayer tick-tack-toe game with Firebase Realtime Database, HTML, CSS and JavaScript?**

To write a multiplayer tic-tac-toe game with Firebase Realtime Database, HTML, CSS, and JavaScript, you can follow these general steps:

1. Set up a Firebase account and create a new project.
2. Create a new Firebase Realtime Database in your project.
3. Create an HTML file with the tic-tac-toe game board and UI elements. You can use CSS to style the board and UI elements.
4. Write JavaScript code to connect to your Firebase Realtime Database and set up the game logic.
5. When a player makes a move, update the game state in the database.
6. Listen for changes to the game state in the database and update the UI accordingly.
7. Implement game logic to detect a win or a tie and update the database and UI accordingly.

Here's an example implementation of the above steps:

...

![](/assets/images/ticktacktoe/screen-shot-2023-05-09-at-2.56.33-pm-1802x844.png)
*project name*

![](/assets/images/ticktacktoe/screen-shot-2023-05-09-at-2.57.24-pm-1804x874.png)
*google analytics?*

![](/assets/images/ticktacktoe/screen-shot-2023-05-09-at-2.58.10-pm-1690x910.png)
*project is ready*

![](/assets/images/ticktacktoe/screen-shot-2023-05-09-at-3.03.30-pm-1836x913.png)
*add web app*

![](/assets/images/ticktacktoe/screen-shot-2023-05-09-at-3.04.16-pm-1836x977.png)
*sdk setup*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.17.39-am-1836x567.png)
*Add Realtime Database*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.18.28-am-1836x530.png)
*create databse*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.19.05-am-1836x634.png)
*database location*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.19.16-am-1836x783.png)
*security rules (authentication is not enabled yet)*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.19.37-am-1836x571.png)
*Realtime Database is empty*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-8.57.48-am-1366x828.png)
*example implementation*

![](/assets/images/ticktacktoe/screen-shot-2023-05-09-at-5.41.12-pm-1142x274.png)
*create a folder*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-12.00.13-pm-1836x643.png)
*Open with Live Server*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.38.28-am-1836x1189.png)
*code running locally*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.41.28-am-1836x1156.png)
*firebase init*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.42.33-am-1836x465.png)
*firebase deploy*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.44.06-am-1598x1100.png)
*public folder has been uploaded to firebase*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.45.53-am-1460x542.png)
*copy the html, css and javascript files to the public folder*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-9.46.35-am-1836x1189.png)
*code has been deployed to Firebase (access using https://haddley-tick-tack-toe.web.app/)*


## Adding authentication

**How do we know which player is which?**

To differentiate between players and determine which player made a move, you can incorporate user authentication into your tic-tac-toe game. Firebase Authentication can be utilized to handle user sign-up, sign-in, and tracking the current user.

Here's an updated version of the makeMove function that incorporates user authentication:

...

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-12.00.57-pm-1836x625.png)
*dashboard*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-12.01.09-pm-1836x450.png)
*authentication*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-12.01.20-pm-1836x764.png)
*Anonymous*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-12.01.30-pm-1836x729.png)
*Anonymous Enabled*


## ChatGPT's commentary

This code initializes and sets up a tic-tac-toe game using Firebase as the backend database. Here's an explanation of the code:

1. Firebase Configuration: The code defines the configuration object firebaseConfig that contains the necessary credentials and configuration options for connecting to the Firebase project.
2. Firebase Initialization: The code initializes Firebase using the provided configuration object by calling firebase.initializeApp(firebaseConfig).
3. Anonymous Authentication: The code signs in the user anonymously by calling firebase.auth().signInAnonymously(). This allows the user to play the game without requiring any authentication.
4. Database Reference: The code obtains a reference to the Firebase Realtime Database service by calling firebase.database(). This reference will be used to interact with the game state data in the database.
5. Game State: The code defines the initial game state and related constants. The gameState object stores information such as the current player, the game board, and the game status.
6. UI Elements: The code retrieves references to various elements in the HTML document that represent the game board and the status message.
7. Update UI: The updateUI() function is responsible for updating the user interface based on the current game state. It updates the game board cells and the status message.
8. Make Move: The makeMove(row, col) function is called when a user clicks on a game board cell. It checks if the game is still in progress, verifies the user's turn, and updates the game board if the move is valid. It also checks for a win or draw condition and updates the game state accordingly.
9. Win Condition: The hasPlayerWon(player) function checks if a player has won the game by examining the game board.
10. Board Full Condition: The isBoardFull() function checks if the game board is full and there is no winner, resulting in a draw.
11. Reset Game: The resetGame() function resets the game state to the default values and updates the database with the new state.
12. Initialize Game: The initGame() function sets up event listeners for the game board cells and the reset button. It also listens for changes in the game state data in the database and updates the local game state and UI accordingly.
13 DOMContentLoaded Event: The initGame() function is called when the DOM (Document Object Model) is fully loaded, ensuring that the game setup is performed when the page is ready.

Overall, this code provides the functionality for playing a tic-tac-toe game in a web browser using Firebase for real-time updates and synchronization of the game state between multiple players.

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-3.06.41-pm-1836x1175.png)
*updated code*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-3.10.52-pm-1452x540.png)
*firebase deploy*

![](/assets/images/ticktacktoe/screen-shot-2023-05-10-at-3.14.17-pm-1836x1248.png)
*deployed*
