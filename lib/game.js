const Background = require("./background");
const Chuka = require("./chuka");
const Obstacle = require("./obstacle");
const Ship = require("./ship");

class Game{

  constructor(){
    this.background = null;
    this.chuka = null;
    this.game_over = false;
    this.obstacle = [];
    this.score = 0;
    this.ship = [];
    this.rockspeed = 3;
    this.shipspeed = [7,3];
    this.chukaspeed = 3;
  }


  addPoints(){
    this.score += 1
  }

  draw(ctx){
    this.background.draw(ctx);
    this.chuka.draw(ctx);
    this.obstacle.forEach(object => object.draw(ctx));
    this.ship.forEach(object => object.draw(ctx));
    ctx.fillStyle = "maroon"
    ctx.font = "bolder 30px Great Lakes Shadow NF";
    ctx.fillText(`Score: ${this.score}`,25,50);
  }


  step(){
    this.background.move();
    this.chuka.move();
    this.addPoints();
    this.obstacle.forEach(object => object.move());
    this.ship.forEach(object => object.move());
    this.removeOutbounds();
  }

  addObjects(){
    this.addBackground();
    this.addChuka();
    this.addObstacle();
    this.addShip();

  }

  removeOutbounds(){
    this.obstacle.forEach((object) => {
      if (object.pos[0] < -50){
         this.remove(object)
      }
    });

    this.ship.forEach((object) => {
      if (object.pos[0] < -50){
         this.remove(object)
      }
    });
  }


  addBackground(game) {
    const background = new Background({ game: this});
    this.background = background;
  }

  addChuka(game){
    const chuka = new Chuka({game: this , pos:[0,325], speedY: this.chukaspeed});
    this.chuka = chuka;
  }


  addObstacle(){
    if(this.obstacle.length < 2 ){
      const obstacle = new Obstacle({game: this, pos:[750,375] , speed: this.rockspeed});
      this.obstacle.push(obstacle);
    }


  }

  addShip(){
    if(this.ship.length < 2 ){
      const ship = new Ship({game: this, pos:[750,175] , speed:this.shipspeed});
      this.ship.push(ship);
    }
  }

  removeShip(){
    this.ship.splice(0,1);
  }

  gameOver(){
    this.game_over = true;
  }

  remove(object){
    if (object instanceof Obstacle) {
      this.obstacle.splice(this.obstacle.indexOf(object),1);
   }else{
     this.ship.splice(this.ship.indexOf(object),1);
   }
  }

  // refresh(){
  //   this.obstacle = []
  //   this.ship = []
  //   this.score = 0;
  //   this.game_over = false;
  //   this.chuka = null;
  //   this.background = null;
  //   this.addObjects();
  // }


}

Game.DIM_X = 750;
Game.DIM_Y = 500;
module.exports = Game;
