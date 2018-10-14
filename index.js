var game = new Game();
 function init() {
 	if(game.init())
	console.log("game started");
 		game.start();
 }

 // Image factory
 var createImage = function(src) {
   var img = new Image();
   img.src = src;
   return img;
 };

var imageRepository = new function() {
	// Define images
	this.background = new Image();
	this.animal = new Image();
	// defined the enemy images
  this.enemy1 = new Image();
	this.enemy2 = new Image();
	this.enemy3 = new Image();

	var numImages = 5;
	var numLoaded = 0;

	function imageLoaded() {
		numLoaded++;
		console.log("loaded image #"+numLoaded);
		if (numLoaded === numImages) {
			window.init();
		}
	}

	this.background.onload = function() {
		imageLoaded();
	}
	this.animal.onload = function() {
		imageLoaded();
	}
  this.enemy1.onload = function() {
    imageLoaded();
  }
	this.enemy2.onload = function() {
		imageLoaded();
	}
	this.enemy3.onload = function() {
		imageLoaded();
	}

	// Set images src
	this.background.src = "imgs/Forest-Game-Background.png";
	this.animal.src = "imgs/rabbits/Rabbit_1.png";
	this.enemy1.src = "imgs/bird.png";
  this.enemy2.src = "imgs/frog.png";
  this.enemy3.src = "imgs/panda.png";

}

function Game() {
 this.init = function() {
	 // Get the canvas elements
	 this.bgCanvas = document.getElementById('background');
	 this.animalCanvas = document.getElementById('animal');
	 this.enemyCanvas = document.getElementById('main');

	 // Test to see if canvas is supported. Only need to
	 // check one canvas
	 if (this.bgCanvas.getContext) {
		 this.bgContext = this.bgCanvas.getContext('2d');
		 this.animalContext = this.animalCanvas.getContext('2d');
		 this.enemyContext = this.enemyCanvas.getContext('2d');

		 // Initialize objects to contain their context and canvas
		 // information
		 Background.prototype.context = this.bgContext;
		 Background.prototype.canvasWidth = this.bgCanvas.width;
		 Background.prototype.canvasHeight = this.bgCanvas.height;

		 Animal.prototype.context = this.animalContext;
		 Animal.prototype.canvasWidth = this.animalCanvas.width;
		 Animal.prototype.canvasHeight = this.animalCanvas.height;

		 Enemy.prototype.context = this.enemyContext;
		 Enemy.prototype.canvasWidth = this.enemyCanvas.width;
		 Enemy.prototype.canvasHeight = this.enemyCanvas.height;

		 // Initialize the background object
		 this.background = new Background();
		 this.background.init(0,0); // Set draw point to 0,0
		 // Initialize the animal object
		 this.animal = new Animal();
		 // Set the animal to start near the bottom left of the canvas
		 var animalStartX = this.animalCanvas.width/12 - imageRepository.animal.width;
		 var animalStartY = this.animalCanvas.height/4*3+imageRepository.animal.width*2;
		 this.animal.init(animalStartX, animalStartY, imageRepository.animal.width,
										imageRepository.animal.height);


			// Initalize the pool
      this.enemy1Pool = new Pool(1);
			this.enemy1Pool.init("enemy1");

			this.enemy2Pool = new Pool(1);
			this.enemy2Pool.init("enemy2");

			this.enemy3Pool = new Pool(1);
			this.enemy3Pool.init("enemy3");

      // Start QuadTree
      this.quadTree = new QuadTree({x:0,y:0,width:this.enemyCanvas.width,height:this.enemyCanvas.height});


			return true;
				} else {
			return false;
				}
 };
 // Start the animation loop
 this.start = function() {
	 this.animal.draw();
	 animate();
 };

 this.loop = function(){
	 var chance = Math.floor(Math.random()*161);
	 // console.log("chance = "+chance);
	 if (chance % 15 == 0) {
	 var temp = Math.floor(Math.random()*25+1);
   if(temp % 9 == 0){
     var x = this.enemyCanvas.width - imageRepository.enemy1.width;
     var y = this.enemyCanvas.height/4*3/*-50+20*/;
     // console.log("bird"+y);
     this.enemy1Pool.get(x,y,2);
	 }
	 else if(temp % 9 == 1){
     var x = this.enemyCanvas.width - imageRepository.enemy3.width;
     var y = this.enemyCanvas.height/4*3 + imageRepository.enemy2.height*2/*+50-50+20*/;
		 // console.log("frog"+y);
		 this.enemy2Pool.get(x,y,2);
	 }
	 else if(temp % 9 == 2){
     var x = this.enemyCanvas.width - imageRepository.enemy2.width;
		 var y = this.enemyCanvas.height  - imageRepository.enemy2.height*2 /*/4*3+100-50+20*/;
     // console.log("panda"+y);
		 this.enemy3Pool.get(x,y,2);
	 }
 }
 };

 // // Restart the game
 // this.restart = function() {
 //   this.gameOverAudio.pause();
 //
 //   document.getElementById('game-over').style.display = "none";
 //   this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
 //   this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
 //   this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
 //
 //   this.quadTree.clear();
 //
 //   this.background.init(0,0);
 //   this.ship.init(this.shipStartX, this.shipStartY,
 //                  imageRepository.spaceship.width, imageRepository.spaceship.height);
 //
 //   this.enemyPool.init("enemy");
 //   this.spawnWave();
 //   this.enemyBulletPool.init("enemyBullet");
 //
 //   this.playerScore = 0;
 //
 //   this.backgroundAudio.currentTime = 0;
 //   this.backgroundAudio.play();
 //
 //   this.start();
 // };
 //
 // // Game over
 // this.gameOver = function() {
 //   this.backgroundAudio.pause();
 //   this.gameOverAudio.currentTime = 0;
 //   this.gameOverAudio.play();
 //   document.getElementById('game-over').style.display = "block";
 // };

}

function animate() {
  // Insert objects into quadtree
	game.quadTree.clear();
	game.quadTree.insert(game.animal);
	game.quadTree.insert(game.enemy1Pool.getPool());
	game.quadTree.insert(game.enemy2Pool.getPool());
	game.quadTree.insert(game.enemy3Pool.getPool());


  if(game.animal.alive){

    detectCollision();

    requestAnimFrame( animate );
    game.background.draw();
    game.animal.move();
    game.enemy1Pool.animate();
    game.enemy2Pool.animate();
    game.enemy3Pool.animate();
    game.loop();
  }
}

function detectCollision() {
	var objects = [];
	game.quadTree.getAllObjects(objects);

	for (var x = 0, len = objects.length; x < len; x++) {
		game.quadTree.findObjects(obj = [], objects[x]);

		for (var y = 0, length = obj.length; y < length; y++) {

			// DETECT COLLISION ALGORITHM
			if (objects[x].collidableWith === obj[y].type &&
				(objects[x].x < obj[y].x + obj[y].width &&
			     objects[x].x + objects[x].width > obj[y].x &&
				 objects[x].y < obj[y].y + obj[y].height &&
				 objects[x].y + objects[x].height > obj[y].y)) {
				objects[x].isColliding = true;
				obj[y].isColliding = true;
        game.animal.alive = false;
			}

		}
	}
};

window.requestAnimFrame = function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
}();
