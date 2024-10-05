// Snake Game Code
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.getElementById('gameOverMessage');

const tileSize = 20;
const tileCount = canvas.width / tileSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let direction = { x: 0, y: 0 };
let score = 0;
let gameOver = false;

function drawGame() {
    if (gameOver) {
        gameOverMessage.innerHTML = `Game Over! Final Score: ${score}`;
        return;
    }
    
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
    setTimeout(drawGame, 100);
}

function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        snake.push({});  // Grow snake
        score += 1;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();  // Remove the tail segment
    }
    
    snake.unshift(head);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function checkCollision() {
    const head = snake[0];

    // Check if snake hits the walls
    if (head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount) {
        gameOver = true;
    }

    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
});

drawGame(); // Start the game

// Tic Tac Toe Code
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
let currentPlayer = 'X';
let board = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
    } else if (board.every(cell => cell)) {
        gameStatus.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

document.getElementById('restartButton').addEventListener('click', restartGame);

function restartGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
}

// Age Calculator Code
document.getElementById('ageForm').addEventListener('submit', calculateAge);

function calculateAge(event) {
    event.preventDefault();

    const birthdate = new Date(document.getElementById('birthdate').value);
    const today = new Date();

    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysUntilNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    document.getElementById('ageResult').textContent = `You are ${age} years old.`;
    document.getElementById('nextBirthday').textContent = `Next birthday in ${daysUntilNextBirthday} days.`;
    document.querySelector('.result').style.opacity = 1;

    // Progress Bar
    const yearProgress = Math.floor((today.getMonth() * 30 + today.getDate()) / 365 * 100);
    document.getElementById('yearProgress').textContent = `Year progress: ${yearProgress}%`;
    document.querySelector('.progress').style.width = `${yearProgress}%`;
}
