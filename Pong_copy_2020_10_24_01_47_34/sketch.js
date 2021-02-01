var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball,scoreSound, wall_hitSound, hitSound;


function setup() {
  
createCanvas(400,400);

userPaddle = createSprite(390,200,10,70);

computerPaddle = createSprite(10,200,10,70);

ball = createSprite(200,200,12,12);

computerScore = 0;
playerScore = 0;
gameState = "serve";
}

function draw() {  
  background("white");
  edges = createEdgeSprites();
  text(computerScore,170,20);
  text(playerScore, 230,20);

  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }

  if (gameState === "over") {
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }

  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }


  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 5;
    ball.velocityY = 5;
    gameState = "play";
  }

  userPaddle.y = World.mouseY;



  if(ball.isTouching(userPaddle)){
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  if(ball.isTouching(computerPaddle)){
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }

  if(ball.x > 400 || ball.x < 0){

  if (ball.x < 0) {
      playerScore++;
    }
    else {
      computerScore++;
    }

    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }

  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
  }

  computerPaddle.y = ball.y;
  drawSprites();
}
