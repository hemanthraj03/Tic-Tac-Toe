const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');

const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

/**Game state */
let isXTurn = true;
let gameActive = true;
let boardState = Array(9).fill(null);
let score = { X: 0, O: 0 };


/*******  Define winning combinations (rows, columns, diagonals) to check for a win   ***********/

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/**Check if the current player has won the game */
function handleClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] || !gameActive) {
    return;
  }


 /**********Update the board state and UI: set the cell to 'X' or 'O' based on the current turn */
  boardState[cellIndex] = isXTurn ? 'X' : 'O';
  cell.textContent = boardState[cellIndex];


  /**Check if the current move wins the game or if it's a draw */
  if (checkWin()) {
    /**Call endGame function with 'false' to indicate no draw */
    endGame(false);
  } else if (boardState.every(cell => cell)) {
    /**If all cells are filled and no winner, it's a draw */
    endGame(true);
  } else {
    /**If no winner or draw, switch turn to the other player and update the message */
    isXTurn = !isXTurn;
    messageElement.textContent = isXTurn ? "Player X's turn" : "Player O's turn";
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] && boardState[index] === boardState[combination[0]];
    });
  });
}
/**Ends the game either with a win or a draw */
function endGame(draw) {
  if (draw) {
    messageElement.textContent = "It's a draw!";
  } else {
    messageElement.textContent = `${isXTurn ? 'Player X' : 'Player O'} wins!`;
    score[isXTurn ? 'X' : 'O']++;
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
  }
  gameActive = false;
}
/**Resets the game board for another round, but retains the scores */
function restartGame() {
  isXTurn = true;
  gameActive = true;
  boardState.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  messageElement.textContent = "Player X's turn";
}

function startGame() {
    window.location.reload() 
  }

  

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});
/**restart button to reset the game board without resetting scores */
restartButton.addEventListener('click', restartGame);
/**start button to reload the entire game, including scores */
startButton.addEventListener('click', startGame);
