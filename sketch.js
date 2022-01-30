var PLAY=1;
var END=0;
var gameState = PLAY;
var running_girl_1,running_girl_2,running_girl_3,running_girl_4;
var my_game;
var my_game_ball;
var my_game_crab;
var my_game_sheshell;
var start_game;
var game_over;
var restart;

function preload(){
girl_runing= loadAnimation("running_girl_1.gif","running_girl_2.gif","running_girl_3.gif","running_girl_4.gif");
backgroundImg=loadImage("my_game.gif");
obstacle1Img=loadImage("my_game_ball.gif");
obstacle2Img=loadImage("my_game_crab.gif");
obstacle3Img=loadImage("my_game_sheshell.gif");
restartImg=loadImage("start_game.gif");
gameOverImg=loadImage("game_over.gif");

}

function setup(){
createCanvas(700,300);


background=createSprite(0,190,1200,10);
background.addImage(backgroundImg);
background.x=background.width/2;


girl=createSprite(50,180,20,50);
girl.addAnimation("girl_running",girl_runing);
girl.scale = 0.5;


ground = createSprite(10, 280,600, 50);
ground.velocityX=-6;


restart = createSprite(300,140);
restart.addImage(restartImg);
restart.scale=0.5;
restart.visible=false;

obstaclesGroup= new Group();
score=0;
life=3;

}



function draw(){
    textSize(20);
fill(255);
text("Score:"+ score,500,40);
text("Life:"+ life,500,60);

    if (gameState===PLAY){
        // score = score + Math.round(getFrameRate()/60);
        if(score>=0){
            ground.velocityX= -6;
        }
        {
            ground.velocityX=-(6+3*score/100);
        }


        if (keyDown("space")&& girl.y>=139){
            girl.velocityY=-15;
        }
        girl.velocityY=girl.velocityY + 0.8;


        if(ground.x <0){
            ground.x=ground.width/2;
        }
        




    spawnObstacles();

    if (obstaclesGroup.isTouching(girl)){
        life=life-1;
        gameState=END;
    }
    
} else if (gameState===END){
    restart.visible=true;
    text("restart",280,170);
    girl.addAnimation("collided",girl_collided);

    //set velcity of each game object to 0 
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    girl.changeAnimation("collided", girl_collided);
    girl.scale = 0.35;
    obstaclesGroup.setLifetimeEach(-1);
    if (mousePressedOver(restart)) {
        if (life > 0) {
          reset();
        }
  
      }
}

girl.collide(ground);
drawSprites();
}

function spawnObstacles(){
    if(frameCount%60===0){
        var obstacle=createSprite(600,165,10,40);
        var rand=Math.round(random(1,3));
        switch(rand){
            case 1:
         obstacle.addImage(obstacle1);
         break;
case 2:
         obstacle.addImage(obstacle2);
         break;
         case 3:
         obstacle.addImage(obstacle3);
         break;
        }
        obstacle.velocityX=-(6+3*score/100);
        obstacle.scale=0.2;
        obstacle.lifetime=300;
        obstaclesGroup.add(obstacle);

    }
}



function reset(){
    gameState=PLAY;
    restart.visible=false;

    obstaclesGroup.destroyEach();
    if(localStorage["HighestScore"]<score){
        localStorage["HighestScore"]=score;

    }
    score=0;

}

