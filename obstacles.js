/**
 * Create the Enemy ship object.
 */
function Enemy(object) {
  console.log("went in the enemy function");
	var percentFire = .01;
	var chance = 0;
  var self = object;
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

	};

	/*
	 * Move the enemy
	 */
	this.draw = function() {
		this.context.clearRect(this.x, this.y, this.width, this.height);

    this.x -= this.speed;
    if(self == "bird" && this.x <= 0 - this.width){
      return true;
    }
    else if(self == "woodenStump" && this.x <= 0 - this.width){
      return true;
    }
    else if(self == "woodenLog" && this.x <= 0 - this.width){
      return true;
    }
    else{
      if (self === "bird") {
        this.context.drawImage(imageRepository.bird, this.x, this.y, this.width, this.height);
      }
      else if (self === "woodenStump") {
        this.context.drawImage(imageRepository.woodenStump, this.x, this.y,this.width/*(1/15)-10*/, this.height/**(1/15)-10*/);
      }
      else if (self === "woodenLog") {
        this.context.drawImage(imageRepository.woodenLog, this.x, this.y, this.width/*(1/20)-10*/, this.height/*(1/20)-10*/);
      }
      return false;
    }
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
