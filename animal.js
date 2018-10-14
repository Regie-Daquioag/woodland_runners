function Animal() {
	this.speed = 0.5;
	this.collidableWith = "enemy";
	this.type = "animal";

	// Defualt variables
	this.init = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width*2;
	this.height = height*2;
	this.alive = true;
	this.isColliding = false;
}

	this.draw = function() {
		this.context.drawImage(imageRepository.animal, this.x, this.y,this.width,this.height);
	};
	this.move = function() {
			this.context.clearRect(this.x, this.y, this.width, this.height);

			if (KEY_STATUS.up) {
				// mid-to-top
				if(this.y <= this.canvasHeight/4*3 + this.height && this.y > this.canvasHeight/4*3){
					this.y = this.canvasHeight/4*3;
				}
			}
			else if (KEY_STATUS.down) {
				// mid-to-bot
				if(this.y >= this.canvasHeight/4*3 + this.height && this.y < this.canvasHeight - this.height){
					this.y = this.canvasHeight - this.height;
				}
			}
			else{
				this.y = this.canvasHeight/4*3 + this.height;
			}
			
			// Redraw the ship
		if (!this.isColliding) {
			this.draw();
		}
		else {
			this.alive = false;
			game.gameOver();
		}
	};
}


KEY_STATUS = {
	up:false,
	down:false,

	keyListener:function(event){
		var key_state = (event.type == "keydown")?true:false;
		switch(event.keyCode) {
			case 38:// up key
				KEY_STATUS.up = key_state;
				break;
			case 40: // down key
				KEY_STATUS.down = key_state;
				break;
		}
	}
};


window.addEventListener("keydown", KEY_STATUS.keyListener);
window.addEventListener("keyup", KEY_STATUS.keyListener);
