const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(".cell");
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
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(this: HTMLDivElement): void {
    const cellIndex: string | null = this.getAttribute("cellIndex");

    if (cellIndex === null || options[+cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, +cellIndex);
    checkWinner();
}

function updateCell(cell: HTMLDivElement, index: number): void {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(): void {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(): void {
    let roundWon: boolean = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition: number[] = winConditions[i];
        const cellA: string = options[condition[0]];
        const cellB: string = options[condition[1]];
        const cellC: string = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!!!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `It's a draw!!! `;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame(): void {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}