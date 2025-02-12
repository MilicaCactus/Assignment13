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
    box.forEach(box => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
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
}

function changePlayer(): void {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
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
    } else if (options.some(box => box === "")) {
      changePlayer();
    } else {
        statusText.textContent = `its a draw!!!`;
        running = false;
    }
}

function restartGame(): void {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    box.forEach(box => box.textContent = "");
    running = true;
}