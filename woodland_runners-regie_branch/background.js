/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background() {
	this.speed = 1; // Redefine speed of the background for panning
	// Implement abstract function
	this.draw = function() {

		///************************************************************************
		// // Pan background
		this.x += this.speed;
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
		this.x -= 4;
		///************************************************************************


	};
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();
