/**
 * Create the Enemy ship object.
 */
function Enemy(object) {
  	console.log("went in the enemy function");
  // var showObstaclePercent = .1;
  var self = object;
  // var chance = 0;
  this.alive = false;

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
     console.log("went in the enemy draw function");
     this.context.clearRect(this.x-1, this.y-1, this.width+1, this.height+1);
     this.y -= this.speed;
     if (self === "woodenStump" && this.y <= 0 - this.height) {
       return true;
     }
     else if (self === "woodenLog" && this.y >= this.canvasHeight) {
       return true;
     }
     else if (self === "bird" && this.y >= this.canvasHeight) {
       return true;
     }
     else {
       if (self === "woodenStump") {
         this.context.drawImage(imageRepository.woodenStump, this.x, this.y);
       }
       else if (self === "woodenLog") {
         this.context.drawImage(imageRepository.woodenLog, this.x, this.y);
       }
       else if (self === "bird") {
         this.context.drawImage(imageRepository.bird, this.x, this.y);
       }
       return false;
     }

    //  // Enemy has a chance to shoot every movement
    // //
		// // chance = Math.floor(Math.random()*101);
		// // if (chance/100 < showObstaclePercent) {
    //
    // chance = Math.floor(Math.random()*3);
    // if (chance == 1) {
    //   var temp = Math.floor(Math.random()*3);
    //   if(temp == 0){
    //     this.context.drawImage(imageRepository.woodenStump, this.x, this.y);
    //     game.stumpPool.get(this.x+this.width/2, this.y+this.height, -2.5);
    //   }
    //   else if(temp == 1){
    //     this.context.drawImage(imageRepository.woodenLog, this.x, this.y);
    //     game.logPool.get(this.x+this.width/2, this.y+this.height, -2.5);
    //   }
    //   else{
    //     this.context.drawImage(imageRepository.bird, this.x, this.y);
    //     game.birdPool.get(this.x+this.width/2, this.y+this.height, -2.5);
    //   }
		// }
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
