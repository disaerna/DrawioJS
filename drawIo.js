/**
 * partially inspired by: http://atomicrobotdesign.com/blog/javascript/draw-a-rectangle-using-the-mouse-on-the-canvas-in-less-than-40-lines-of-javascript/
 */
$(document).ready(function() {
    var canvas = new Canvas();
    var storage = window.localStorage;
    //start with pen as default
    canvas.draw("pen");
    $(".shape").on("click", function(event) {
        //retrieve the id of the current event and pass to canvas.draw()
        $("#canvas").unbind();
        // change fa icons when active
        $(".shape, .tool").removeClass("active");
        $(this).toggleClass("active");
        canvas.draw(
            event.currentTarget.id.split("-")[0],
            event.currentTarget.id.split("-")[1]
        );
    });

    $(".tool").on("click", function(event) {
        // change fa icons when active
        $(".tool, .shape").removeClass("active");
        $(this).toggleClass("active");
        var request = event.currentTarget.id;
        if (request === "undo") {
            canvas.undo();
        }
        if (request === "redo") {
            canvas.redo();
        }
        if (request === "clear") {
            canvas.clear();
        }
        if (request === "save") {
            storage.setItem(canvas.canvas, JSON.stringify(canvas.shapes));
            canvas.active();
        }
        if (request === "load") {
            var shapes = JSON.parse(storage.getItem(canvas.canvas));
            canvas.loadShapes(shapes);
            canvas.active();
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
