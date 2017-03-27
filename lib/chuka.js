
class Chuka{
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.game = options.game;
    this.walk = true;
    this.wc = 10;
    this.jumping = false;
    this.falling = false;
    this.speedY = options.speedY;
    this.ducking = false;
    this.headpos = [0,290];

  }


  move(){
    if(this.jumping){
      if(!this.falling){
        this.pos[1] += -this.speedY
        this.headpos[1] += -this.speedY
        if(this.pos[1] <= 200){
          this.falling = true
        }
      }else if (this.falling) {
        this.pos[1] += this.speedY;
        this.headpos[1] += -this.speedY
        if(this.onFloor()){
          this.falling = false;
          this.jumping = false;
        }
      }
    }
    if((this.pos[1] - this.speedY) > 327 ){
      this.pos[1] = 325
      this.speedY = 0
      this.falling = false;
      this.jumping = false;
    }

    if (this.game.score > 500){
          this.speedY = 4;
     }

  }

  onFloor(){
    if (this.pos[1] === 325){
      return true
    }
  }


  duck(){
    if(!this.jumping && this.onFloor()){
      this.ducking = true;
      this.headpos[1] = 290;
    }

  }

  dontduck(){
    if (this.ducking){
      this.ducking = false;
      this.headpos[1] = 370
    }
  }

  jump(){
    if (!this.jumping && this.onFloor()){
      console.log("its trying to jump")
      this.jumping = true
    }
  }

  draw(ctx){
    const imageRepository = new function() {
      this.chuka = new Image();
    	this.chuka.src = "assets/soldier_walk1.png";

    }

    const imageRepository2 = new function() {
      this.chuka = new Image();
    	this.chuka.src = "assets/soldier_walk2.png";

    }
    const imageRepository3 = new function() {
      this.chuka = new Image();
    	this.chuka.src = "assets/soldier_jump.png";

    }

    const imageRepository4 = new function() {
      this.chuka = new Image();
    	this.chuka.src = "assets/soldier_fall.png";

    }

    const imageRepository5 = new function() {
      this.chuka = new Image();
    	this.chuka.src = "assets/soldier_duck.png";
    }


    if(this.walk && !this.jumping && !this.falling && !this.ducking){
      ctx.drawImage(
          imageRepository.chuka,
          this.pos[0],
          this.pos[1],
          80,
          110
        );
        if(this.wc === 0){
          this.walk = false;
          this.wc = 10;
        }else{
          this.wc += -1
        }

      }else if(!this.walk && !this.jumping && !this.falling && !this.ducking){
        ctx.drawImage(
            imageRepository2.chuka,
            this.pos[0],
            this.pos[1],
            80,
            110
          );

          if(this.wc === 0){
            this.walk = true;
            this.wc = 10;
          }else{
            this.wc += -1
          }
      }else if( this.jumping && !this.falling && !this.ducking){
        ctx.drawImage(
            imageRepository3.chuka,
            this.pos[0],
            this.pos[1],
            80,
            110
          );
        }else if( this.jumping && this.falling && !this.ducking){
          ctx.drawImage(
              imageRepository4.chuka,
              this.pos[0],
              this.pos[1],
              80,
              110
            );
          } else if (this.ducking) {
            ctx.drawImage(
                imageRepository5.chuka,
                this.pos[0],
                this.pos[1],
                80,
                110
              );
          }

      this.move();
  }

}

module.exports = Chuka;
