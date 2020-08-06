var ground,contra,firegroup,fire,man,reset,gameOver,cloudgroup,mangroup,title;
var groundimg,contraimg,manimg,restartimg,gameoverimg,titleimg;
score = 0;
var count = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
titleimg = loadImage("title.png")
groundimg = loadImage("ground2.png");
contraimg = loadImage("train.png");
cloudImage = loadImage("cloud.png");
manimg = loadImage("dog.png");
restartimg = loadImage("restart.png");
gameoverimg = loadImage("gameOver.png");
}



function setup() {
  createCanvas(1400, 400);
  invisiableground = createSprite(400,395,2000,10);
  invisiableground.visible = false;
  ground = createSprite(700,380,2000,20);
  ground.addImage("master1s",groundimg);

  ground.velocityX = -4;
  ground.x = ground.width /2;
  contra1 = createSprite(60,340,400,20);
  contra1.addImage("bob",contraimg);
  contra1.scale = 0.1;
  mangroup = createGroup();
  firegroup = createGroup();
  cloudgroup = createGroup();
  // gameOver = createSprite(200,300);
  title = createSprite(150,200);
  title.addImage(titleimg);
  title.scale = 0.1;
 }

function draw() {
    background(0);
    if(gameState === PLAY){
      ground.velocityX = -(3 + 2*count/100);
    
      fill("blue")
      textSize(25)
        count = count + Math.round(getFrameRate()/60);
        text("count: "+ count, 500,50);
      if(keyDown("UP_ARROW")&& contra1.y >= 150){
        contra1.velocityY = -15;

      }
      contra1.velocityY = contra1.velocityY + 0.7
     // ground.velocityX = -3;
      if(ground.x<200){

        ground.x=ground.width/2;
      }

        contra1.velocityY = contra1.velocityY + 0.7
      if (keyDown ("SPACE")) {
        fire = createSprite(contra1.x,contra1.y,10,3);
        firegroup.add(fire);

        //man1.visible = true;
        firegroup.add(fire);
        fire.shapeColor="blue";
        fire.velocityX =  12;

        }

        if(mangroup.isTouching(contra1)){
         
          gameState=END; 
         }
         
       textSize(25)       ;

       fill("red") ;
       text("score: "+ score, 700, 20);
            if (firegroup.isTouching(mangroup)) {
             mangroup.destroyEach();
              score = score+1;
           }
          
     }else if(gameState === END){
        ground.velocityX = 0;
        contra1.velocityY = 0;
        mangroup.setVelocityXEach(0);
        cloudgroup.setVelocityXEach(0);
        mangroup.setLifetimeEach(-1);
        cloudgroup.setLifetimeEach(-1);

      }
      contra1.collide(invisiableground);
      spawnman(); 
      spawnClouds();
 drawSprites()
 }
 function spawnClouds() {

  if (frameCount % 60 === 0) {
    var cloud = createSprite(1360,200,40,10);
    cloud.y = Math.round(random(80,120));
      cloud.addImage(cloudImage);
      cloud.velocityX = -3;
      cloud.lifetime = 2000;
      cloudgroup.add(cloud);
      cloud.velocityX = -(3 + 2*count/100);
  }

}
function spawnman(){
  if (frameCount % 150 === 0) {
    var man = createSprite(1360,360,40,10);
      man.addImage(manimg);
      man.velocityX = -3;
      man.lifetime = 2000;
      man.scale = 0.1;
      mangroup.add(man);
      man.velocityX = -(3 + 2*count/100);
  }

}





