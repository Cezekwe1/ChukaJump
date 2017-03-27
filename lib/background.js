
const DEFAULTS = {
  X_POS: 0,
  Y_POS: 0,
  WIDTH: 3072,
  HEIGHT: 1536,
  SPEED:  5
};

class Background{
  constructor(){
    this.xPos = DEFAULTS.X_POS;
    this.yPos = DEFAULTS.Y_POS;
    this.width = DEFAULTS.WIDTH;
    this.height = DEFAULTS.HEIGHT;
    this.speed = DEFAULTS.SPEED;

  }


  draw(ctx){
    const imageRepository = new function() {
    	this.background = new Image();
    	this.background.src = "assets/full-background.png";
    };

    ctx.drawImage(
        imageRepository.background,
        this.xPos,
        this.yPos,
        this.width,
        this.height,
        0,
        0,
        750,
        500
      );

      ctx.drawImage(
        imageRepository.background,
        this.xPos - this.width,
        this.yPos,
        this.width,
        this.height,
        0,
        0,
        750,
        500
      );

      this.move();

      if (this.xPos > 3072){
        this.xPos = 0;
      }

  }

  move() {
    this.xPos += this.speed;
  }
}



module.exports = Background;
