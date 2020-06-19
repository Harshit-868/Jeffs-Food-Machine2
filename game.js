class Game {
  constructor() {
    this.startTime;
    this.endTime;
    this.elapsed;
    this.jeff = createSprite(width/2, height - 100);
    this.score = 0;
    this.goods = [];
    this.bads = [];
    this.finish = false;
    this.msgSp1 = createSprite(525, 290, 10, 10);
    this.msgSp2 = createSprite(525, 330, 10, 10);

    this.msgSp1.addImage("msg1", msg1);
    this.msgSp1.visible = false;
    this.msgSp2.addImage("msg2", msg2);
    this.msgSp2.visible = false;
    this.jeff.visible = false;
    this.jeff.setCollider("rectangle", -20, 0, 180, 100);
  }
  play() {
    this.jeff.addImage("Jeff_img", jeffImg);
    this.jeff.visible = true;
    this.jeff.depth = 1;
    this.jeff.scale = 0.7;
    this.jeff.x = mouseX;
    
    if (frameCount > this.startTime + 45 && frameCount % 40 == 0 && this.score < 50) {
      var rand = Math.round(random(0, 20));
      var x = Math.round(random(20, 1030));

      if (rand > 8) {
        var good = createSprite(x, 0, 30, 30);
        good.velocityY = Math.round(random(9, 18));
        good.depth = 2;
        
        var img = Math.round(random(1, 4));
        switch (img) {
          case 1:
            good.addImage("good1", good1);
          break;
          case 2:
            good.addImage("good2", good2);
          break;
          case 3:
            good.addImage("good3", good3);
          break;
          case 4:
            good.addImage("good4", good4);
          break;
          default:
          break;
        }
        good.scale = 0.3;
        this.goods.push(good);
            
      } else {
        var bad = createSprite(x, 0, 30, 30);
        bad.velocityY = Math.round(random(9, 18));
        bad.depth = 2;
        if (bad.y > 580) {
          bad.remove();
        }
        var img = Math.round(random(1, 3));
        switch (img) {
          case 1:
            bad.addImage("bad", bad1);
            bad.scale = 0.1;
          break;
          case 2:
            bad.addImage("bad", bad2);
            bad.scale = 0.1;
          break;
          case 3:
            bad.addImage("bad3", bad3);
            bad.scale = 0.3;
          break;
        }
        this.bads.push(bad);
      }
    } else if (this.score >= 50) {
      while (this.goods.length > 0) {
        for (var g in this.goods) {
          this.goods[g].remove();
        }
        this.goods.pop();
      } while (this.bads.length > 0) {
        for (var b in this.bads) {
          this.bads[b].remove();
        }
        this.bads.pop();
      }
      if (this.finish == false) {
        state = 2;
        sound1.stop();
        sound2.play();
        this.endTime = frameCount;
        this.elapsed = Math.round((this.endTime - this.startTime)/30);
        this.finish = true;
      }
    }
    for (var g in this.goods) {
      if (this.goods[g].collide(this.jeff)) {
        this.goods[g].remove();
        this.score++;
        this.msgSp2.visible = true;
        setTimeout(() => {
          this.msgSp2.visible = false;
        }, 1500);
      }
      if (this.goods[g].y > 570) {
        this.goods[g].remove();
        this.goods.splice(g, 1);
      }
    }
    for (var b in this.bads) {
      if (this.bads[b].collide(this.jeff)) {
        this.bads[b].remove();
        if (this.score > 1) {
          this.score-=2
        } else if (this.score == 1) {
          this.score = 0;
        }
        this.msgSp1.visible = true;
        setTimeout(() => {
          this.msgSp1.visible = false;
        }, 1500);
      }
      if (this.bads[b].y > 580) {
        this.bads[b].remove();
        this.bads.splice(b, 1);
      }
    }
  }
}