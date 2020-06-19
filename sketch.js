var jeffImg, boyImg, bgImg, bg2Img, good1, bad1, msg1;
var sound1, sound2;
var sprite1, sprite2, sprite3;
var jeff, boy, btn, game, restart;
var state = 0;

function preload() {
  bg1Img = loadImage("images/bg1_img.png");
  bg2Img = loadImage("images/bg2_img.png");

  jeffImg = loadImage("images/jeff.png");
  boyImg = loadImage("images/boy_on_a_bench.png");
  jeffBubble1 = loadImage("images/bubble1-jeff.png");
  jeffBubble2 = loadImage("images/bubble2-jeff.png");
  boyBubble1 = loadImage("images/bubble1-boy.png");

  good1 = loadImage("images/good1.png");
  good2 = loadImage("images/good2.png");
  good3 = loadImage("images/good3.png");
  good4 = loadImage("images/good4.png");

  bad1 = loadImage("images/bad1.png");
  bad2 = loadImage("images/bad2.png");
  bad3 = loadImage("images/bad3.png");

  msg1 = loadImage("images/msg1.png");
  msg2 = loadImage("images/msg2.png");

  sound1 = loadSound("sounds/play.mp3");
  sound2 = loadSound("sounds/end.mp3");
}

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 50);

  jeff = createSprite(240, 390);
  jeff.addImage("Jeff_img", jeffImg);
  jeff.scale = 0.9;

  boy = createSprite(710, 340);
  boy.addImage("Boy_img", boyImg);
  boy.scale = 0.35;
  
  sprite1 = createSprite(320, 240, 50, 50);
  sprite1.addImage("Jeff-bubble", jeffBubble1);
  sprite1.scale = 0.4;
  sprite1.lifetime = 75;
  
  sprite2 = createSprite(560, 190, 50, 50);
  sprite2.addImage("Boy-bubble", boyBubble1);
  sprite2.scale = 0.4;
  sprite2.lifetime = 150;
  sprite2.visible = false;

  sprite3 = createSprite(320, 240, 50, 50);
  sprite3.addImage("Jeff-bubble2", jeffBubble2);
  sprite3.scale = 0.4;
  sprite3.visible = false;

  btn = createButton("Help him!");
  btn.position(-100, -200);

  restart = createButton("Collect more!");
  restart.position(-200, -200);

  game = new Game();
}

function draw() {
  if (state == 0 || state == 2) {
    background(bg1Img);
  }

  textSize(35);
  textStyle(BOLDITALIC);
  textAlign(CENTER);

  if(sprite1.lifetime == 0) {
    sprite2.visible = true;
  }
  if (sprite2.lifetime == 0) {
    sprite3.visible = true;
    btn.position(300, 240);
  }

  btn.mousePressed(() => {
    game.startTime = frameCount;
    jeff.remove();
    boy.remove();
    sprite3.remove();
    btn.remove();
    state = 1;
    sound1.play();
  });
  restart.mousePressed(() => {
    location.reload();
  })
  
  if (state == 1) {
    game.play();
    background(bg2Img);
    fill("red");
    text("Score: " + game.score + " / 50", width/2, 50);
    fill("white");
    textSize(15);
    text("Keep the cursor within the game screen AT ALL TIMES!", width/2, height - 25);
  }
  if (state == 2) {
    game.jeff.remove();
    if (game.endTime != 0 && frameCount > game.endTime + 250) {
      restart.position(width/2 - 75, height - 125);
    }
    game.msgSp2.remove();
    textSize(35);
    fill(225, 0, 0);
    text(`You took only ${game.elapsed} seconds!`, width/2, height - 550);
    fill(50, 100, 200);
    text("Congratulations! You helped Jeff", width/2, height - 450);
    text("collect enough food to feed the hungry kid!", width/2, height - 400);
    fill("white");
    text("But, there are more hungry children,", width/2, height - 250);
    text("all over the world. How will Jeff help them all?", width/2, height - 200);
    textSize(45);
    fill(50, 200, 255)
    text("If only we all stopped wasting food...", width/2, height - 50);
  }

  drawSprites();
}