class Ship {

  constructor(options){
    this.speedx = options.speed[0];
    this.game = options.game;
    this.pos = options.pos;
    this.speedy = options.speed[1];
    this.tailpos = [750,375];
  }


  draw(ctx){
    const imageRepository = new function() {
      this.ship = new Image();
    	this.ship.src = "assets/ship.png";
    }



      ctx.drawImage(
          imageRepository.ship,
          this.pos[0],
          this.pos[1],
          124,
          125
        );


    this.move();
    if(!this.game.chuka.ducking && !this.game.chuka.jumping){
       this.checkCollision();
       this.checkHeadCollision()
    }

    if(!this.game.chuka.ducking && this.game.chuka.jumping){
       this.checkCollision();
    }


    if (this.pos[1] > 275){
      this.speedy = -this.speedy
    }else if(this.pos[1] < 50){
      this.speedy = -this.speedy
    }


    if (this.pos[0] < -40 && this.game.score < 2000 ){
      this.game.addShip();
    }else if(this.pos[0] < -100  && this.game.score >= 2000){
      this.game.addShip();
    }



  }

  move(){
    if(this.game.score > 1450){
       this.pos[0] -= this.speedx;
       this.pos[1] -= this.speedy;
       this.tailpos[0] -= this.speedx;
       this.tailpos[1] -= this.speedy;
     }
  }

  distance(num1,num2){
   var a = (num2[0] - num1[0])
   var b = (num2[1] - num1[1])
   var c = Math.floor(Math.sqrt((Math.pow(a,2)+ Math.pow(b,2))));
   return c

  }

  checkCollision(){
    if ((this.distance(this.pos,this.game.chuka.pos)) < 60){
        this.game.gameOver();
    }
  }

  checkHeadCollision(){
    if ((this.distance(this.tailpos,this.game.chuka.headpos)) < 10){
        this.game.gameOver();
    }
  }

}


module.exports = Ship;
