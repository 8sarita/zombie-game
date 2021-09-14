var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie , zombieImg;
var zombieGroup;
var wall1 ,wall2;
var bullet, bulletImg , bulletGroup;

var PLAY  = 1 ;
var WON  = 3;


// means running out of bullet 
var ROB = 2;

var END  = 0 ;

var gameState = 1;

var score ;

var lifeCount;

var life1  , life2, life3;
var life1Img ,life2Img ,life3Img;

var bulletLimit;

var kill , win , lose;



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  bulletImg = loadImage("assets/bullet.png");
  life1Img = loadImage("assets/heart_1.png");
  life2Img = loadImage("assets/heart_2.png");
  life3Img = loadImage("assets/heart_3.png");
  win = loadSound("assets/win.mp3");
  lose = loadSound("assets/lose.mp3");
  kill = loadSound("assets/explosion.mp3");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1 ;
  

  //creating the player sprite
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  //  player.debug = true ;
   player.setCollider("rectangle",0,0,300,300);


   wall1 = createSprite(500,10,displayWidth,10);

   wall2 = createSprite(500,600,displayWidth,10);

   wall3 = createSprite(0,displayHeight/2,5,1000);

    wall1.visible = false
    wall2.visible = false
    wall3.visible = false


    life1 = createSprite(width-200 , 50);
    life2 = createSprite(width-150 , 50);
    life3 = createSprite(width-100 , 50);

    life1.addImage(life1Img);
    life2.addImage(life1Img);
    life3.addImage(life1Img);

    life1.scale = 0.2;
    life2.scale = 0.2;
    life3.scale = 0.2;

   zombieGroup = new Group();
   bulletGroup = new Group();

   score = 0;
   lifeCount = 3;
   bulletLimit = 90;


}

function draw() {
  background(0); 

   player.collide(wall1);
   player.collide(wall2);

  if(gameState === 1){

    console.log(lifeCount);

    if(lifeCount === 0){

      gameState= 0;

    }

    if(bulletLimit === 0){

      gameState= 2;

    }

    if(score === 100){

      gameState= 3;
      win.play();

    }

    


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-20
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+20
}
if(keyDown("LEFT_ARROW")||touches.length>0 || player.x >= 300){
  player.x = player.x-20
}
if(keyDown("RIGHT_ARROW")||touches.length>0 || player.x  >= 300){
  player.x = player.x+20
}

spawnZombie(); 

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  bulletLimit= bulletLimit-1;
  player.addImage(shooter_shooting)
  spawnbullet();
 
}

if(zombieGroup.isTouching(player)){

  

  for(var i = 0; i < zombieGroup.length; i++){

    if(zombieGroup[i].isTouching(player)){
    
      zombieGroup[i].destroy();
     

    
      lifeCount = lifeCount-1;
    }
    }
    
}

if(lifeCount === 2){

  life3.y =  -100;

}

if(lifeCount === 1){

  life2.y =-100;

}

if(lifeCount === 0){

  life1.y =  -100;

}



//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){

  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(bulletGroup)){
  
  kill.play();

for(var i = 0; i < zombieGroup.length; i++){

if(zombieGroup[i].isTouching(bulletGroup)){

  zombieGroup[i].destroy();
  bulletGroup.destroyEach();

  score = score+2 ;


 }
 }

 }
 }





  if(gameState === 0){

    zombieGroup.setVelocityXEach(0);
    bulletGroup.setVelocityXEach(0);
    
    zombieGroup.setLifetimeEach(-1);
    bulletGroup.setLifetimeEach(-1);
    
  }

  if(gameState === 3){

    zombieGroup.setVelocityXEach(0);
    bulletGroup.setVelocityXEach(0);
    
    zombieGroup.setLifetimeEach(-1);
    bulletGroup.setLifetimeEach(-1);

    life1.y =50;
    life2.y = 50;
    life3.y = 50;
    

  }

  if(keyDown("r") && gameState === 3){

    reset();
    score =0;
   lifeCount = 3;
   bulletLimit = 90;
   zombieGroup.destroyEach();
   bulletGroup.destroyEach();

   life1.y = width-200;
   life2.y = width-150;
   life3.y = width-100;

  }
  
  if(keyDown("r") && gameState === 2){

    reset();
    score =0;
    lifeCount = 3;
    bulletLimit = 90;
    zombieGroup.destroyEach();
   bulletGroup.destroyEach();
   
   life1.y =50;
   life2.y = 50;
   life3.y = 50;
  }

  if(keyDown("r") && gameState === 0){

    reset();
    score =0;
    lifeCount = 3;
    bulletLimit = 90;
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();

    life1.y =50;
    life2.y = 50;
    life3.y = 50;
  }  


  



  if(zombieGroup.isTouching(wall3)){

    gameState = 0;
    lose.play();
  }
  

  


     player.collide(wall3);

    






 









drawSprites();
if(gameState === 0){

  fill("red");
  textSize(20);
  text(" YOU LOST ! "  , displayWidth/2,displayHeight/2);

}

if(gameState === 2){

    
  fill("yellow");
  textSize(30);
  text(" OOPS! YOU ARE RUNNING OUT OF AUMMO CAN'T FIRE "  , displayWidth/2-400,displayHeight/2-50);
    
}

if(gameState === 3){

    
  stroke("red");
  strokeWeight(2);
  fill("yellow");
  textSize(30);
  text("YOU ARE A REAL FIGHTER YOU SAVED THE WORLD"  , displayWidth/2-400,displayHeight/2-50);
    
}



fill("red");
textSize(15);
text("SCORE : " + score , width-100,100);
text("Bullets Left  : " + bulletLimit , width-130,150);

}

function spawnZombie(){

  if(frameCount % 70 === 0){

    zombie = createSprite(width/1+100,20);
    zombie.y = random(120,displayHeight-120);
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -(2+ 1*score/4);
    zombie.lifetime = 800;
      // zombie.debug = true ;
   zombie.setCollider("rectangle",0,0,zombie.width-330,zombie.height-330);

     zombieGroup.add(zombie);

  }

}

function spawnbullet(){

   bullet = createSprite(player.x+50 , player.y);
  bullet.addImage(bulletImg);
  bullet.scale = 0.04 ; 
  bullet.velocityX = 12;
  bullet.lifetime = 600;

  bulletGroup.add(bullet);

}

function reset(){

  gameState = 1;

}
