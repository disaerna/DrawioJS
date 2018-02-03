/**
 * partially inspired by: http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
$(document).ready(function() {
    let canvas = new Canvas();
    let storage = window.localStorage;
    //start with pen as default
    canvas.draw("pen");
    $(".shape").on("click", function(event) {
        //retrieve the id of the current event and pass to canvas.draw()
        $("#canvas").unbind();
        $(".shape, .tool").removeClass("active");
        $(this).toggleClass("active");
        canvas.draw(
            event.currentTarget.id.split("-")[0],
            event.currentTarget.id.split("-")[1]
        );
    });

    // Hafa ser object sem er toolbarinn?

    $(".tool").on("click", function(event) {
        $(".tool, .shape").removeClass("active");
        $(this).toggleClass("active");
        var request = event.currentTarget.id;
        if (request === "undo") {
            canvas.undo();
            //perform undo
        }
        if (request === "redo") {
            //perform redo
            canvas.redo();
        }
        if (request === "clear") {
            canvas.clear();
        }
        if (request === "save") {
            console.log(canvas.shapes);
            storage.setItem(canvas.canvas, JSON.stringify(canvas.shapes));
        }
        if (request === "load") {
            var shapes = JSON.parse(storage.getItem(canvas.canvas));
            canvas.loadShapes(shapes);
        }
        if (request === "move") {
            $("#canvas").unbind();
            canvas.move();
        }
        if (request === "colorchange") {
            $("#canvas").unbind();
            canvas.changeColor();
        }
    });

    $("#fillColor").on("change", function(event) {
        canvas.fillColor = document.getElementById("fillColor").value;
    });

    $("#strokeColor").on("change", function(event) {
        canvas.strokeColor = document.getElementById("strokeColor").value;
    });
});
