function Canvas() {
    this.shapes = [];
    this.undone = [];
    this.currentShape;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.drawing = false;
    this.moving = false;
    this.fillColor = document.getElementById("fillColor").value;
    this.strokeColor = document.getElementById("strokeColor").value;
    this.lineWidth = document.getElementById("lineWidth").value;
    //generate unique id for shapes for when moving them
    this.id = 1;
}

/**
 * Loop through all shapes and check if mouse is within it's area
 * The shapes are layered as they are pushed onto the shapes array
 */
Canvas.prototype.move = function() {
    var canvas = this;
    $("#canvas").on("mousedown", mouseDown);
    $("#canvas").on("mousemove", mouseMove);
    $("#canvas").on("mouseup", mouseUp);
    var tempShape = null;
    var initialMousePos;

    function mouseDown(event) {
        canvas.loadContent();
        canvas.moving = true;
        var mousePos = canvas.getMouseCoordinates(this, event);
        canvas.shapes.forEach(shape => {
            if (shape instanceof Rectangle) {
                //move rectangle
                console.log(
                    "startpos x " +
                        shape.xStartPos +
                        " startpos y " +
                        shape.yStartPos
                );
                console.log(
                    "endpos x " + shape.xEndPos + " endpos y " + shape.yEndPos
                );
                console.log(
                    "mouse x pos " +
                        mousePos.xPos +
                        " mouse y pos " +
                        mousePos.yPos
                );
                console.log("width " + shape.width + " height " + shape.height);
                if (shape.height < 0 && shape.width < 0) {
                    console.log("HI");
                    if (
                        mousePos.xPos >= shape.xEndPos &&
                        mousePos.xPos <=
                            shape.xEndPos + Math.abs(shape.width) &&
                        mousePos.yPos >= shape.yEndPos &&
                        mousePos.yPos <= shape.yEndPos + Math.abs(shape.height)
                    ) {
                        tempShape = shape;
                        //console.log(shape);
                    }
                } else if (shape.width < 0) {
                    if (
                        mousePos.xPos >= shape.xEndPos &&
                        mousePos.xPos <=
                            shape.xEndPos + Math.abs(shape.width) &&
                        mousePos.yPos >= shape.yStartPos &&
                        mousePos.yPos <=
                            shape.yStartPos + Math.abs(shape.height)
                    ) {
                        tempShape = shape;
                        //console.log(shape);
                    }
                } else if (shape.height < 0) {
                    if (
                        mousePos.xPos >= shape.xStartPos &&
                        mousePos.xPos <=
                            shape.xStartPos + Math.abs(shape.width) &&
                        mousePos.yPos >= shape.yEndPos &&
                        mousePos.yPos <= shape.yEndPos + Math.abs(shape.height)
                    ) {
                        tempShape = shape;
                        //console.log(shape);
                    }
                } else {
                    if (
                        mousePos.xPos >= shape.xStartPos &&
                        mousePos.xPos <=
                            shape.xStartPos + Math.abs(shape.width) &&
                        mousePos.yPos >= shape.yStartPos &&
                        mousePos.yPos <=
                            shape.yStartPos + Math.abs(shape.height)
                    ) {
                        tempShape = shape;
                        //console.log(shape);
                    }
                }
            }
            if (shape instanceof Circle) {
                //move circle
                var x = Math.pow(mousePos.xPos - shape.xStartPos, 2);
                var y = Math.pow(mousePos.yPos - shape.yStartPos, 2);
                var distance = Math.sqrt(x + y);
                if (distance < shape.radius) {
                    tempShape = shape;
                }
            }
            if (shape instanceof Pen) {
                //move pen
                var lineWidth = parseInt(
                    document.getElementById("lineWidth").value
                );
                var offset = 14 - lineWidth;
                console.log(offset);
                for (var i = 0; i < shape.moveArr.length; ++i) {
                    var m = shape.moveArr[i];
                    if (
                        mousePos.xPos >= m.xPos - offset &&
                        mousePos.xPos <= m.xPos + offset &&
                        mousePos.yPos >= m.yPos - offset &&
                        mousePos.yPos <= m.yPos + offset
                    ) {
                        console.log("moveshit");
                        tempShape = shape;
                        break;
                    }
                }
            }
            if (shape instanceof Line) {
                //move line
                var p0 = {
                    xPos: mousePos.xPos,
                    yPos: mousePos.yPos
                };
                var p1 = {
                    xPos: shape.xStartPos,
                    yPos: shape.yStartPos
                };
                var p2 = {
                    xPos: shape.xEndPos,
                    yPos: shape.yEndPos
                };
                var numerator = Math.abs(
                    (p2.yPos - p1.yPos) * p0.xPos -
                        (p2.xPos - p1.xPos) * p0.yPos +
                        p2.xPos * p1.yPos -
                        p2.yPos * p1.xPos
                );
                var denominator = Math.sqrt(
                    Math.pow(p2.yPos - p1.yPos, 2) +
                        Math.pow(p2.xPos - p1.xPos, 2)
                );
                var result = parseInt(numerator / denominator);
                if (result < 10) {
                    tempShape = shape;
                }
            }
            if (shape instanceof Letters) {
                if (
                    mousePos.xPos >= shape.xStartPos &&
                    mousePos.xPos <= shape.xStartPos + shape.width &&
                    mousePos.yPos >= shape.yStartPos &&
                    mousePos.yPos <= shape.yStartPos + shape.height
                ) {
                    tempShape = shape;
                    console.log("shape id " + shape.id);
                    console.log("shape width " + shape.width);
                    console.log("shape heigt " + shape.height);
                    console.log("INSIDE");
                }
            }
        });
        initialMousePos = mousePos;
    }

    function mouseMove(event) {
        if (canvas.moving) {
            if (tempShape != null) {
                var mousePos = canvas.getMouseCoordinates(this, event);
                var xOffset = initialMousePos.xPos - mousePos.xPos;
                var yOffset = initialMousePos.yPos - mousePos.yPos;
                if (tempShape instanceof Pen) {
                    for (var i = 0; i < tempShape.xPos.length; ++i) {
                        tempShape.xPos[i] = tempShape.xPos[i] - xOffset;
                        tempShape.yPos[i] = tempShape.yPos[i] - yOffset;
                        tempShape.moveArr[i].xPos =
                            tempShape.moveArr[i].xPos - xOffset;
                        tempShape.moveArr[i].yPos =
                            tempShape.moveArr[i].yPos - yOffset;
                    }
                }
                tempShape.xStartPos = tempShape.xStartPos - xOffset;
                tempShape.yStartPos = tempShape.yStartPos - yOffset;
                if (tempShape.xEndPos != 0 || tempShape.yEndPos != 0) {
                    tempShape.xEndPos = tempShape.xEndPos - xOffset;
                    tempShape.yEndPos = tempShape.yEndPos - yOffset;
                }
                canvas.loadContent();
                initialMousePos.xPos = mousePos.xPos;
                initialMousePos.yPos = mousePos.yPos;
            }
        }
    }

    function mouseUp(event) {
        canvas.moving = false;
        console.log("UP " + tempShape.id);
        tempShape = null;
        console.log("Null " + tempShape);
    }
};

