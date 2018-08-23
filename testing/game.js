var game;

game = {

  distance:0,
  max_distance:0,
  speed:3,

  area: {

    columns:17,
    offset:0,
    map:[ 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0,
          0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1,
          1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1,
          1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
          0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0,
          1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0,
          1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0,
          2, 2, 2, 3, 2, 2, 3, 2, 4, 6, 7, 7, 6, 9, 2, 3, 2,
         10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],

    /* Takes care of scrolling the background and generating the next column to
    display on the far right of the map. */
    scroll:function() {

      game.distance += game.speed;

      if (game.distance > game.max_distance) game.max_distance = game.distance;

      this.offset += game.speed;
      if (this.offset >= TILE_SIZE) {

        this.offset -= TILE_SIZE;

        /* This loop removes the first column and inserts a randomly generated
        last column for the top 7 rows. This handles random sky generation. */
        for (let index = this.map.length - this.columns * 3 ; index > -1; index -= this.columns) {

          this.map.splice(index, 1);
          this.map.splice(index + this.columns - 1, 0, Math.floor(Math.random() * 2));

        }

        /* This next part replaces the grass with an appropriate grass tile. I
        made it a bit more complex than it needed to be, but the tiles actually
        reconcile their edges with the tile directly to the left. */
        this.map.splice(this.columns * 7, 1);

        let right_index = this.columns * 8 - 1;
        let value = this.map[right_index - 1];

        switch(value) {

          case 2: case 3: value = [2, 3, 2, 3, 2, 3, 2, 3, 4, 5][Math.floor(Math.random() * 10)]; break;
          case 4: case 5: value = [6, 7][Math.floor(Math.random() * 2)]; break;
          case 6: case 7: value = [6, 7, 8, 9][Math.floor(Math.random() * 4)]; break;
          case 8: case 9: value = [2, 3][Math.floor(Math.random() * 2)]; break;

        }

        this.map.splice(right_index, 0, value);

        // The last row stays the same. It's just dirt.

      }

    }

  },

  engine: {

    /* Fixed time step game loop!! */
    afrequest:undefined,// animation frame request reference
    accumulated_time:window.performance.now(),
    time_step:1000/60,// update rate

    loop:function(time_stamp) {

      /* How easy does this look? This is a fixed step loop with frame dropping.
      Amazingly it's super simple and only a few lines. This will make your game
      run at the same speed on all devices. Now that I look at it, I think there
      may be a better way to implement this because entire frames can be dropped
      without updating or rendering. Rather than fixing this now, I will just leave it.
      Ideally, I would utilize the free time and not do both updates and renderings
      at the same time unless I have to... Another day... This does work fine, though. */
      if (time_stamp >= game.engine.accumulated_time + game.engine.time_step) {

        if (time_stamp - game.engine.accumulated_time >= game.engine.time_step * 4) {

          game.engine.accumulated_time = time_stamp;

        }

        while(game.engine.accumulated_time < time_stamp) {

          game.engine.accumulated_time += game.engine.time_step;

          game.engine.update();

        }

        display.render();

      }

      window.requestAnimationFrame(game.engine.loop);

    },

    start:function() {// Start the game loop.

      this.afrequest = window.requestAnimationFrame(this.loop);

    },

    update:function() {// Update the game logic.

      /* Slowly increase speed and cap it when it gets too high. */
      game.speed = (game.speed >= TILE_SIZE * 0.5)? TILE_SIZE * 0.5 : game.speed + 0.001;
      /* Make sure the player's animation delay is keeping up with the scroll speed. */
      game.player.animation.delay = Math.floor(10 - game.speed);
      game.area.scroll();// Scroll!!!

      if (game.player.alive) {

        if (controller.active && !game.player.jumping) {// Get user input

          controller.active = false;
          game.player.jumping = true;
          game.player.y_velocity -= 15;
          game.player.animation.change([10], 15);

        }

        if (game.player.jumping == false) {

          game.player.animation.change(display.tile_sheet.frame_sets[3], Math.floor(TILE_SIZE - game.speed));

        }

        game.player.update();

        if (game.player.y > TILE_SIZE * 6 - TILE_SIZE * 0.25) {// Collide with floor

          controller.active = false;
          game.player.y = TILE_SIZE * 6 - TILE_SIZE * 0.25;
          game.player.y_velocity = 0;
          game.player.jumping = false;

        }

      } else {

        game.player.x -= game.speed;
        game.speed *= 0.9;

        if (game.player.animation.frame_index == game.player.animation.frame_set.length - 1) game.reset();

      }

      game.player.animation.update();

      game.object_manager.spawn();
      game.object_manager.update();

    }

  },

  /* Manages all non player objects. */
  object_manager: {

    count:0,
    delay:100,

    meteor_pool:new Pool(Meteor),
    smoke_pool:new Pool(Smoke),
    tarpit_pool:new Pool(TarPit),

    spawn:function() {

      this.count ++;

      if (this.count == this.delay) {

        this.count = 0;
        this.delay = 100;// + Math.floor(Math.random() * 200 - 10 * game.speed);

        /* Pick randomly between tarpits and meteors */
        if (Math.random() > 0.5) {

          this.tarpit_pool.get( {x: WORLD_WIDTH, y:WORLD_HEIGHT - 30} );

        } else {

          this.meteor_pool.get( {x: WORLD_WIDTH * 0.2, y: -32 } );

        }

      }

    },

    update:function() {

      for (let index = this.meteor_pool.objects.length - 1; index > -1; -- index) {

        let meteor = this.meteor_pool.objects[index];

        meteor.update();

        meteor.collideObject(game.player);

        meteor.collideWorld();

        if (meteor.smoke) {

          meteor.smoke = false;

          let parameters = { x:meteor.x + Math.random() * meteor.width, y:undefined, x_velocity:undefined, y_velocity:undefined };

          if (meteor.grounded) {

            parameters.y = meteor.y + Math.random() * meteor.height * 0.5;
            parameters.x_velocity = Math.random() * 2 - 1 - game.speed;
            parameters.y_velocity = Math.random() * -1;

          } else {

            parameters.y = meteor.y + Math.random() * meteor.height;
            parameters.x_velocity = meteor.x_velocity * Math.random();
            parameters.y_velocity = meteor.y_velocity * Math.random();

          }

          this.smoke_pool.get(parameters);

        }

        if (!meteor.alive) {

          this.meteor_pool.store(meteor);

        };

      }

      for (let index = this.smoke_pool.objects.length - 1; index > -1; -- index) {

        let smoke = this.smoke_pool.objects[index];

        smoke.update();

        smoke.collideWorld();

        if (!smoke.alive) this.smoke_pool.store(smoke);

      }

      for (let index = this.tarpit_pool.objects.length - 1; index > -1; -- index) {

        let tarpit = this.tarpit_pool.objects[index];

        tarpit.update();

        tarpit.collideObject(game.player);

        tarpit.collideWorld();

        if (!tarpit.alive) this.tarpit_pool.store(tarpit);

      }

    }

  },

  player: {

    alive:true,
    animation:new Animation([15], 10),
    jumping:false,
    height: 32, width: 56,
    x:8, y:TILE_SIZE * 6 - TILE_SIZE * 0.25,
    y_velocity:0,

    reset:function() {

      this.alive = true;
      this.x = 8;

    },

    update:function() {

      game.player.y_velocity += 0.5;
      game.player.y += game.player.y_velocity;
      game.player.y_velocity *= 0.9;

    }

  },

  reset:function() {

    this.distance = 0;
    this.player.reset();

    /* Put all of our objects away. */
    this.object_manager.meteor_pool.storeAll();
    this.object_manager.smoke_pool.storeAll();
    this.object_manager.tarpit_pool.storeAll();

    this.speed = 3;

  }

};



////////////////////
//// INITIALIZE ////
////////////////////

display.buffer.canvas.height = WORLD_HEIGHT;
display.buffer.canvas.width  = WORLD_WIDTH;

display.tile_sheet.image.src = "dino.png";
display.tile_sheet.image.addEventListener("load", function(event) {

display.tile_sheet.columns = this.width / TILE_SIZE;

display.resize();

game.engine.start();

});

window.addEventListener("resize", display.resize);
window.addEventListener("mousedown", controller.onOff);
window.addEventListener("mouseup", controller.onOff);
window.addEventListener("touchstart", controller.onOff);
window.addEventListener("touchend", controller.onOff);
