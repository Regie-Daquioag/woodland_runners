
/**
 * Create the animal object that the player controls. The animal is
 * drawn on the "animal" canvas and uses dirty rectangles to move
 * around the screen.
 */
function Animal() {
	this.speed = 0.5;
	this.collidableWith = "enemy";
	this.type = "animal";

	this.init = function(x, y, width, height) {
	// Defualt variables
	this.x = x;
	this.y = y;
	this.width = width*2;
	this.height = height*2;
	this.alive = true;
	this.isColliding = false;
}

	this.draw = function() {
		// is this the position of where the animal wil be
		this.context.drawImage(imageRepository.animal, this.x, this.y,this.width,this.height);
	};
	this.move = function() {
		// Determine if the action is move action
		if (KEY_STATUS.down || KEY_STATUS.up) {
			// The animal moved, so erase it's current image so it can
			// be redrawn in it's new location
			this.context.clearRect(this.x, this.y, this.width, this.height);

			if (KEY_STATUS.up) {

				// bot-to-mid
				if(this.y <= this.canvasHeight - this.height && this.y > this.canvasHeight/4*3 + this.height ){
					this.y = this.canvasHeight/4*3 + this.height;
				}

				// mid-to-top
				else if(this.y <= this.canvasHeight/4*3 + this.height && this.y > this.canvasHeight/4*3){
					this.y = this.canvasHeight/4*3;
				}

				// if (this.y <= this.canvasHeight/4*3 /*|| animalPosition == "bottom"*/){
				// 	this.y = this.canvasHeight/4*3;
				// 	// animalPosition = "top";
				// 	// console.log(animalPosition);
				// }
				// else{
				// 	this.y -= this.speed;
				// }


			}
			else if (KEY_STATUS.down) {

				// mid-to-bot
				if(this.y >= this.canvasHeight/4*3 + this.height && this.y < this.canvasHeight - this.height){
					this.y = this.canvasHeight - this.height;
				}

				// top-to-mid
				else if(this.y >= this.canvasHeight/4*3 && this.y < this.canvasHeight/4*3 + this.height){
					this.y = this.canvasHeight/4*3 + this.height;
				}

				// if (this.y >= this.canvasHeight - this.height /*|| animalPosition == "top"*/){
				// 	this.y = this.canvasHeight - this.height;
				// 	// animalPosition = "bottom";
				// 	// console.log(animalPosition);
				// }
				// else{
				// 	this.y += this.speed;
				// }

			}
			// 	// Finish by redrawing the animal
			// 	if (!this.isColliding) {
			// 		this.draw();
			// 	}
			// 	else {
			// 	this.alive = false;
			// 	// game.gameOver();
			// 	// this.draw();
			// }

			this.draw();

		}
	};
}
Animal.prototype = new BaseObject();


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


/*
var controller = {
	up:false,
	down:false,

	keyListener:function(event) {
		var key_state = (event.type == "keydown")?true:false;
		switch(event.keyCode) {
			case 38:// up key
				controller.up = key_state;
			break;
			case 40: // down key
				controller.down = key_state;
			break;
		}
	}
};

*/
