
class Obstacle {

  constructor(options){
    this.speed = options.speed;
    this.game = options.game;
    this.pos = options.pos;
  }


  draw(ctx){

    const imageRepository = new function() {
      this.rock = new Image();
    	this.rock.src = "assets/rock.png";

    }
      ctx.drawImage(
          imageRepository.rock,
          this.pos[0],
          this.pos[1],
          82,
          59
        );

    this.move();
    this.checkCollision();

    if(this.pos[0] < 300){
      this.game.addObstacle();
    }

    if(this.game.score > 500 && this.game.score < 1000){
      this.speed = 4
    }

    if(this.game.score >= 1000){
      this.speed = 5
    }
  }

  move(){
       this.pos[0] -= this.speed;
  }


  distance(num1,num2){
   var a = (num2[0] - num1[0])
   var b = (num2[1] - num1[1])

   var c = Math.floor(Math.sqrt(Math.pow(a,2)+ Math.pow(b,2)));
   return c

  }


  checkCollision(){
    if ((this.distance(this.pos,this.game.chuka.pos)) < 80){
        console.log("its colliding")
        this.game.gameOver();
    }
  }

}


module.exports = Obstacle;
