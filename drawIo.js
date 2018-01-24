/**
 * code written with support from: http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
$(document).ready(function(){
    var shapes = []

    $("#toolbar").on("mouseover", function(){
        var drawing = false;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');
        var firstMouseX = 0;
        var firstMouseY = 0;
        var mouseX = 0;
        var mouseY = 0;
        rect = {}
        
        $("#rectangle").on("click", function(){
            console.log(ctx);
            $("#myCanvas").on("mousedown", mouseDown);
            $("#myCanvas").on("mousemove", mouseMove);
            $("#myCanvas").on("mouseup", mouseUp);
            
            function mouseDown(event){
                rect.startX = event.pageX - this.offsetLeft;
                rect.startY = event.pageY - this.offsetTop;
                // rectangle  = new Rectangle(rect.startX, rect.startY);
                drawing = true;
            }
            
            function mouseMove(event){
                if(drawing){    
                    // need to fix issue with how the rectangle is shaped
                    rect.width = (event.pageX - this.offsetLeft) - rect.startX;
                    rect.height = (event.pageX - this.offsetTop) - rect.startY;
                    // clears board all the time, need to create function
                    // to print out all shapes in array each time
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillRect(rect.startX, rect.startY, rect.width, rect.height);
                    // rectangle.configure(Math.abs(rect.height), Math.abs(rect.width));
                }
            }
            
            function mouseUp(event){
                drawing = false;
                // update the rectangle
                // push rectangle to array of shapes and display on the canvas
                // ctx.fillRect(rect.startX, rect.startY, rect.width, rect.height);
                // shapes.push(rectangle);
            }

        });

    })


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
