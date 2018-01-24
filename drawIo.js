/**
 * inspired by: http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
$(document).ready(function(){
    $("#rectangle").on("click", function(){

        var drawing = false;
        var x;
        var y;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");

        $("#myCanvas").on("mousedown", mouseDown);
        $("#myCanvas").on("mousemove", mouseMove);
        $("#myCanvas").on("mouseup", mouseUp);

        function mouseDown(event){
            y = event.pageY - this.offsetLeft;
            x = event.pageX - this.offsetTop;
            drawing = true;
        }
        
        function mouseMove(event){
            // koma i veg fyrir ad þegar dregið er tilbaka í ranga átt að kassinn verði
            // ekki deformed og ljotur
            if(drawing){    
                height = (event.pageY) - y;
                width = (event.pageX) - x;
                ctx.fillRect(x, y, width, height);
            }
        }
        
        function mouseUp(event){
            drawing = false;
        }
    });
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
