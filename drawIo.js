/**
 * inspired by: http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
$(document).ready(function(){
    
    $("#toolbar").on("mouseover", function(){
        var drawing = false;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var x;
        var y;
        $("#rectangle").on("click", function(){
            rectangle  = new Rectangle(x, y);
            $("#myCanvas").on("mousedown", mouseDown);
            $("#myCanvas").on("mousemove", mouseMove);
            $("#myCanvas").on("mouseup", mouseUp);
    
            function mouseDown(event){
                x = event.pageX - this.offsetTop;
                y = event.pageY - this.offsetLeft;
                drawing = true;
            }
            
            function mouseMove(event){
                // koma i veg fyrir ad þegar dregið er tilbaka í ranga átt 
                // að kassinn verði deformed
                if(drawing){    
                    width = (event.pageX - this.offsetTop) - x;
                    height = (event.pageY - this.offsetLeft) - y;
                    // clear the rectangle created by fillRect and replace with our rectangle
                    // so it can be manipulated later
                    ctx.fillRect(x, y, width, height);
                    rectangle.configure(x, y, height, width);
                }
            }
            
            function mouseUp(event){
                drawing = false;
            }
            $("#test").on("click", function(){
                // Just a test to see that the rectangle gets saved
                console.log(rectangle)
                /ctx.fillRect(0, 0, rectangle.getData().width, rectangle.getData().height)
            });
        });

    })


});

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();
c.addEventListener('mousemove', ev_mousemove, false);

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
