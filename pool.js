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

	this.init = function(object) {
    if (object == "enemy1") {
			for (var i = 0; i < size; i++) {
				var enemy1 = new Enemy("enemy1");
				enemy1.init(0,0, imageRepository.enemy1.width, imageRepository.enemy1.height);
        enemy1.collidableWith = "animal";
				enemy1.type = "enemy";
				pool[i] = enemy1;
			}
		}
		else if (object == "enemy2") {
			for (var i = 0; i < size; i++) {
				var enemy2 = new Enemy("enemy2");
				enemy2.init(0,0, imageRepository.enemy2.width, imageRepository.enemy2.height);
        enemy2.collidableWith = "animal";
				enemy2.type = "enemy";
				pool[i] = enemy2;
			}
		}
		else if (object == "enemy3") {
			for (var i = 0; i < size; i++) {
				var enemy3 = new Enemy("enemy3");
				enemy3.init(0,0, imageRepository.enemy3.width, imageRepository.enemy3.height);
        enemy3.collidableWith = "animal";
				enemy3.type = "enemy";
				pool[i] = enemy3;
			}
		}
	};

	this.get = function(x, y, speed) {
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};

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
