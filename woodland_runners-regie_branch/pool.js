
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
				var stump = new Enemy("woodenStump");
				stump.init(0,0, imageRepository.woodenStump.width, imageRepository.woodenStump.height);
				pool[i] = stump;
			}
		}
		else if (object == "bird") {
			for (var i = 0; i < size; i++) {
				var bird = new Enemy("bird");
				bird.init(0,0, imageRepository.bird.width, imageRepository.bird.height);
				pool[i] = bird;
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
