const gameBoard = document.getElementById('game');
const gameTimeDisplay = document.getElementById('time-header');
const resultDisplay = document.getElementById('result-header');
const gameDurationInput = document.getElementById('game-time');
const startButton = document.getElementById('start');

let timeLeft, clickCount = 0, gameInterval, endTime;

startButton.addEventListener('click', () => {
    resetGame();
    timeLeft = (parseFloat(gameDurationInput.value) || 10) * 1000;
    endTime = Date.now() + timeLeft;
    updateTimer();
    gameInterval = setInterval(updateTimer, 10);
    createSquare();
    gameTimeDisplay.style.display = 'block';
});

function resetGame() {
    clickCount = 0;
    gameBoard.innerHTML = '';
    resultDisplay.style.display = 'none';
    startButton.style.display = 'none';
}

function updateTimer() {
    timeLeft = endTime - Date.now();
    gameTimeDisplay.textContent = `Время игры: ${(timeLeft / 1000).toFixed(2)}`;
    if (timeLeft <= 0) endGame();
}

function endGame() {
    clearInterval(gameInterval);
    resultDisplay.style.display = 'block';
    gameTimeDisplay.style.display = 'none';
    resultDisplay.textContent = `Ваш результат: ${clickCount} `;
    startButton.style.display = 'block';
}

function createSquare() {
    const kvadr = document.createElement('div');
    kvadr.className = 'kvadr';
    randomizeSquare(kvadr);
    kvadr.onclick = () => {
        clickCount++;
        kvadr.style.backgroundColor = randomColor();
        kvadr.style.width = kvadr.style.height = randomSize() + 'px';
        randomizeSquare(kvadr);
    };
    gameBoard.appendChild(kvadr);
}

function randomizeSquare(kvadr) {
    const { clientWidth: w, clientHeight: h } = gameBoard;
    kvadr.style.top = `${Math.random() * (h - kvadr.clientHeight)}px`;
    kvadr.style.left = `${Math.random() * (w - kvadr.clientWidth)}px`;
}

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
const randomSize = () => Math.random() * 70 + 30;
