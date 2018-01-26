/**
 * code written with support from: http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
$(document).ready(function(){
    var shapes = []
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    var drawing = false;


    $("#rectangle").on("click", function(){
        $("#myCanvas").on("mousedown", mouseDown);
        $("#myCanvas").on("mousemove", mouseMove);
        $("#myCanvas").on("mouseup", mouseUp);
        var rect = {}
        function mouseDown(event){
            console.log(event)
            mousePos = getMouseCoordinates(this, event);
            rect.startX = mousePos.xPos;
            rect.startY = mousePos.yPos;
            drawing = true;
        }
        
        function mouseMove(event){
            if(drawing){    
                // create the width and height of the rectangle by getting the new mouse cooirdinates and
                // subtracting the initial.
                mousePos = getMouseCoordinates(this, event);
                rect.width = mousePos.xPos - rect.startX;
                rect.height = mousePos.yPos - rect.startY;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                printShapes();
                ctx.fillRect(rect.startX, rect.startY, rect.width, rect.height);
            }
        }
        
        function mouseUp(event){
            drawing = false;
            var rectangle = new Rectangle(rect.startX, rect.startY, rect.width, rect.height);
            console.log(rectangle);
            shapes.push(rectangle);
        }

        //Get mouse coordinates within canvas, using the offset of the canvas and the page to subtract
        
        
    });


    $("#circle").on("click", function(){
        
    });
    function getMouseCoordinates(canvas, event){
        return {
            xPos: event.pageX - canvas.offsetLeft,
            yPos: event.pageY - canvas.offsetTop,
        }
    }

    function printShapes(){
        shapes.forEach(shape => {
            if(shape.getType() === 'rectangle'){
                var data = shape.getData();
                console.log(data);
                ctx.fillRect(data.xPos, data.yPos, data.width, data.height);
            }
        });
    }

});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();
canvas.addEventListener('mousemove', ev_mousemove, false);

var started = false;

function ev_mousemove(ev) {
    var x, y;
    if(!started) {
        ctx.beginPath();
        ctx.moveTo(x,y);
        started = true;
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