/**
 * Recieves a requested shape to draw and sets up event listeners and draws the shape
 * @param {the requested shape to be drawn} requestedShape
 */
Canvas.prototype.draw = function(requestedShape) {
    // assign this to the variable canvas, this is done due to javascripts scoping
    var canvas = this;
    $("#canvas").on("mousedown", mouseDown);
    $("#canvas").on("mousemove", mouseMove);
    $("#canvas").on("mouseup", mouseUp);
    $("#textValue")
        .unbind("keydown")
        .bind("keydown", keyDown);

    function mouseDown(event) {
        canvas.drawing = true;
        // send the canvas element, the event and the requested shape as parameters
        canvas.initShape(this, event, requestedShape);
        if (requestedShape === "letters") {
            console.log("PRESS");
            canvas.currentShape.display();
        }
    }

    function mouseMove(event) {
        // while we are in drawingmode we want to draw the shape
        if (canvas.drawing) {
            // every drawn element has to constantly print the previous drawn
            // shapes to be able to draw the current shape in right proportions
            canvas.loadContent();
            if (requestedShape !== "letters") {
                canvas.drawShape(this, event);
            }
        }
    }

    function mouseUp(event) {
        if (requestedShape === "letters") {
            console.log(canvas.shapes);
        } else {
            canvas.drawing = false;
            canvas.shapes.push(canvas.currentShape);
        }
    }

    function keyDown(event) {
        var key = event.which;
        if (key == 13 && requestedShape === "letters") {
            canvas.drawShape(canvas, event);
            canvas.drawing = false;
            console.log(canvas.currentShape);
            canvas.shapes.push(canvas.currentShape);
        }
    }
};

