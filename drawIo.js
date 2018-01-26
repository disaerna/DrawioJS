/**
 * partially inspired by: http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
$(document).ready(function(){
    let canvas = new Canvas();

    $(".shape").on("click", function(event){
        //retrieve the id of the current event and pass to canvas.draw()
        canvas.draw(event.currentTarget.id);
    });

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
    })
    
});

