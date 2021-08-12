var trex ,trex_running;
var cloud , cloud_image
var ran,score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  ground_image = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameOver_img = loadImage("gameOver.png")
  restart_img = loadImage("restart.png")
  die_sound = loadSound("die.mp3")
  jump_sound = loadSound("jump.mp3")
  checkpoint_sound = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(600,200)
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5
  trex.setCollider("circle", 0,0,40 );
 
  ground = createSprite(300, 185, 600, 15)
  ground.addImage("ground", ground_image)
  edges = createEdgeSprites()

  trex.depth = ground.depth +1;

  invisibleGnd= createSprite(300,195,600,10)
  invisibleGnd.visible = false

  obstaclesGroup = new Group()
  cloudsGroup = new Group()
  score = 0000000000;
  

  gameOver = createSprite(300, 100)
      restart = createSprite(300, 140)
      gameOver.addImage("gameover", gameOver_img)
       restart.addImage("restart", restart_img)
       gameOver.scale=0.6;
       restart.scale=0.6;
}

function draw(){
  background(180)
  background("white")
  ran = Math.round(random(20,80))

  if (gameState == PLAY){
    if(keyDown("space") && trex.y>=165 ){
      trex.velocityY = -13;  
      jump_sound.play()
    }
    restart.visible=false
  gameOver.visible=false

    if(score>0 && score%100 ==0){
      checkpoint_sound.play()
    }
     
    if(ground.x<=0){
      ground.x= ground.width/2
    }
    trex.velocityY = trex.velocityY+ 1 
    score =score + Math.round(getFrameRate()/60)
    ground.velocityX=-(4+2*score/40)
    spawnClouds()
    spawnObstacles()

    if(obstaclesGroup.isTouching(trex)){
      gameState= END
      die_sound.play()
    }
  }
  else if(gameState == END){
     
      ground.velocityX =0;
      obstaclesGroup.setVelocityXEach(0)
      cloudsGroup.setVelocityXEach(0)
      obstaclesGroup.setLifetimeEach(-1)
      cloudsGroup.setLifetimeEach(-1)
      trex.velocityY=0
      trex.velocityY = trex.velocityY+ 1  
      trex.changeAnimation("collided",trex_collided)
      
      restart.visible=true
  gameOver.visible=true

       if (mousePressedOver(restart)){
         reset()
       }
  }

  textSize(14)
  fill(0)
  stroke(0)
  text( score ,500,50 )

  trex.collide(invisibleGnd)
  drawSprites();
}

function reset(){
  score = 0
  gameState = PLAY
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running", trex_running)
  restart.visible=false
  gameOver.visible=false

}

function spawnClouds(){
  if (frameCount%100 ==0){
     cloud = createSprite(600, 52, 40, 20)
     cloudsGroup.add(cloud)
     cloud.y = ran
      cloud.addImage("cloud", cloud_image)
      cloud.velocityX=-(4+score/40)
      trex.depth = cloud.depth +1
      cloud.lifetime = 100;
      
    }
 }

function spawnObstacles(){
  if (frameCount%50 ==0){
     obstacle = createSprite(600, 170, 40, 20)
     obstacle.scale= 0.5
     obstaclesGroup.add(obstacle)
     var rand = Math.round(random(1,6))
     switch(rand){
        case 1:  obstacle.addImage("obstacle", obstacle1);
                break;
       case 2: obstacle.addImage("obstacle2", obstacle2);
                break;
       case 3:  obstacle.addImage("obstacle3", obstacle3);
                break;
       case 4: obstacle.addImage("obstacle4", obstacle4);
                break;
       case 5:  obstacle.addImage("obstacle5", obstacle5);
                break;
       case 6: obstacle.addImage("obstacle6", obstacle6);
                break;
      default:  break;
     }
      obstacle.lifetime = 100;
      obstacle.velocityX=-(5+2*score/40)
      trex.depth = obstacle.depth +1
     
    }
}






















