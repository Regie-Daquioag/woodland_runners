
    function init(){
        var context = document.getElementById('pracCanvas').getContext('2d');

        var img = document.getElementsByTagName('img')[0];
        var velocity = 200; //400pixels/second
        var distance = 0;
        var lastFrameRepaintTime = 0;


        function calcOffset(time){
            var frameGapTime = time - lastFrameRepaintTime;
            lastFrameRepaintTime = time;
            var translateX = velocity*(frameGapTime/1000);
            return translateX;
        }

        function draw(time){
           distance += calcOffset(time);
            if(distance > img.width){distance =0;}
            context.clearRect(0,0,context.canvas.width, context.canvas.height);
            context.save();
            context.translate(distance,0);
            context.drawImage(img,0,0);
            context.drawImage(img,-img.width+1,0);
            requestAnimationFrame(draw);
            context.restore();
        }

        function start(){
            lastFrameRepaintTime = window.performance.now();
            requestAnimationFrame(draw);
            requestAnimationFrame(loop);
        }
        start();
    }

//invoke function init once document is fully loaded
    window.addEventListener('load',init,false);
