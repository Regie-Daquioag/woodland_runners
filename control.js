// Frank Poth 08/13/2017

var context, controller, rectangle, loop;

context = document.getElementById('myCanvas').getContext("2d");

context.canvas.height = 320;
context.canvas.width = 200;
var line = (context.canvas.height / 1.2) - 2;

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
  if (rectangle.y > /*180 - 16 - 32 - 16*/ line - rectangle.height) {
    if(controller.down == true){
      rectangle.y = /*180 - 16 - 16; */ line
      rectangle.y_velocity = 0;
    }
    else{
      rectangle.jumping = false;
      rectangle.y = /*180 - 16 - 32 - 16;*/ line - rectangle.height;
      rectangle.y_velocity = 0;
    }

  }


/*
  var img = new Image();
  img.onload = function () {
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
  }
  img.src = "images/forestBackground.jpg";
*/
  context.fillStyle = "#202020";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);// x, y, width, height

  context.fillStyle = "#FFFF00";// hex for red ff0000  FFFF00(yellow)
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();

  // FOR THE LINE (RED)
  context.strokeStyle = "#ff0000";  //202830
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, line); // 134
  context.lineTo(context.canvas.width, line); // 164
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
