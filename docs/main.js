const box = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartButton");
const winConditions = [
  [0, 1, 2],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initializeGame();
function initializeGame() {
  loadGameState();
  box.forEach((box2) => box2.addEventListener("click", boxClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
  updateHoverEffect();
}
function boxClicked() {
  const boxIndex = this.getAttribute("data-boxindex");
  if (boxIndex === null || options[+boxIndex] !== "" || !running) {
    return;
  }
  updateBox(this, +boxIndex);
  checkWinner();
}
function updateBox(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.setAttribute("data-filed", "true");
  cell.removeAttribute("data-hover");
  saveGameState();
}
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
  updateHoverEffect();
  saveGameState();
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const boxA = options[condition[0]];
    const boxB = options[condition[1]];
    const boxC = options[condition[2]];
    if (boxA === "" || boxB === "" || boxC === "") {
      continue;
    }
    if (boxA === boxB && boxB === boxC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!!!`;
    running = false;
    clearGameState();
  } else if (options.some((box2) => box2 === "")) {
    changePlayer();
  } else {
    statusText.textContent = `its a draw!!!`;
    running = false;
    clearGameState;
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  box.forEach((box2) => {
    box2.textContent = "";
    box2.removeAttribute("data-filled");
  });
  running = true;
  updateHoverEffect();
  clearGameState();
}
function updateHoverEffect() {
  box.forEach((cell) => {
    if (!cell.textContent) {
      cell.setAttribute("data-hover", currentPlayer);
    } else {
      cell.removeAttribute("data-hover");
    }
  });
}
function saveGameState() {
  localStorage.setItem("ticTacToeOptions", JSON.stringify(options));
  localStorage.setItem("ticTacToeCurrentPlayer", currentPlayer);
  localStorage.setItem("ticTacToeRunning", JSON.stringify(running));
}
function loadGameState() {
  const savedOptions = localStorage.getItem("ticTacToeOptions");
  const savedCurrentPlayer = localStorage.getItem("ticTacToeCurrentPlayer");
  const savedRunning = localStorage.getItem("ticTacToeRunning");
  if (savedOptions && savedCurrentPlayer && savedRunning) {
    options = JSON.parse(savedOptions);
    currentPlayer = savedCurrentPlayer;
    running = JSON.parse(savedRunning);
    box.forEach((cell, index) => {
      cell.textContent = options[index];
      if (options[index]) {
        cell.setAttribute("data-filled", "true");
      } else {
        cell.removeAttribute("data-filled");
      }
    });
    statusText.textContent = `${currentPlayer}'s turn`;
    updateHoverEffect();
  }
}
function clearGameState() {
  localStorage.removeItem("ticTacToeOptions");
  localStorage.removeItem("ticTacToeCurrentPlayer");
  localStorage.removeItem("ticTacToeRunning");
}
//# sourceMappingURL=main.js.map
