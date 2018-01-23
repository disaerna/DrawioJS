$(document).ready(function(){
    $("#circle").on("click", function(){
        console.log("Circle click works")
        // load circle somehow
    });

    $("#myCanvas").on("mousedown", function(){
        // load current element(form, text, etc) and apply to canvas
        console.log("draw element");
    });

});

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();