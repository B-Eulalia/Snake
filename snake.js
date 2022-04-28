const board = document.getElementById("snakeboard");
const snakeboard_ctx = board.getContext("2d");
const board_border = 'black';
const board_background = "green";
const snake_col = 'blue';
const snake_border = 'black';
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
];
let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

main();
position_food();

function main() {
  if (conditions_game() === true) {
    finish();
  } else {
    changing_direction = false;
    setTimeout(function onTick() {
      clear_board();
      draw_food();
      move_snake();
      draw_snake();
      draw_score();
      main();
    },150)
  }
}

function clear_board() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillRect(0, 0, board.width,board.height);
  snakeboard_ctx.strokeRect(0, 0, board.width, board.height);
}

function draw_snake() {
  snake.forEach(drawSnakeSize)
}

function drawSnakeSize(snakeSize) {
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.strokestyle = snake_border;
  snakeboard_ctx.fillRect(snakeSize.x, snakeSize.y, 20, 20);
  snakeboard_ctx.strokeRect(snakeSize.x, snakeSize.y, 20, 20);
}

function conditions_game() {
  for (let i = 3; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  const hitLeftWall = snake[0].x < 1;
  const hitRightWall = snake[0].x > board.width - 30;
  const hitToptWall = snake[0].y < 1;
  const hitBottomWall = snake[0].y > board.height - 30;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function draw_food() {
  snakeboard_ctx.fillStyle = 'lightgreen';
  snakeboard_ctx.strokestyle = 'darkgreen';
  snakeboard_ctx.fillRect(food_x, food_y, 20, 20);
  snakeboard_ctx.strokeRect(food_x, food_y, 20, 20);
}
function random_food() {
  return Math.round((Math.random() * (380 - 10) + 10) / 10) * 10;
}

function position_food() {
  food_x = random_food(0, board.width - 10);
  food_y = random_food(0, board.height - 10);
  snake.forEach(function has_snake_eaten_food(part) {
    if (part.x == food_x && part.y == food_y) {
      position_food();
    }
  });
}
document.addEventListener("keydown", change_direction);
function change_direction(event) {
  if (changing_direction == false) {
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
  } else {
    return;
  }
}

function move_snake() {
  const snake_head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(snake_head);
  if (snake[0].x === food_x && snake[0].y === food_y) {
    score += 10;
    draw_score();
    position_food();
  } else {
    snake.pop();
  }
}

function draw_score() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.font = "18px Arial";
  snakeboard_ctx.fillStyle = "black";
  snakeboard_ctx.fillText("Score: "+ score, 10, 20);
}
function finish() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillStyle = 'black';
  snakeboard_ctx.font = "25px Arial";
  snakeboard_ctx.fillText("Game over",150,200);
}
