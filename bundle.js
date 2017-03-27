/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Background = __webpack_require__(2);
var Chuka = __webpack_require__(3);
var Obstacle = __webpack_require__(4);
var Ship = __webpack_require__(5);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.background = null;
    this.chuka = null;
    this.game_over = false;
    this.obstacle = [];
    this.score = 0;
    this.ship = [];
    this.rockspeed = 3;
    this.shipspeed = [7, 3];
    this.chukaspeed = 3;
  }

  _createClass(Game, [{
    key: "addPoints",
    value: function addPoints() {
      this.score += 1;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.background.draw(ctx);
      this.chuka.draw(ctx);
      this.obstacle.forEach(function (object) {
        return object.draw(ctx);
      });
      this.ship.forEach(function (object) {
        return object.draw(ctx);
      });
      ctx.fillStyle = "maroon";
      ctx.font = "bolder 30px Great Lakes Shadow NF";
      ctx.fillText("Score: " + this.score, 25, 50);
    }
  }, {
    key: "step",
    value: function step() {
      this.background.move();
      this.chuka.move();
      this.addPoints();
      this.obstacle.forEach(function (object) {
        return object.move();
      });
      this.ship.forEach(function (object) {
        return object.move();
      });
      this.removeOutbounds();
    }
  }, {
    key: "addObjects",
    value: function addObjects() {
      this.addBackground();
      this.addChuka();
      this.addObstacle();
      this.addShip();
    }
  }, {
    key: "removeOutbounds",
    value: function removeOutbounds() {
      var _this = this;

      this.obstacle.forEach(function (object) {
        if (object.pos[0] < -50) {
          _this.remove(object);
        }
      });

      this.ship.forEach(function (object) {
        if (object.pos[0] < -50) {
          _this.remove(object);
        }
      });
    }
  }, {
    key: "addBackground",
    value: function addBackground(game) {
      var background = new Background({ game: this });
      this.background = background;
    }
  }, {
    key: "addChuka",
    value: function addChuka(game) {
      var chuka = new Chuka({ game: this, pos: [0, 325], speedY: this.chukaspeed });
      this.chuka = chuka;
    }
  }, {
    key: "addObstacle",
    value: function addObstacle() {
      if (this.obstacle.length < 2) {
        var obstacle = new Obstacle({ game: this, pos: [750, 375], speed: this.rockspeed });
        this.obstacle.push(obstacle);
      }
    }
  }, {
    key: "addShip",
    value: function addShip() {
      if (this.ship.length < 2) {
        var ship = new Ship({ game: this, pos: [750, 175], speed: this.shipspeed });
        this.ship.push(ship);
      }
    }
  }, {
    key: "removeShip",
    value: function removeShip() {
      this.ship.splice(0, 1);
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.game_over = true;
    }
  }, {
    key: "remove",
    value: function remove(object) {
      if (object instanceof Obstacle) {
        this.obstacle.splice(this.obstacle.indexOf(object), 1);
      } else {
        this.ship.splice(this.ship.indexOf(object), 1);
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


  }]);

  return Game;
}();

Game.DIM_X = 750;
Game.DIM_Y = 500;
module.exports = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = __webpack_require__(0);

var Keys = {
  down: false,
  space: false,
  r: false,
  t: false
};

window.onkeydown = function (e) {
  var kc = e.keyCode;
  e.preventDefault();
  if (kc === 32) Keys.space = true;
  if (kc === 40) Keys.down = true;
  if (kc === 82) Keys.r = true;
  if (kc === 84) Keys.t = true;
};

window.onkeyup = function (e) {
  var kc = e.keyCode;
  e.preventDefault();
  if (kc === 32) Keys.space = false;
  if (kc === 40) Keys.down = false;
  if (kc === 82) Keys.r = false;
  if (kc === 84) Keys.t = false;
};

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = game;
    this.welcome = true;
    this.theme = new Audio('./assets/theme.wav');
    this.songOn = true;
    this.jumps = new Audio('./assets/jump.wav');
    this.clicked = false;
  }

  _createClass(GameView, [{
    key: 'update',
    value: function update() {
      var _this = this;

      if (!this.game.game_over) {
        if (this.welcome) {
          $('.welcome').click(function () {
            _this.welcome = false;
            $('.welcome').css("display", "none");
          });
        } else {
          this.game.step();
          this.game.draw(this.ctx);
          this.setChukaKey();
        }
      }

      if (this.game.game_over) {
        this.ctx.fillStyle = "maroon";
        this.ctx.font = "bolder 30px Great Lakes Shadow NF";
        this.ctx.fillText('Click R to Reset Game', 200, 250);
        this.setGameOverKey();
      }
      this.setSoundKey();
      requestAnimationFrame(this.update.bind(this));
    }
  }, {
    key: 'start',
    value: function start() {
      this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.game = null;
      this.game = new Game();
      this.game.addObjects();
      this.welcome = true;
      this.chuka = this.game.chuka;
      this.theme.load();
      if (this.songOn) {
        this.theme.play();
      }
      this.jumps.load();
      requestAnimationFrame(this.update.bind(this));
    }
  }, {
    key: 'setChukaKey',
    value: function setChukaKey() {
      if (Keys.space) {
        this.chuka.jump();
        if (this.songOn) {
          this.jumps.play();
        }
      }
      if (Keys.down) {
        this.chuka.duck();
      }
      if (!Keys.down) {
        this.chuka.dontduck();
      }
    }
  }, {
    key: 'setGameOverKey',
    value: function setGameOverKey() {
      if (Keys.r) {
        this.game = null;
        this.game = new Game();
        this.game.addObjects();
        this.chuka = this.game.chuka;
      }
    }
  }, {
    key: 'setSoundKey',
    value: function setSoundKey() {
      if (Keys.t) {
        this.toggleSound();
      }
      if (!Keys.t) {
        this.clicked = true;
      }
    }
  }, {
    key: 'toggleSound',
    value: function toggleSound() {
      if (this.songOn && this.clicked) {
        this.songOn = false;
        this.clicked = false;
      }

      if (!this.songOn && this.clicked) {
        this.songOn = true;
        this.clicked = false;
      }
    }
  }]);

  return GameView;
}();

