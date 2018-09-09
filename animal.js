// Frank Poth 08/13/2017

var context, controller, rectangle, loop;
context = document.getElementById('myCanvas').getContext("2d");
var line = (context.canvas.height / 1.085) - 2;

rectangle = {
  height:32,
  width:32,
  jumping:true,
  x:16, // center of the canvas 144
  x_velocity:0,
  y:0,
  y_velocity:0
};

controller = {
  up:false,
  down:false,
  keyListener:function(event) {
    var key_state = (event.type == "keydown")?true:false;
    switch(event.keyCode) {
      case 38:// up key
        controller.up = key_state;
      break;
      case 40: // down key
        controller.down = key_state;
      break;
    }
  }
};

loop = function() {
  context.clearRect(0,0,context.canvas.width, context.canvas.height);

  if (controller.up  == true && rectangle.jumping == false) {
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }

  rectangle.y_velocity += 2.0;// gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9;// friction
  rectangle.y_velocity *= 0.9;// friction

  // if rectangle is falling below floor line
  if (rectangle.y > line-rectangle.height) {
    if(controller.down == true){
      rectangle.y = line
      rectangle.y_velocity = 0;
    }
    else{
      rectangle.jumping = false;
      rectangle.y = line-rectangle.height;
      rectangle.y_velocity = 0;
    }
  }

  context.fillStyle = "#FFFF00";
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();

  // FOR THE LINE (RED)
  context.strokeStyle = "#ff0000";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, line);
  context.lineTo(context.canvas.width, line);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};


window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
