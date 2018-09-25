/**
 * Create the Enemy ship object.
 */
function Enemy() {
  console.log("went in the enemy function");
	var percentFire = .01;
	var chance = 0;
	this.alive = false;

	/*
	 * Sets the Enemy values
	 */
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;
		this.leftEdge = this.x - 90;
		this.rightEdge = this.x + 90;
		this.bottomEdge = this.y + 140;
	};

	/*
	 * Move the enemy
	 */
	this.draw = function() {
		this.context.clearRect(this.x, this.y, this.width, this.height);


		// this.x += this.speedX;
		// // this.y += this.speedY;
		// if (this.x <= this.leftEdge) {
		// 	this.speedX = this.speed;
		// }
		// else if (this.x >= this.rightEdge + this.width) {
		// 	this.speedX = -this.speed;
		// }
		// else if (this.y >= this.bottomEdge) {
		// 	this.speed = 1.5;
		// 	this.speedY = 0;
		// 	this.y -= 5;
		// 	this.speedX = -this.speed;
		// }

		this.context.drawImage(imageRepository.bird, this.x, this.y);

	};

	/*
	 * Resets the enemy values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
	};
}
Enemy.prototype = new Drawable();
