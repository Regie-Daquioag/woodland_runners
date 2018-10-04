 function Pool(maxSize) {
	var size = maxSize; // Max bullets allowed in the pool
	var pool = [];


  this.getPool = function() {
  		var obj = [];
  		for (var i = 0; i < size; i++) {
  			if (pool[i].alive) {
  				obj.push(pool[i]);
  			}
  		}
  		return obj;
  	}

	/*
	 * Populates the pool array with the given object
	 */
	this.init = function(object) {
    if (object == "bird") {
			for (var i = 0; i < size; i++) {
				var bird = new Enemy("bird");
				bird.init(0,0, imageRepository.bird.width, imageRepository.bird.height);
				pool[i] = bird;
			}
		}
		else if (object == "woodenStump") {
			for (var i = 0; i < size; i++) {
				var stump = new Enemy("woodenStump");
				stump.init(0,0, imageRepository.woodenStump.width, imageRepository.woodenStump.height);
				pool[i] = stump;
			}
		}
		else if (object == "woodenLog") {
			for (var i = 0; i < size; i++) {
				var log = new Enemy("woodenLog");
				log.init(0,0, imageRepository.woodenLog.width, imageRepository.woodenLog.height);
				pool[i] = log;
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
