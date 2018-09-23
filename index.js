//animal
/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
var imageRepository = new function() {
	// Define images
	this.background = new Image();
	this.animal = new Image();
	// Ensure all images have loaded before starting the game
	var numImages = 2;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
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
	// Set images src
	this.background.src = "imgs/Background.png";
	this.animal.src = "imgs/rabbits/Rabbit_30.png";

}


function Drawable() {
	this.init = function(x, y, width, height) {
		// Defualt variables
		this.x = x;
		this.y = y;
		this.width = width*2;
		this.height = height*2;
	}
}

/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background() {
	// this.speed = 1; // Redefine speed of the background for panning
	// Implement abstract function
	this.draw = function() {
		///************************************************************************
		// // Pan background
		// this.x += this.speed;
		// this.context.drawImage(imageRepository.background, this.x, this.y);
		// // Draw another image at the top edge of the first image
		// this.context.drawImage(imageRepository.background, this.x-this.canvasWidth, this.y);
		// // If the image scrolled off the screen, reset
		// if (this.x >= this.canvasWidth)
		// 	this.x = 0;
		///************************************************************************

		// this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
		// this.context.fillStyle = '#333';
		// this.context.fillRect(0,0,this.canvasWidth,this.canvasHeight);
		this.context.drawImage(imageRepository.background, this.x, this.y);
		this.context.drawImage(imageRepository.background, this.canvasWidth-Math.abs(this.x), this.y);
		if(Math.abs(this.x) > this.canvasWidth){this.x = 0;}
		this.x -= 1; //change canves speed
		///************************************************************************

	};
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();

/**
 * Create the animal object that the player controls. The animal is
 * drawn on the "animal" canvas and uses dirty rectangles to move
 * around the screen.
 */
function Animal() {
	this.speed = 3;
	var counter = 0;
	this.draw = function() {
		// is this the position of where the animal wil be
		this.context.drawImage(imageRepository.animal, this.x, this.y,this.width,this.height);
	};
	this.move = function() {
		counter++;
		// Determine if the action is move action
		if (KEY_STATUS.left || KEY_STATUS.right ||
			KEY_STATUS.down || KEY_STATUS.up) {
			// The animal moved, so erase it's current image so it can
			// be redrawn in it's new location
			this.context.clearRect(this.x, this.y, this.width, this.height);
			if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*3)
					this.y = this.canvasHeight/4*3;
			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;
			}
			// Finish by redrawing the animal
			this.draw();
		}
	};
}
Animal.prototype = new Drawable();


// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
  38: 'up',
  40: 'down',
}
// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
KEY_STATUS = {};
for (code in KEY_CODES) {
  KEY_STATUS[ KEY_CODES[ code ]] = false;
}
/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function(e) {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
}
/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
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
	 // Test to see if canvas is supported. Only need to
	 // check one canvas
	 if (this.bgCanvas.getContext) {
		 this.bgContext = this.bgCanvas.getContext('2d');
		 this.animalContext = this.animalCanvas.getContext('2d');
		 // Initialize objects to contain their context and canvas
		 // information
		 Background.prototype.context = this.bgContext;
		 Background.prototype.canvasWidth = this.bgCanvas.width;
		 Background.prototype.canvasHeight = this.bgCanvas.height;
		 Animal.prototype.context = this.animalContext;
		 Animal.prototype.canvasWidth = this.animalCanvas.width;
		 Animal.prototype.canvasHeight = this.animalCanvas.height;
		 // Initialize the background object
		 this.background = new Background();
		 this.background.init(0,0); // Set draw point to 0,0
		 // Initialize the animal object
		 this.animal = new Animal();
		 // Set the animal to start near the bottom left of the canvas
		 var animalStartX = this.animalCanvas.width/12 - imageRepository.animal.width;
		 var animalStartY = this.animalCanvas.height/4*3;
		 this.animal.init(animalStartX, animalStartY, imageRepository.animal.width,
										imageRepository.animal.height);
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


/* Counting setInterval() Method */
function myFunction() {
    setInterval(function(){ alert("Hello"); }, 3000);
}


//********************************************

var seconds = 0,
	t;

function add() {
    seconds++;
    document.getElementById("stopwatch").textContent = seconds + '';

    timer();
}

function timer() {
	//time
	t = setTimeout(add, 10);

}


/* Start button */
//start.onclick = timer;

/* Stop button */
function stop()  {
	this.init = function() {
	//need this code inside just to end timer
    clearTimeout(t);
};
}

/* Clear button */
function clear() {
	this.init = function() {
		//restart timer
	    document.getElementById("stopwatch").textContent = "000000";
	    seconds = 0;
	};
}

var game = new Game();
function init() {
	if(game.init())
		game.start();
		timer();
}

