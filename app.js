const readline = require('readline');

// Create a readline interface (even though no user input is needed, it's used for displaying output)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game state variables
let currentPlayer = 'X'; // Player 'X' starts
let gameBoard = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];
let isGameOver = false;

// Function to display the board in the terminal
function displayBoard() {
  console.clear(); // Clear the terminal for a fresh display
  console.log(`Player ${currentPlayer}'s turn`);
  console.log('-------------');
  gameBoard.forEach(row => {
    console.log(`| ${row[0]} | ${row[1]} | ${row[2]} |`);
    console.log('-------------');
  });
}

// Function to make a random move for the current player
function makeRandomMove() {
  const availableMoves = [];
  // Find all empty cells on the board
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] === ' ') {
        availableMoves.push([i, j]);
      }
    }
  }

  // If no available moves, the game ends (tie)
  if (availableMoves.length === 0) {
    isGameOver = true;
    return;
  }

  // Randomly select an available move
  const [row, col] = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  gameBoard[row][col] = currentPlayer;
}

// Function to check if a player has won
function checkWin() {
  // Check rows, columns, and diagonals
  const winPatterns = [
    [[0, 0], [0, 1], [0, 2]], // Row 1
    [[1, 0], [1, 1], [1, 2]], // Row 2
    [[2, 0], [2, 1], [2, 2]], // Row 3
    [[0, 0], [1, 0], [2, 0]], // Column 1
    [[0, 1], [1, 1], [2, 1]], // Column 2
    [[0, 2], [1, 2], [2, 2]], // Column 3
    [[0, 0], [1, 1], [2, 2]], // Diagonal 1
    [[2, 0], [1, 1], [0, 2]]  // Diagonal 2
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a[0]][a[1]] === currentPlayer &&
           gameBoard[b[0]][b[1]] === currentPlayer &&
           gameBoard[c[0]][c[1]] === currentPlayer;
  });
}

// Function to check if the game is a tie (board full)
function checkTie() {
  return gameBoard.flat().every(cell => cell !== ' ');
}

// Function to switch players after each move
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to play the game automatically
function playGame() {
  if (isGameOver) {
    displayBoard();
    console.log("Game Over! It's a tie!");
    rl.close();
    return;
  }

  makeRandomMove();

  // Display the updated board
  displayBoard();

  if (checkWin()) {
    console.log(`Player ${currentPlayer} wins!`);
    isGameOver = true;
    rl.close();
    return;
  }

  if (checkTie()) {
    console.log("It's a tie!");
    isGameOver = true;
    rl.close();
    return;
  }

  // Switch player and continue the game
  switchPlayer();
  setTimeout(playGame, 1000); // Wait 1 second before the next move
}

// Start the game
playGame();
