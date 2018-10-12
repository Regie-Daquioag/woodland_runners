/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background() {
	this.speed = 1; // Redefine speed of the background for panning

	this.init = function(x, y, width, height) {
		// Defualt variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	// Implement abstract function
	this.draw = function() {
		this.x += this.speed;

		this.context.drawImage(imageRepository.background, this.x, this.y);
		this.context.drawImage(imageRepository.background, this.canvasWidth-Math.abs(this.x), this.y);
		if(Math.abs(this.x) > this.canvasWidth){this.x = 0;}
		this.x -= 4;

	};
}
// Set Background to inherit properties from Drawable
// Background.prototype = new BaseObject();
