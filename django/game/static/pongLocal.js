 canvas = document.getElementById('gameCanvas');
 ctx = canvas.getContext('2d');

// Game variables
 paddleWidth = 10;
 paddleHeight = 100;
 ballRadius = 10;

 paddle1Y = (canvas.height - paddleHeight) / 2;
 paddle2Y = (canvas.height - paddleHeight) / 2;
 ballX = canvas.width / 2;
 ballY = canvas.height / 2;
 ballSpeedX = 5;
 ballSpeedY = 3;

 upPressed = false;
 downPressed = false;
 wPressed = false;
 sPressed = false;

 gameStarted = false;

 score1 = 0;
 score2 = 0;

 scoreBoard = document.createElement('div');
scoreBoard.id = 'scoreBoard';

 leftScoreSpan = document.createElement('span');
leftScoreSpan.id = 'leftScore';
 rightScoreSpan = document.createElement('span');
rightScoreSpan.id = 'rightScore';
scoreBoard.appendChild(leftScoreSpan);
scoreBoard.appendChild(rightScoreSpan);
leftScoreSpan.style.float = 'left';
rightScoreSpan.style.float = 'right';

scoreBoard.style.color = 'white';
scoreBoard.style.fontSize = '24px';
scoreBoard.style.textAlign = 'center';
scoreBoard.style.marginBottom = '10px';
document.getElementById('game-container').insertBefore(scoreBoard, canvas);

// Game over message
 gameOverMessage = document.createElement('div');
gameOverMessage.id = 'gameOverMessage';
gameOverMessage.style.fontSize = '32px';
gameOverMessage.style.textAlign = 'center';
gameOverMessage.style.display = 'none';
document.getElementById('game-container').appendChild(gameOverMessage);

// Event listeners for key presses
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowUp') {
        upPressed = true;
    } else if (e.key === 'ArrowDown') {
        downPressed = true;
    } else if (e.key === 'w' || e.key === 'W') {
        wPressed = true;
    } else if (e.key === 's' || e.key === 'S') {
        sPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp') {
        upPressed = false;
    } else if (e.key === 'ArrowDown') {
        downPressed = false;
    } else if (e.key === 'w' || e.key === 'W') {
        wPressed = false;
    } else if (e.key === 's' || e.key === 'S') {
        sPressed = false;
    }
}

function startGame() {
    document.getElementById('waiting-room').style.display = 'none'; // Hide waiting room
    document.getElementById('game-container').style.display = 'block'; // Show game

    gameOverMessage.style.display = 'none'; // Hide game over message
    score1 = 0;
    score2 = 0;
    updateScoreBoard();

    gameStarted = true;
    requestAnimationFrame(draw); // Start the game loop
}

function updateScoreBoard() {
    document.getElementById('leftScore').textContent = `Player 1: ${score1}`;
    document.getElementById('rightScore').textContent = `Player 2: ${score2}`;
}

var requestID_animation;
function draw() {
    if (!gameStarted) return;
    
    leftScore=document.getElementById('leftScore');
    if(!leftScore){
        window.cancelAnimationFrame(requestID_animation);
        requestID_animation=null;
        return;
    }
        

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = '#FFFFFF';

    // Paddle 1
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);

    // Paddle 2
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();

    // Draw borders
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with player 1 paddle
    if (
        ballX - ballRadius < paddleWidth &&
        ballY > paddle1Y &&
        ballY < paddle1Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball collision with player 2 paddle
    if (
        ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > paddle2Y &&
        ballY < paddle2Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball goes off screen (left or right)
    if (ballX - ballRadius < 0) {
        score2++; // Player 2 scores
        resetBall();
    }
    if (ballX + ballRadius > canvas.width) {
        score1++; // Player 1 scores
        resetBall();
    }

    // Update the score
    updateScoreBoard();

    // Check for game over
    if (score1 >= 3 || score2 >= 3) {
        gameOver();
        return;
    }

    // Move player 1 paddle based on key presses (W and S)
    if (wPressed && paddle1Y > 0) {
        paddle1Y -= 7;
    } else if (sPressed && paddle1Y + paddleHeight < canvas.height) {
        paddle1Y += 7;
    }

    // Move player 2 paddle based on key presses (Arrow Up and Arrow Down)
    if (upPressed && paddle2Y > 0) {
        paddle2Y -= 7;
    } else if (downPressed && paddle2Y + paddleHeight < canvas.height) {
        paddle2Y += 7;
    }
    
    requestID_animation=requestAnimationFrame(draw);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Change direction
    ballSpeedY = Math.random() > 0.5 ? 3 : -3; // Randomize the Y direction
}

function gameOver() {
    gameStarted = false;
    gameOverMessage.textContent =
        score1 >= 5 ? 'Player 1 Wins!' : 'Player 2 Wins!';
    gameOverMessage.style.display = 'block';

    // Apply styles to center the game over message
    gameOverMessage.style.position = 'absolute';
    gameOverMessage.style.top = '50%';
    gameOverMessage.style.left = '50%';
    gameOverMessage.style.transform = 'translate(-50%, -50%)';
    gameOverMessage.style.display = 'flex';
    gameOverMessage.style.alignItems = 'center';
    gameOverMessage.style.justifyContent = 'center';
    gameOverMessage.style.width = '100%';
    gameOverMessage.style.height = '100%';
    gameOverMessage.style.color = 'white';

    // Optionally redirect or reset the game
    setTimeout(function () {
        window.location.href = '/game/lobby/';
    }, 3000);
}

// Start the game immediately
startGame();
