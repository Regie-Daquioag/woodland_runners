function Enemy(object) {
  var self = object;
	this.alive = false;
  this.collidableWith = "animal";
	this.type = "enemy";

  this.init = function(x, y, width, height) {
  // Defualt variables
  this.x = x;
  this.y = y;
  this.width = width*2;
  this.height = height*2;
  this.isColliding = false;
}

	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;

	};

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
        this.context.drawImage(imageRepository.enemy2, this.x, this.y,this.width, this.height);
      }
      else if (self === "enemy3") {
        this.context.drawImage(imageRepository.enemy3, this.x, this.y, this.width, this.height);
      }
      return false;
    }
	};

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
