var canvas, ctx, lbl;
var interval;
window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  lbl = document.getElementById("lbl");
  document.addEventListener("keydown", keyDownEvent);

  // render X times per second
  var x = 2;
  interval = setInterval(draw, 1000 / x);
};

// game world
var gridSize = 19; // 20 x 20 = 400
var tileSize = 20;
var defaultTailSize = 3;

// snake0
var next0X = (next0Y = 0);
var tailSize0 = defaultTailSize;
var snakeTrail0 = [];
var snake0X = 5;
var snake0Y = 5;

// snake1
var next1X = (next1Y = 0);
var tailSize1 = defaultTailSize;
var snakeTrail1 = [];
var snake1X = gridSize - 6;
var snake1Y = 5;

// apple
var appleX = (appleY = Math.floor(gridSize / 2 + 1));

// draw
function draw() {
    //snake0 bite apple?
    if (snake0X == appleX && snake0Y == appleY) {
        tailSize0++;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
    }
    //snake1 bite apple?
    else if (snake1X == appleX && snake1Y == appleY) {
        tailSize1++;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
    }

  // move snake in next pos
  snake0X += next0X;
  snake0Y += next0Y;
  snake1X += next1X;
  snake1Y += next1Y;

  // snake over game world?
  if (snake0X < 0) {
    snake0X = gridSize - 1;
  }
  else if (snake0X > gridSize - 1) {
    snake0X = 0;
  }
  if (snake0Y < 0) {
    snake0Y = gridSize - 1;
  }
  else if (snake0Y > gridSize - 1) {
    snake0Y = 0;
  }

  if (snake1X < 0) {
    snake1X = gridSize - 1;
  }
  else if (snake1X > gridSize - 1) {
    snake1X = 0;
  }
  if (snake1Y < 0) {
    snake1Y = gridSize - 1;
  }
  else if (snake1Y > gridSize - 1) {
    snake1Y = 0;
  }

  //paint background
  ctx.fillStyle = "rgb(43, 43, 43)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // paint snake
  ctx.fillStyle = "green";
  for (var i = 0; i < snakeTrail0.length; i++) {
    if (snakeTrail0[i].x == snake1X && snakeTrail0[i].y == snake1Y)
    {
      lbl.innerHTML = "Green win!"
      clearInterval(interval);
    }
    ctx.fillRect(
      snakeTrail0[i].x * tileSize,
      snakeTrail0[i].y * tileSize,
      tileSize,
      tileSize
      );
    }
    ctx.fillStyle = "blue";
    for (var i = 0; i < snakeTrail1.length; i++) {
    if (snakeTrail1[i].x == snake0X && snakeTrail1[i].y == snake0Y)
    {
      lbl.innerHTML = "Blue win!"
      clearInterval(interval);
    }
    ctx.fillRect(
      snakeTrail1[i].x * tileSize,
      snakeTrail1[i].y * tileSize,
      tileSize,
      tileSize
    );
  }

  // paint apple
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  //set snake trail
  snakeTrail0.push({ x: snake0X, y: snake0Y });
  while (snakeTrail0.length > tailSize0)
    snakeTrail0.shift();

    snakeTrail1.push({ x: snake1X, y: snake1Y });
    while (snakeTrail1.length > tailSize1)
      snakeTrail1.shift();
}

// input
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 65:
        if (next0X != 1)
        {
            next0X = -1;
            next0Y = 0;
        }
      break;
    case 87:
        if (next0Y != 1)
        {
            next0X = 0;
            next0Y = -1;
        }
      break;
    case 68:
        if (next0X != -1)
        {
            next0X = 1;
            next0Y = 0;
        }
      break;
    case 83:
        if (next0Y != -1)
        {
            next0X = 0;
            next0Y = 1;
        }
      break;

    case 37:
        if (next1X != 1)
        {
            next1X = -1;
            next1Y = 0;
        }
      break;
    case 38:
        if (next1Y != 1)
        {
            next1X = 0;
            next1Y = -1;
        }
      break;
    case 39:
        if (next1X != -1)
        {
            next1X = 1;
            next1Y = 0;
        }
      break;
    case 40:
        if (next1Y != -1)
        {
            next1X = 0;
            next1Y = 1;
        }
      break;
  }
}