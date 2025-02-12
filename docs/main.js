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
  box.forEach((box2) => box2.addEventListener("click", boxClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
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
}
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
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
  } else if (options.some((box2) => box2 === "")) {
    changePlayer();
  } else {
    statusText.textContent = `its a draw!!!`;
    running = false;
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  box.forEach((box2) => box2.textContent = "");
  running = true;
}
//# sourceMappingURL=main.js.map
