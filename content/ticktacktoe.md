---
title: "Multiplayer Tick-Tack-Toe"
description: "Creating a new firebase project"
date: "2023-05-10"
categories: ["Firebase"]
tags: ""
slug: "ticktacktoe"
image: "/assets/images/ticktacktoe/logo-lockup-firebase-vertical.svg"
---


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


## SDK setup

```text
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAw86TBoGMBkdTHnhs28zKCiVvvkNEcPqM",
    authDomain: "haddley-tick-tack-toe.firebaseapp.com",
    projectId: "haddley-tick-tack-toe",
    storageBucket: "haddley-tick-tack-toe.appspot.com",
    messagingSenderId: "762869781957",
    appId: "1:762869781957:web:02d5bd65bd1d1661dc27ac"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
```

## index.html

```text
<!DOCTYPE html>
<html>
  <head>
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Tic Tac Toe</h1>
    <div id="board">
      <div class="row">
        <div class="cell" id="cell00"></div>
        <div class="cell" id="cell01"></div>
        <div class="cell" id="cell02"></div>
      </div>
      <div class="row">
        <div class="cell" id="cell10"></div>
        <div class="cell" id="cell11"></div>
        <div class="cell" id="cell12"></div>
      </div>
      <div class="row">
        <div class="cell" id="cell20"></div>
        <div class="cell" id="cell21"></div>
        <div class="cell" id="cell22"></div>
      </div>
    </div>
    <div id="status"></div>
    <button id="reset">Reset</button>

    <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-database.js"></script>
    <script src="app.js"></script>
  </body>
</html>
```

## style.css

```text
#board {
    display: flex;
    flex-direction: column;
  }
  
  .row {
    display: flex;
    flex-direction: row;
  }
  
  .cell {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    cursor: pointer;
  }
  
  .cell:hover {
    background-color: #f1f1f1;
  }
  
  #status {
    margin-top: 20px;
    font-size: 24px;
  }
  
  #reset {
    margin-top: 20px;
  }
```

## app.js

```text
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAw86TBoGMBkdTHnhs28zKCiVvvkNEcPqM",
    authDomain: "haddley-tick-tack-toe.firebaseapp.com",
    projectId: "haddley-tick-tack-toe",
    storageBucket: "haddley-tick-tack-toe.appspot.com",
    messagingSenderId: "762869781957",
    appId: "1:762869781957:web:02d5bd65bd1d1661dc27ac"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Game state
let gameState = {
    currentPlayer: 'X',
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
};

// Game board elements
const boardCells = [
    document.getElementById('cell00'),
    document.getElementById('cell01'),
    document.getElementById('cell02'),
    document.getElementById('cell10'),
    document.getElementById('cell11'),
    document.getElementById('cell12'),
    document.getElementById('cell20'),
    document.getElementById('cell21'),
    document.getElementById('cell22'),
];


// Update the UI with the current game state
function updateUI() {
    const { board, currentPlayer } = gameState;

    // Update each cell on the board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.getElementById(`cell${i}${j}`);
            cell.textContent = board[i][j];
        }
    }

    // Update the status message
    const statusElement = document.getElementById('status');
    statusElement.textContent = `Current Player: ${currentPlayer}`;
}

// Make a move
function makeMove(row, col) {
    const { board, currentPlayer } = gameState;

    // Check if the selected cell is empty
    if (board[row][col] === '') {
        // Update the board with the current player's symbol
        board[row][col] = currentPlayer;

        // Check if the current player has won
        if (hasPlayerWon(currentPlayer)) {
            alert(`Player ${currentPlayer} has won!`);
            resetGame();
        } else {
            // Check if the board is full
            if (isBoardFull()) {
                alert('The game is a draw!');
                resetGame();
            } else {
                // Switch to the other player
                gameState.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        // Update the game state in the database
        database.ref('gameState').set(gameState);
    }
}

// Check if a player has won
function hasPlayerWon(player) {
    const { board } = gameState;
  
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return true;
      }
    }
  
    // Check columns
    for (let j = 0; j < 3; j++) {
      if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
        return true;
      }
    }
  
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }
  
    return false;
  }

  

// Check if the game board is full
function isBoardFull() {
    const { board } = gameState;
  
    // Check each cell on the board
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          return false;
        }
      }
    }
  
    return true;
  }
  

// Reset the game
function resetGame() {
    // Reset the game state
    gameState = {
        currentPlayer: 'X',
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
    };

    // Clear the board in the database
    database.ref('gameState').set(gameState);
}

// Initialize the game
function initGame() {
    // Attach click event listeners to each cell
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const row = Math.floor(i / 3);
        const col = i % 3;
        cell.addEventListener('click', () => makeMove(row, col));
    }

    // Attach click event listener to the reset button
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetGame);

    // Listen for changes in the game state
    database.ref('gameState').on('value', (snapshot) => {
        const gameStateFromLiveDatabase = snapshot.val();
        if (gameStateFromLiveDatabase) {
            gameState = gameStateFromLiveDatabase;
        }
        updateUI();
    });
}

// Call the initGame function when the DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
```

## Security Rules updated

```text
{
  "rules": {
    "gameState": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## index.html updated

```text
<!DOCTYPE html>
<html>

