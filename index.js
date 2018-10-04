/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */

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
	// changed it from 2 -> 5 for the stump and log
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
	// onload this stump and log
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
	// setting thr images for the stump/log/enemy1
	this.enemy1.src = "imgs/bird.png";
  this.enemy2.src = "imgs/frog.png";
  this.enemy3.src = "imgs/panda.png";

}


function Drawable() {
	console.log("went in the drawable function");
	this.init = function(x, y, width, height) {
		// Defualt variables
		this.x = x;
		this.y = y;
		this.width = width*2.5;
		this.height = height*2.5;
	}
	this.speed = 0;
  this.canvasWidth = 0;
	this.canvasHeight = 0;
  this.collidableWith = "";
	this.isColliding = false;

	this.draw = function() {
	};
	this.move = function() {
	};
  this.isCollidableWith = function(object) {
		return (this.collidableWith === object.type);
	};
}

/**
* Creates the Game object which will hold all objects and data for
* the game.
*/
function Game() {
 /*
	* Gets canvas information and context and sets up all game
	* objects.
	* Returns true if the canvas is supported and false if it
	* is not. This is to stop the animation script from constantly
	* running on browsers that do not support the canvas.
	*/
 this.init = function() {
	 // Get the canvas elements
	 this.bgCanvas = document.getElementById('background');
	 this.animalCanvas = document.getElementById('animal');
	 // getting the canvas element for the stump/log (main)
	 this.enemyCanvas = document.getElementById('main');

	 // Test to see if canvas is supported. Only need to
	 // check one canvas
	 if (this.bgCanvas.getContext) {
		 this.bgContext = this.bgCanvas.getContext('2d');
		 this.animalContext = this.animalCanvas.getContext('2d');
		 // setting up the enemy Context for the main canvas
		 this.enemyContext = this.enemyCanvas.getContext('2d');

		 // Initialize objects to contain their context and canvas
		 // information
		 Background.prototype.context = this.bgContext;
		 Background.prototype.canvasWidth = this.bgCanvas.width;
		 Background.prototype.canvasHeight = this.bgCanvas.height;

		 Animal.prototype.context = this.animalContext;
		 Animal.prototype.canvasWidth = this.animalCanvas.width;
		 Animal.prototype.canvasHeight = this.animalCanvas.height;

		 // initialized the enemy object to conatin context and canvas info
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
		 var animalStartY = this.animalCanvas.height/4*3+20;
		 this.animal.init(animalStartX, animalStartY, imageRepository.animal.width,
										imageRepository.animal.height);


			// Initalize the pool
      this.enemy1Pool = new Pool(1);
			this.enemy1Pool.init("enemy1");

			this.enemy2Pool = new Pool(1);
			this.enemy2Pool.init("enemy2");

			this.enemy3Pool = new Pool(2);
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
     var y = this.enemyCanvas.height/4*3-50+20;
     console.log("enemy1");
     this.enemy1Pool.get(x,y,2);
	 }
	 else if(temp % 9 == 1){
		 var x = this.enemyCanvas.width - imageRepository.enemy2.width*(1/10)-10;
		 var y = this.enemyCanvas.height/4*3+100-50+20;
		 console.log("enemy2");
		 this.enemy2Pool.get(x,y,2);
	 }
	 else if(temp % 9 == 2){
     var x = this.enemyCanvas.width - imageRepository.enemy3.width*(1/20)-5;
		 var y = this.enemyCanvas.height/4*3+50-50+20;
     console.log("enemy3");
		 this.enemy3Pool.get(x,y,2);
	 }
 }
 };
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
			}
		}
	}
};


/**
* The animation loop. Calls the requestAnimationFrame shim to
* optimize the game loop and draws all game objects. This
* function must be a gobal function and cannot be within an
* object.
*/
function animate() {
  // Insert objects into quadtree
	game.quadTree.clear();
	game.quadTree.insert(game.animal);
	game.quadTree.insert(game.enemy1Pool.getPool());
	game.quadTree.insert(game.enemy2Pool.getPool());
	game.quadTree.insert(game.enemy3Pool.getPool());

  detectCollision();

  requestAnimFrame( animate );
  game.background.draw();
  game.animal.move();
  game.enemy1Pool.animate();
  game.enemy2Pool.animate();
  game.enemy3Pool.animate();
  game.loop();
}

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
