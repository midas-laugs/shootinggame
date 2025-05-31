const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
const ballRadius = 10;
const ballColor = "#1ef7b6";
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 2;  // Ball speed in X direction
let ballDY = -2; // Ball speed in Y direction
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

// Event listeners for keyboard input
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// Collision detection function
function collisionDetection() {
  if (ballY + ballDY < ballRadius) { // Top wall
      ballDY = -ballDY;
  }else if (ballY + ballDY > canvas.height -ballRadius) {
    if(ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballDY = -ballDY
        score++;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER! Score: " + score);
        document.location.reload(); // Restart the game
      } else {
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        ballDX = 2;
        ballDY = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
    ballDX = -ballDX;
  }

}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  ballX += ballDX;
  ballY += ballDY;

  requestAnimationFrame(draw);
}

draw();
