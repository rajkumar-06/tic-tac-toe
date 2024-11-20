const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; 
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive || currentPlayer === 'O') return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
    if (isGameActive) {
        currentPlayer = 'O';
        aiMove();
    }
}

function aiMove() {
    const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    checkWinner();
    if (isGameActive) {
        currentPlayer = 'X'; 
    }
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const [a, b, c] = condition;

        if (board[a] === '' || board[b] === '' || board[c] === '') continue;
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        resultDisplay.textContent = `Player ${currentPlayer} wins!`;
        resultDisplay.classList.add('winner');
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        resultDisplay.textContent = "It's a draw!";
        resultDisplay.classList.remove('winner'); 
        isGameActive = false;
        return;
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    resultDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