<head>
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <h1>Tic Tac Toe</h1>
    <div id="board">
        <div class="row">
            <div class="cell" id="cell00"></div>
            <div class="cell" id="cell01"></div>
            <div class="cell" id="cell02"></div>
        </div>
        <div class="row">
            <div class="cell" id="cell10"></div>
            <div class="cell" id="cell11"></div>
            <div class="cell" id="cell12"></div>
        </div>
        <div class="row">
            <div class="cell" id="cell20"></div>
            <div class="cell" id="cell21"></div>
            <div class="cell" id="cell22"></div>
        </div>
    </div>
    <div id="whoami"></div>
    <div id="status"></div>
    <button id="reset">Reset</button>

    <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-database.js"></script>
    <script src="app.js"></script>
</body>

</html>
```

## style.css updated

```text
#board {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
}

.cell {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    cursor: pointer;
}

.cell:hover {
    background-color: #f1f1f1;
}

#status {
    margin-top: 20px;
    font-size: 24px;
}

#whoami {
    margin-top: 20px;
    font-size: 24px;
}

#reset {
    margin-top: 20px;
}
```

## app.js updated

```text
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAw86TBoGMBkdTHnhs28zKCiVvvkNEcPqM",
    authDomain: "haddley-tick-tack-toe.firebaseapp.com",
    projectId: "haddley-tick-tack-toe",
    storageBucket: "haddley-tick-tack-toe.appspot.com",
    messagingSenderId: "762869781957",
    appId: "1:762869781957:web:02d5bd65bd1d1661dc27ac"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Sign in anonymously
firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
});

// Get a reference to the database service
const database = firebase.database();

// Game state
let gameState;
const states = {
    Playing: "playing",
    XWon: "xwon",
    OWon: "owon",
    Draw: "draw"
};

const defaultGameState = {
    hostUID: null, // Replace with actual host user's UID
    currentPlayer: 'X',
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    status: states.Playing
};

// Game board elements
const boardCells = [
    document.getElementById('cell00'),
    document.getElementById('cell01'),
    document.getElementById('cell02'),
    document.getElementById('cell10'),
    document.getElementById('cell11'),
    document.getElementById('cell12'),
    document.getElementById('cell20'),
    document.getElementById('cell21'),
    document.getElementById('cell22'),
];

// Update the UI with the current game state
function updateUI() {
    const { board, currentPlayer, status, hostUID } = gameState;

    // Update each cell on the board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.getElementById(`cell${i}${j}`);
            cell.textContent = board[i][j];
        }
    }

    // Update the status message
    const statusElement = document.getElementById('status');
    switch (status) {
        case states.XWon:
            statusElement.textContent = `Player X has won!`;
            break;
        case states.OWon:
            statusElement.textContent = `Player O has won!`;
            break;
        case states.Draw:
            statusElement.textContent = `The game is a draw!`;
            break;
        case states.Playing:
        default:
            statusElement.textContent = `Current Player: ${currentPlayer}`;
    }

    const user = firebase.auth().currentUser;
    const whoAmIElement = document.getElementById('whoami');
    if (user.uid === hostUID) {
        whoAmIElement.textContent = `You are X`;
    } else {
        whoAmIElement.textContent = `You are O`;
    }
}

// Make a move
function makeMove(row, col) {
    const { board, currentPlayer, hostUID, status } = gameState;

    if (status !== states.Playing) {
        // The game is over, ignore the move
        return;
    }

    const user = firebase.auth().currentUser;
    if (!user) {
        // User is not authenticated, handle the authentication requirement
        console.log("Please sign in or create an account to play.");
        return;
    }

    if ((user.uid === hostUID && currentPlayer === 'X') || (user.uid !== hostUID && currentPlayer === 'O')) {
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;

            if (hasPlayerWon(currentPlayer)) {
                console.log(`Player ${currentPlayer} has won the game!`);
                gameState.status = currentPlayer === 'X' ? states.XWon : states.OWon;
            } else if (isBoardFull()) {
                console.log("It's a tie!");
                gameState.status = states.Draw;
            } else {
                gameState.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }

            database.ref('gameState').set(gameState);
        }
    } else {
        console.log("It's not your turn.");
    }
}

// Check if a player has won
function hasPlayerWon(player) {
    const { board } = gameState;

    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
            return true;
        }
    }

    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true;
    }

    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true;
    }

    return false;
}

// Check if the game board is full
function isBoardFull() {
    const { board } = gameState;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }

    return true;
}

// Reset the game
function resetGame() {
    gameState = defaultGameState;
    gameState.hostUID = firebase.auth().currentUser.uid;
    database.ref('gameState').set(gameState);
}

// Initialize the game
function initGame() {
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const row = Math.floor(i / 3);
        const col = i % 3;
        cell.addEventListener('click', () => makeMove(row, col));
    }

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetGame);

    database.ref('gameState').on('value', (snapshot) => {
        const gameStateFromLiveDatabase = snapshot.val();

        if (!gameStateFromLiveDatabase) {
            gameState = defaultGameState;
            gameState.hostUID = firebase.auth().currentUser.uid;
            database.ref('gameState').set(gameState);
            return;
        }

        gameState = gameStateFromLiveDatabase;
        updateUI();
    });
}

// Call the initGame function when the DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
```