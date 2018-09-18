/**
 * Create the Enemy ship object.
 */
function Enemy(object) {
  var showObstaclePercent = .1;
  var self = object;
  this.alive = false;
  var chance = 0;

  // setting the enemy values
  this.spawn = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
  };

  /*
	 * Returns true if the bullet moved of the screen, indicating that
	 * the bullet is ready to be cleared by the pool, otherwise draws
	 * the bullet.
	 */
   this.draw = function() {
     this.context.clearRect(this.x-1, this.y-1, this.width+1, this.height+1);
     this.y -= this.speed;
     // if (self === "woodenStump" && this.y <= 0 - this.height) {
     //   return true;
     // }
     // else if (self === "woodenLog" && this.y >= this.canvasHeight) {
     //   return true;
     // }
     // else if (self === "bird" && this.y >= this.canvasHeight) {
     //   return true;
     // }
     // else {
     //   if (self === "woodenStump") {
     //     this.context.drawImage(imageRepository.woodenStump, this.x, this.y);
     //   }
     //   else if (self === "woodenLog") {
     //     this.context.drawImage(imageRepository.woodenLog, this.x, this.y);
     //   }
     //   else if (self === "bird") {
     //     this.context.drawImage(imageRepository.bird, this.x, this.y);
     //   }
     //   return false;
     // }
     // Enemy has a chance to shoot every movement
		chance = Math.floor(Math.random()*101);
		if (chance/100 < showObstaclePercent) {
      var temp = Math.floor(Math.random()*3);
      if(temp == 0){
        this.context.drawImage(imageRepository.woodenStump, this.x, this.y);
        game.stumpPool.get(this.x+this.width/2, this.y+this.height, -2.5);
      }
      else if(temp == 1){
        this.context.drawImage(imageRepository.woodenLog, this.x, this.y);
        game.logPool.get(this.x+this.width/2, this.y+this.height, -2.5);
      }
      else{
        this.context.drawImage(imageRepository.bird, this.x, this.y);
        game.birdPool.get(this.x+this.width/2, this.y+this.height, -2.5);
      }
		}
   };

   //reseting the enemy values
   this.clear = function() {
     this.x = 0;
     this.y = 0;
     this.speed = 0;
     this.alive = false;
   };

}
Enemy.prototype = new Drawable();



/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent
 * garbage collection.
 * The pool works as follows:
 * - When the pool is initialized, it popoulates an array with
 *   Bullet objects.
 * - When the pool needs to create a new object for use, it looks at
 *   the last item in the array and checks to see if it is currently
 *   in use or not. If it is in use, the pool is full. If it is
 *   not in use, the pool "spawns" the last item in the array and
 *   then pops it from the end and pushed it back onto the front of
 *   the array. This makes the pool have free objects on the back
 *   and used objects in the front.
 * - When the pool animates its objects, it checks to see if the
 *   object is in use (no need to draw unused objects) and if it is,
 *   draws it. If the draw() function returns true, the object is
 *   ready to be cleaned so it "clears" the object and uses the
 *   array function splice() to remove the item from the array and
 *   pushes it to the back.
 * Doing this makes creating/destroying objects in the pool
 * constant.
 */
function Pool(maxSize) {
	var size = maxSize; // Max bullets allowed in the pool
	var pool = [];

	/*
	 * Populates the pool array with the given object
	 */
	this.init = function(object) {
		if (object == "woodenStump") {
			for (var i = 0; i < size; i++) {
				// Initalize the object
        var enemy = new Enemy("woodenStump");
				enemy.init(0,0, imageRepository.woodenStump.width, imageRepository.woodenStump.height);
				pool[i] = enemy;
			}
		}
		else if (object == "woodenLog") {
			for (var i = 0; i < size; i++) {
				var enemy = new Enemy("woodenLog");
				enemy.init(0,0, imageRepository.woodenLog.width, imageRepository.woodenLog.height);
				pool[i] = enemy;
			}
		}
		else if (object == "bird") {
			for (var i = 0; i < size; i++) {
        var enemy = new Enemy("bird");
				enemy.init(0,0, imageRepository.bird.width, imageRepository.bird.height);
				pool[i] = enemy;
			}
		}
	};

	/*
	 * Grabs the last item in the list and initializes it and
	 * pushes it to the front of the array.
	 */
	this.get = function(x, y, speed) {
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};

	/*
	 * Used for the ship to be able to get two bullets at once. If
	 * only the get() function is used twice, the ship is able to
	 * fire and only have 1 bullet spawn instead of 2.
	 */
	// this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
	// 	if(!pool[size - 1].alive && !pool[size - 2].alive) {
	// 		this.get(x1, y1, speed1);
	// 		this.get(x2, y2, speed2);
	// 	}
	// };

	/*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
	this.animate = function() {
		for (var i = 0; i < size; i++) {
			// Only draw until we find a bullet that is not alive
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}
