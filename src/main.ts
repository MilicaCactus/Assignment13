const box: NodeListOf<HTMLDivElement> = document.querySelectorAll(".box");
const statusText: HTMLHeadingElement = document.querySelector("#statusText")!;
const restartBtn: HTMLButtonElement = document.querySelector("#restartButton")!;

const winConditions: number[][] = [
    [0, 1, 2],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options: string[] = ["", "", "", "", "", "", "", "", ""];
let currentPlayer: string = "X";
let running: boolean = false;

initializeGame();

function initializeGame(): void {
    loadGameState();
    box.forEach(box => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    updateHoverEffect()
}
function boxClicked(this: HTMLDivElement): void {
    const boxIndex: string | null = this.getAttribute("data-boxindex");

    if (boxIndex === null || options[+boxIndex] !== "" || !running) {
        return;
    }

    updateBox(this, +boxIndex);
    checkWinner();
}
function updateBox(cell: HTMLDivElement, index: number): void {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.setAttribute("data-filed", "true")
    cell.removeAttribute("data-hover");
    saveGameState();
}
function changePlayer(): void {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    updateHoverEffect();
    saveGameState();
}
function checkWinner(): void {
    let roundWon: boolean = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition: number[] = winConditions[i];
        const boxA: string = options[condition[0]];
        const boxB: string = options[condition[1]];
        const boxC: string = options[condition[2]];

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
    } else if (options.some(box => box === "")) {
      changePlayer();
    } else {
        statusText.textContent = `its a draw!!!`;
        running = false;
        clearGameState
    }
}
function restartGame(): void {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    box.forEach(box => {
        box.textContent = "";
        box.removeAttribute("data-filled");
    });
    running = true;
    updateHoverEffect();
    clearGameState();
}
function updateHoverEffect(): void {
    box.forEach(cell =>{
    if (!cell.textContent) {
        cell.setAttribute("data-hover", currentPlayer);
    }else {
        cell.removeAttribute("data-hover");
    }
    });
}
function saveGameState(): void {
    localStorage.setItem("ticTacToeOptions", JSON.stringify(options));
    localStorage.setItem("ticTacToeCurrentPlayer", currentPlayer);
    localStorage.setItem("ticTacToeRunning", JSON.stringify(running));
}

function loadGameState(): void {
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

function clearGameState(): void {
    localStorage.removeItem("ticTacToeOptions");
    localStorage.removeItem("ticTacToeCurrentPlayer");
    localStorage.removeItem("ticTacToeRunning");
}
