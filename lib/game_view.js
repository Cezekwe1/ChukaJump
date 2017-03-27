const Game = require("./game");

const Keys = {
    down: false,
    space: false,
    r: false,
    t: false
};

window.onkeydown = function(e){
     const kc = e.keyCode;
     e.preventDefault();
     if(kc === 32) Keys.space = true;
     if(kc === 40) Keys.down = true;
     if(kc === 82) Keys.r = true;
     if(kc === 84) Keys.t = true;
 };

window.onkeyup = function(e){
     const kc = e.keyCode;
     e.preventDefault();
     if(kc === 32) Keys.space = false;
     if(kc === 40) Keys.down = false;
     if(kc === 82) Keys.r = false;
     if(kc === 84) Keys.t = false;

};


class GameView{
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.welcome = true;
    this.theme = new Audio('./assets/theme.wav')
    this.songOn = true;
    this.jumps =  new Audio('./assets/jump.wav')
    this.clicked = false;
  }


  update() {
    if (!this.game.game_over) {
      if (this.welcome){
        $('.welcome').click(()=>{
          this.welcome = false
          $('.welcome').css("display","none");
        });
      }else{
        this.game.step();
        this.game.draw(this.ctx);
        this.setChukaKey();
      }
    }

    if(this.game.game_over){
      this.ctx.fillStyle = "maroon"
      this.ctx.font = "bolder 30px Great Lakes Shadow NF";
      this.ctx.fillText(`Click R to Reset Game`,200,250);
      this.setGameOverKey();
    }
    this.setSoundKey();
    requestAnimationFrame(this.update.bind(this));
  }


  start() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.game = null;
    this.game = new Game();
    this.game.addObjects();
    this.welcome = true;
    this.chuka = this.game.chuka;
    this.theme.load();
    if(this.songOn){
      this.theme.play();
    }
    this.jumps.load();
    requestAnimationFrame(this.update.bind(this));
  }


  setChukaKey(){
    if(Keys.space) {
       this.chuka.jump();
       if(this.songOn){
         this.jumps.play();
        }
     }
     if(Keys.down){
       this.chuka.duck();
     }
     if(!Keys.down){
       this.chuka.dontduck();
     }

  }

  setGameOverKey(){
    if(Keys.r){
      this.game = null;
      this.game = new Game();
      this.game.addObjects();
      this.chuka = this.game.chuka;
    }
  }

  setSoundKey(){
    if(Keys.t){
      this.toggleSound();
    }
    if(!Keys.t){
      this.clicked = true;
    }
  }

  toggleSound(){
    if(this.songOn && this.clicked){
      this.songOn = false;
      this.clicked = false;
    }

    if(!this.songOn && this.clicked){
       this.songOn = true;
       this.clicked = false;
    }
  }

}


module.exports = GameView;