/**
 * Initialize shape and prepare for drawing
 * @param {a canvas element} canvas
 * @param {an event} event
 * @param {a shape to initialize} shape
 */
Canvas.prototype.initShape = function(canvas, event, shape) {
    mousePos = this.getMouseCoordinates(canvas, event);
    if (shape === "rectangle") {
        this.currentShape = new Rectangle(
            this.id,
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth
        );
    }
    if (shape === "circle") {
        this.currentShape = new Circle(
            this.id,
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth
        );
    }
    if (shape === "line") {
        this.currentShape = new Line(
            this.id,
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth
        );
    }
    if (shape == "letters") {
        this.currentShape = new Letters(
            this.id,
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth
        );
    }
    if (shape == "pen") {
        this.currentShape = new Pen(
            this.id,
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth
        );
    }
    this.id += 1;
};

Canvas.prototype.loadShapes = function(shapes) {
    temp = [];
    shapes.forEach(shape => {
        if (shape.type === "rectangle") {
            temp.push(Object.assign(Object.create(Rectangle.prototype), shape));
        }
        if (shape.type === "circle") {
            temp.push(Object.assign(Object.create(Circle.prototype), shape));
        }
        if (shape.type === "line") {
            temp.push(Object.assign(Object.create(Line.prototype), shape));
        }
        if (shape.type === "letters") {
            temp.push(Object.assign(Object.create(Letters.prototype), shape));
        }
        if (shape.type === "pen") {
            temp.push(Object.assign(Object.create(Pen.prototype), shape));
        }
    });
    this.shapes = temp;
    this.loadContent();
};

/**
 * Draw the actual element
 * @param {a canvas element} canvas
 * @param {an event} event
 */
Canvas.prototype.drawShape = function(canvas, event) {
    mousePos = this.getMouseCoordinates(canvas, event);
    this.currentShape.draw(this.ctx, mousePos);
};

Canvas.prototype.undo = function() {
    if (this.shapes.length > 0) {
        var shape = this.shapes.pop();
        this.undone.push(shape);
        this.loadContent();
    }
};

Canvas.prototype.redo = function() {
    if (this.undone.length > 0) {
        var shape = this.undone.pop();
        this.shapes.push(shape);
        this.loadContent();
    }
};

Canvas.prototype.clear = function() {
    if (this.shapes.length > 0) {
        if (confirm("Are you sure you want to clear the canvas?")) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.undone = [];
            this.shapes = [];
        }
    }
};

/**
 * Retrieve the current mouse coordinates
 * @param {the canvas element} canvas
 * @param {the mouse event} event
 */
Canvas.prototype.getMouseCoordinates = function(canvas, event) {
    return {
        xPos: event.pageX - canvas.offsetLeft,
        yPos: event.pageY - canvas.offsetTop
    };
};

/**
 * Loop through all elements of the shape array
 * and print them on the canvas
 */
Canvas.prototype.renderShapes = function() {
    for (var i = 0; i < this.shapes.length; ++i) {
        shape = this.shapes[i];
        shape.render(this.ctx);
    }
};

Canvas.prototype.loadContent = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderShapes();
};
