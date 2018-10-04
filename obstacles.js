/**
 * Create the Enemy ship object.
 */
function Enemy(object) {
	var percentFire = .01;
	var chance = 0;
  var self = object;
	this.alive = false;
  this.collidableWith = "animal";
	this.type = "enemy";

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

    if (this.isColliding) {
			return true;
		}
    else if(self == "enemy1" && this.x <= 0 - this.width){
      return true;
    }
    else if(self == "enemy2" && this.x <= 0 - this.width){
      return true;
    }
    else if(self == "enemy3" && this.x <= 0 - this.width){
      return true;
    }
    else{
      if (self === "enemy1") {
        this.context.drawImage(imageRepository.enemy1, this.x, this.y, this.width, this.height);
      }
      else if (self === "enemy2") {
        this.context.drawImage(imageRepository.enemy2, this.x, this.y,this.width/*(1/15)-10*/, this.height/**(1/15)-10*/);
      }
      else if (self === "enemy3") {
        this.context.drawImage(imageRepository.enemy3, this.x, this.y, this.width/*(1/20)-10*/, this.height/*(1/20)-10*/);
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
    this.isColliding = false;
	};
}
Enemy.prototype = new Drawable();