module.exports = GameView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULTS = {
  X_POS: 0,
  Y_POS: 0,
  WIDTH: 3072,
  HEIGHT: 1536,
  SPEED: 5
};

var Background = function () {
  function Background() {
    _classCallCheck(this, Background);

    this.xPos = DEFAULTS.X_POS;
    this.yPos = DEFAULTS.Y_POS;
    this.width = DEFAULTS.WIDTH;
    this.height = DEFAULTS.HEIGHT;
    this.speed = DEFAULTS.SPEED;
  }

  _createClass(Background, [{
    key: "draw",
    value: function draw(ctx) {
      var imageRepository = new function () {
        this.background = new Image();
        this.background.src = "assets/full-background.png";
      }();

      ctx.drawImage(imageRepository.background, this.xPos, this.yPos, this.width, this.height, 0, 0, 750, 500);

      ctx.drawImage(imageRepository.background, this.xPos - this.width, this.yPos, this.width, this.height, 0, 0, 750, 500);

      this.move();

      if (this.xPos > 3072) {
        this.xPos = 0;
      }
    }
  }, {
    key: "move",
    value: function move() {
      this.xPos += this.speed;
    }
  }]);

  return Background;
}();

module.exports = Background;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chuka = function () {
  function Chuka(options) {
    _classCallCheck(this, Chuka);

    this.pos = options.pos;
    this.vel = options.vel;
    this.game = options.game;
    this.walk = true;
    this.wc = 10;
    this.jumping = false;
    this.falling = false;
    this.speedY = options.speedY;
    this.ducking = false;
    this.headpos = [0, 290];
  }

  _createClass(Chuka, [{
    key: "move",
    value: function move() {
      if (this.jumping) {
        if (!this.falling) {
          this.pos[1] += -this.speedY;
          this.headpos[1] += -this.speedY;
          if (this.pos[1] <= 200) {
            this.falling = true;
          }
        } else if (this.falling) {
          this.pos[1] += this.speedY;
          this.headpos[1] += -this.speedY;
          if (this.onFloor()) {
            this.falling = false;
            this.jumping = false;
          }
        }
      }
      if (this.pos[1] - this.speedY > 327) {
        this.pos[1] = 325;
        this.speedY = 0;
        this.falling = false;
        this.jumping = false;
      }

      if (this.game.score > 500) {
        this.speedY = 4;
      }
    }
  }, {
    key: "onFloor",
    value: function onFloor() {
      if (this.pos[1] === 325) {
        return true;
      }
    }
  }, {
    key: "duck",
    value: function duck() {
      if (!this.jumping && this.onFloor()) {
        this.ducking = true;
        this.headpos[1] = 290;
      }
    }
  }, {
    key: "dontduck",
    value: function dontduck() {
      if (this.ducking) {
        this.ducking = false;
        this.headpos[1] = 370;
      }
    }
  }, {
    key: "jump",
    value: function jump() {
      if (!this.jumping && this.onFloor()) {
        console.log("its trying to jump");
        this.jumping = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var imageRepository = new function () {
        this.chuka = new Image();
        this.chuka.src = "assets/soldier_walk1.png";
      }();

      var imageRepository2 = new function () {
        this.chuka = new Image();
        this.chuka.src = "assets/soldier_walk2.png";
      }();
      var imageRepository3 = new function () {
        this.chuka = new Image();
        this.chuka.src = "assets/soldier_jump.png";
      }();

      var imageRepository4 = new function () {
        this.chuka = new Image();
        this.chuka.src = "assets/soldier_fall.png";
      }();

      var imageRepository5 = new function () {
        this.chuka = new Image();
        this.chuka.src = "assets/soldier_duck.png";
      }();

      if (this.walk && !this.jumping && !this.falling && !this.ducking) {
        ctx.drawImage(imageRepository.chuka, this.pos[0], this.pos[1], 80, 110);
        if (this.wc === 0) {
          this.walk = false;
          this.wc = 10;
        } else {
          this.wc += -1;
        }
      } else if (!this.walk && !this.jumping && !this.falling && !this.ducking) {
        ctx.drawImage(imageRepository2.chuka, this.pos[0], this.pos[1], 80, 110);

        if (this.wc === 0) {
          this.walk = true;
          this.wc = 10;
        } else {
          this.wc += -1;
        }
      } else if (this.jumping && !this.falling && !this.ducking) {
        ctx.drawImage(imageRepository3.chuka, this.pos[0], this.pos[1], 80, 110);
      } else if (this.jumping && this.falling && !this.ducking) {
        ctx.drawImage(imageRepository4.chuka, this.pos[0], this.pos[1], 80, 110);
      } else if (this.ducking) {
        ctx.drawImage(imageRepository5.chuka, this.pos[0], this.pos[1], 80, 110);
      }

      this.move();
    }
  }]);

  return Chuka;
}();

module.exports = Chuka;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obstacle = function () {
  function Obstacle(options) {
    _classCallCheck(this, Obstacle);

    this.speed = options.speed;
    this.game = options.game;
    this.pos = options.pos;
  }

  _createClass(Obstacle, [{
    key: "draw",
    value: function draw(ctx) {

      var imageRepository = new function () {
        this.rock = new Image();
        this.rock.src = "assets/rock.png";
      }();
      ctx.drawImage(imageRepository.rock, this.pos[0], this.pos[1], 82, 59);

      this.move();
      this.checkCollision();

      if (this.pos[0] < 300) {
        this.game.addObstacle();
      }

      if (this.game.score > 500 && this.game.score < 1000) {
        this.speed = 4;
      }

      if (this.game.score >= 1000) {
        this.speed = 5;
      }
    }
  }, {
    key: "move",
    value: function move() {
      this.pos[0] -= this.speed;
    }
  }, {
    key: "distance",
    value: function distance(num1, num2) {
      var a = num2[0] - num1[0];
      var b = num2[1] - num1[1];

      var c = Math.floor(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
      return c;
    }
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      if (this.distance(this.pos, this.game.chuka.pos) < 80) {
        console.log("its colliding");
        this.game.gameOver();
      }
    }
  }]);

  return Obstacle;
}();

module.exports = Obstacle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ship = function () {
  function Ship(options) {
    _classCallCheck(this, Ship);

    this.speedx = options.speed[0];
    this.game = options.game;
    this.pos = options.pos;
    this.speedy = options.speed[1];
    this.tailpos = [750, 375];
  }

  _createClass(Ship, [{
    key: "draw",
    value: function draw(ctx) {
      var imageRepository = new function () {
        this.ship = new Image();
        this.ship.src = "assets/ship.png";
      }();

      ctx.drawImage(imageRepository.ship, this.pos[0], this.pos[1], 124, 125);

      this.move();
      if (!this.game.chuka.ducking && !this.game.chuka.jumping) {
        this.checkCollision();
        this.checkHeadCollision();
      }

      if (!this.game.chuka.ducking && this.game.chuka.jumping) {
        this.checkCollision();
      }

      if (this.pos[1] > 275) {
        this.speedy = -this.speedy;
      } else if (this.pos[1] < 50) {
        this.speedy = -this.speedy;
      }

      if (this.pos[0] < -40 && this.game.score < 2000) {
        this.game.addShip();
      } else if (this.pos[0] < -100 && this.game.score >= 2000) {
        this.game.addShip();
      }
    }
  }, {
    key: "move",
    value: function move() {
      if (this.game.score > 1450) {
        this.pos[0] -= this.speedx;
        this.pos[1] -= this.speedy;
        this.tailpos[0] -= this.speedx;
        this.tailpos[1] -= this.speedy;
      }
    }
  }, {
    key: "distance",
    value: function distance(num1, num2) {
      var a = num2[0] - num1[0];
      var b = num2[1] - num1[1];
      var c = Math.floor(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
      return c;
    }
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      if (this.distance(this.pos, this.game.chuka.pos) < 60) {
        this.game.gameOver();
      }
    }
  }, {
    key: "checkHeadCollision",
    value: function checkHeadCollision() {
      if (this.distance(this.tailpos, this.game.chuka.headpos) < 10) {
        this.game.gameOver();
      }
    }
  }]);

  return Ship;
}();

module.exports = Ship;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(0);
var GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  var ctx = canvasEl.getContext("2d");
  var game = new Game();
  new GameView(game, ctx).start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map