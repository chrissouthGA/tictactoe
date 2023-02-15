const X_CLASS = "x";
const O_CLASS = "o";
let playerOWins = 0;
let playerXWins = 0;

const WINNING_COMBINATIONS = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
const winningMessageElement = document.getElementById("status-display");
const restartButton = document.getElementById("reset-button");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let oTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  winningMessageElement.classList.remove("show");
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  
  oTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  if (cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
    return;
  }
  const currentClass = oTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (checkDraw()) {
    endGame(true, currentClass);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    if (oTurn) {
      playerOWins++;
      winningMessageTextElement.innerText = "❤️ Wins!";
      document.getElementById("playerO").innerHTML = playerOWins;
    } else {
      playerXWins++;
      winningMessageTextElement.innerText = "🔵 Wins!";
      document.getElementById("playerX").innerHTML = playerXWins;
    }
  }
  winningMessageElement.classList.add("show");
}


function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  oTurn = !oTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function checkDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    );
  });
}