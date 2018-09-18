/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */

 var game = new Game();
 function init() {
 	if(game.init())
 		game.start();
 }



 // Image factory
 var createImage = function(src) {
   var img   = new Image();
   img.src   = src;
   return img;
 };



var imageRepository = new function() {

	// Define images
	this.background = new Image();
	this.animal = new Image();
	// defined the enemy images
	this.woodenStump = new Image();
	this.woodenLog = new Image();
	this.bird = new Image();
	// changed it from 2 -> 5 for the stump and log
	var numImages = 5;
	var numLoaded = 0;

	function imageLoaded() {
		numLoaded++;
		// console.log(numLoaded);
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
	this.woodenStump.onload = function() {
		imageLoaded();
	}
	this.woodenLog.onload = function() {
		imageLoaded();
	}
	this.bird.onload = function() {
		imageLoaded();
	}

	// Set images src
	this.background.src = "imgs/Background.png";
	this.animal.src = "imgs/rabbits/Rabbit_1.png";
	// setting thr images for the stump/log/bird
	this.woodenStump.src = "imgs/stump2.png";
	this.woodenLog.src = "imgs/log.png";
	this.bird.src = "imgs/Penguin_13.png";

}


function Drawable() {
	this.init = function(x, y, width, height) {
		// Defualt variables
		this.x = x;
		this.y = y;
		this.width = width*2;
		this.height = height*2;
	}
	this.speed = 0;

	this.draw = function() {
	};
	this.move = function() {
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
		 var animalStartY = this.animalCanvas.height/4*3+50;
		 this.animal.init(animalStartX, animalStartY, imageRepository.animal.width,
										imageRepository.animal.height);


			// Initalize the pool(stumps/logs/bird)
			this.stumpPool = new Pool(2);
			this.stumpPool.init("woodenStump");

			this.logPool = new Pool(2);
			this.logPool.init("woodenLog");

			this.birdPool = new Pool(2);
			this.birdPool.init("bird");




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
}

/**
* The animation loop. Calls the requestAnimationFrame shim to
* optimize the game loop and draws all game objects. This
* function must be a gobal function and cannot be within an
* object.
*/
function animate() {
 requestAnimFrame( animate );
 game.background.draw();
 game.animal.move();
 game.stumpPool.animate();
 game.logPool.animate();
 game.birdPool.animate();
}


window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();
