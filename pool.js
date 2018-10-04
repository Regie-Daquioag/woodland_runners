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
    if (object == "enemy1") {
			for (var i = 0; i < size; i++) {
				var enemy1 = new Enemy("enemy1");
				enemy1.init(0,0, imageRepository.enemy1.width, imageRepository.enemy1.height);
				pool[i] = enemy1;
			}
		}
		else if (object == "enemy2") {
			for (var i = 0; i < size; i++) {
				var enemy2 = new Enemy("enemy2");
				enemy2.init(0,0, imageRepository.enemy2.width, imageRepository.enemy2.height);
				pool[i] = enemy2;
			}
		}
		else if (object == "enemy3") {
			for (var i = 0; i < size; i++) {
				var enemy3 = new Enemy("enemy3");
				enemy3.init(0,0, imageRepository.enemy3.width, imageRepository.enemy3.height);
				pool[i] = enemy3;
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
