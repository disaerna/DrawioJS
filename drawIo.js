/**
 * partially inspired by: http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
$(document).ready(function(){
    let canvas = new Canvas();

    $(".shape").on("click", function(event){
        //retrieve the id of the current event and pass to canvas.draw()
        $("#canvas").unbind();
        canvas.draw(event.currentTarget.id);
    });

    // Hafa ser object sem er toolbarinn?
    
    $(".tool").on("click", function(event){
        var request = event.currentTarget.id;
        if(request === 'undo'){
            canvas.undo();
            //perform undo
        }
        if(request === 'redo'){
            //perform redo
            canvas.redo();
        }
        if(request === 'clear') {
            canvas.clear();
        }
        
    })

    $("#fillColor").on("change", function(event){
        canvas.fillColor = document.getElementById("fillColor").value;
    });
    $("#strokeColor").on("change", function(event){
        canvas.strokeColor = document.getElementById("strokeColor").value;
    }); 

    
});

