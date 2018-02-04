function Canvas() {
    this.shapes = [];
    this.undone = [];
    this.currentShape;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.mousedown = false;
    this.fillColor = document.getElementById("fillColor").value;
    this.strokeColor = document.getElementById("strokeColor").value;
    this.lineWidth = document.getElementById("lineWidth").value;
    this.lastShape = null;
}
/**
 * Loop through all shapes and check if current mouse position is within its area
 * The shapes are layered as they are pushed onto the shapes array
 */
Canvas.prototype.findShape = function(mousePos) {
    var canvas = this;
    canvas.shapes.forEach(shape => {
        if (shape instanceof Rectangle) {
            if (shape.height < 0 && shape.width < 0) {
                if (
                    mousePos.xPos >= shape.xEndPos &&
                    mousePos.xPos <= shape.xEndPos + Math.abs(shape.width) &&
                    mousePos.yPos >= shape.yEndPos &&
                    mousePos.yPos <= shape.yEndPos + Math.abs(shape.height)
                ) {
                    canvas.currentShape = shape;
                }
            } else if (shape.width < 0) {
                if (
                    mousePos.xPos >= shape.xEndPos &&
                    mousePos.xPos <= shape.xEndPos + Math.abs(shape.width) &&
                    mousePos.yPos >= shape.yStartPos &&
                    mousePos.yPos <= shape.yStartPos + Math.abs(shape.height)
                ) {
                    canvas.currentShape = shape;
                }
            } else if (shape.height < 0) {
                if (
                    mousePos.xPos >= shape.xStartPos &&
                    mousePos.xPos <= shape.xStartPos + Math.abs(shape.width) &&
                    mousePos.yPos >= shape.yEndPos &&
                    mousePos.yPos <= shape.yEndPos + Math.abs(shape.height)
                ) {
                    canvas.currentShape = shape;
                }
            } else {
                if (
                    mousePos.xPos >= shape.xStartPos &&
                    mousePos.xPos <= shape.xStartPos + Math.abs(shape.width) &&
                    mousePos.yPos >= shape.yStartPos &&
                    mousePos.yPos <= shape.yStartPos + Math.abs(shape.height)
                ) {
                    canvas.currentShape = shape;
                }
            }
        }
        if (shape instanceof Circle) {
            var x = Math.pow(mousePos.xPos - shape.xStartPos, 2);
            var y = Math.pow(mousePos.yPos - shape.yStartPos, 2);
            var distance = Math.sqrt(x + y);
            if (distance < shape.radius) {
                canvas.currentShape = shape;
            }
        }
        if (shape instanceof Pen) {
            var lineWidth = parseInt(
                document.getElementById("lineWidth").value
            );
            var offset = 16 - lineWidth;
            for (var i = 0; i < shape.moveArr.length; ++i) {
                var m = shape.moveArr[i];
                if (
                    mousePos.xPos >= m.xPos - offset &&
                    mousePos.xPos <= m.xPos + offset &&
                    mousePos.yPos >= m.yPos - offset &&
                    mousePos.yPos <= m.yPos + offset
                ) {
                    canvas.currentShape = shape;
                }
            }
        }
        if (shape instanceof Line) {
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
                Math.pow(p2.yPos - p1.yPos, 2) + Math.pow(p2.xPos - p1.xPos, 2)
            );
            var result = parseInt(numerator / denominator);
            if (result < 10) {
                canvas.currentShape = shape;
            }
        }
        if (shape instanceof Letters) {
            var heightInPoints = shape.height * 72 / 96;
            var offset = 2;
            if (
                mousePos.yPos <= shape.yStartPos &&
                mousePos.yPos >= shape.yStartPos - heightInPoints &&
                mousePos.xPos <= shape.xStartPos + shape.width &&
                mousePos.xPos >= shape.xStartPos
            ) {
                canvas.currentShape = shape;
            }
        }
    });
};

/**
 * Applies event listeners for mousedown, mousemove and mouseup on the element
 * with id canvas, listeners call appropriate functions to execute the moves
 */
Canvas.prototype.move = function() {
    var canvas = this;
    $("#canvas").on("mousedown", mouseDown);
    $("#canvas").on("mousemove", mouseMove);
    $("#canvas").on("mouseup", mouseUp);
    var shape;
    var initialMousePos;

    function mouseDown(event) {
        canvas.renderShapes();
        canvas.mousedown = true;
        var mousePos = canvas.getMouseCoordinates(this, event);
        canvas.findShape(mousePos);
        shape = canvas.currentShape;
        initialMousePos = mousePos;
    }

    function mouseMove(event) {
        if (canvas.mousedown) {
            if (shape != null) {
                var mousePos = canvas.getMouseCoordinates(this, event);
                var xOffset = initialMousePos.xPos - mousePos.xPos;
                var yOffset = initialMousePos.yPos - mousePos.yPos;
                if (shape instanceof Pen) {
                    for (var i = 0; i < shape.xPos.length; ++i) {
                        shape.xPos[i] = shape.xPos[i] - xOffset;
                        shape.yPos[i] = shape.yPos[i] - yOffset;
                        shape.moveArr[i].xPos = shape.moveArr[i].xPos - xOffset;
                        shape.moveArr[i].yPos = shape.moveArr[i].yPos - yOffset;
                    }
                }
                shape.xStartPos = shape.xStartPos - xOffset;
                shape.yStartPos = shape.yStartPos - yOffset;
                if (shape.xEndPos != 0 || shape.yEndPos != 0) {
                    shape.xEndPos = shape.xEndPos - xOffset;
                    shape.yEndPos = shape.yEndPos - yOffset;
                }
                initialMousePos.xPos = mousePos.xPos;
                initialMousePos.yPos = mousePos.yPos;
                canvas.renderShapes();
            }
        }
    }

    function mouseUp(event) {
        canvas.mousedown = false;
        canvas.currentShape = null;
    }
};

/**
 * First parameter is a requested shape to draw and sets up event listeners and draws the shape
 * Second parameter is a string determining if the shape should have a stroke or not
 * @param {string} requestedShape
 * @param {string} isStroke
 */
Canvas.prototype.draw = function(requestedShape, isStroke) {
    var canvas = this;
    this.lastShape = requestedShape;
    $("#canvas").on("mousedown", mouseDown);
    $("#canvas").on("mousemove", mouseMove);
    $("#canvas").on("mouseup", mouseUp);
    $("#textValue")
        .unbind("keydown")
        .bind("keydown", keyDown);

    function mouseDown(event) {
        canvas.mousedown = true;
        // send the canvas element, the event and the requested shape as parameters
        canvas.initShape(this, event, requestedShape, isStroke);
        if (requestedShape === "letters") {
            canvas.currentShape.display();
        }
    }

    function mouseMove(event) {
        // while we are in drawingmode we want to draw the shape
        if (canvas.mousedown) {
            // every drawn element has to constantly print the previous drawn
            // shapes to be able to draw the current shape in right proportions
            canvas.renderShapes();
            if (requestedShape !== "letters") {
                canvas.drawShape(this, event);
            }
        }
    }

    function mouseUp(event) {
        if (requestedShape === "letters") {
        } else {
            canvas.mousedown = false;
            canvas.shapes.push(canvas.currentShape);
        }
    }

    function keyDown(event) {
        var key = event.which;
        if (key == 13 && requestedShape === "letters") {
            canvas.drawShape(canvas, event);
            canvas.mousedown = false;
            canvas.shapes.push(canvas.currentShape);
        }
    }
};
/**
 * Change the fill color of rectangles and circles
 * Change the stroke color of letters, lines and freehand drawings
 */
Canvas.prototype.changeColor = function() {
    var canvas = this;
    $("#canvas").on("mousedown", mouseDown);
    $("#canvas").on("mouseup", mouseUp);
    var shape = null;
    function mouseDown(event) {
        if (canvas.shapes.length !== 0) {
            var mousePos = canvas.getMouseCoordinates(this, event);
            canvas.findShape(mousePos);
            shape = canvas.currentShape;
        }
    }

    function mouseUp(event) {
        if (shape !== null) {
            newFillColor = document.getElementById("fillColor").value;
            newStrokeColor = document.getElementById("strokeColor").value;
            shape.fillColor = newFillColor;
            shape.strokeColor = newStrokeColor;
            canvas.renderShapes();
        }
    }
};
/**
 * Initialize shape and prepare for drawing
 * @param {HTMLCanvasElement} canvas
 * @param {MouseEvent} event
 * @param {string} shape
 * @param {string} isStroke
 */
Canvas.prototype.initShape = function(canvas, event, shape, isStroke) {
    mousePos = this.getMouseCoordinates(canvas, event);
    if (shape === "rectangle") {
        this.currentShape = new Rectangle(
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth,
            (this.stroke = isStroke)
        );
    }
    if (shape === "circle") {
        this.currentShape = new Circle(
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth,
            (this.stroke = isStroke)
        );
    }
    if (shape === "line") {
        this.currentShape = new Line(
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth
        );
    }
    if (shape == "letters") {
        this.currentShape = new Letters(
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth
        );
    }
    if (shape == "pen") {
        this.currentShape = new Pen(
            mousePos,
            this.fillColor,
            this.strokeColor,
            this.lineWidth
        );
    }
};
/**
 * Argument is an array of shapes retrieved from the localstore
 * Each shape is converted back to its original form
 * @param {Array} shapes
 */
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
    this.renderShapes();
};

/**
 * Draw the shape onto the canvas
 * @param {HTMLCanvasElement} canvas
 * @param {MouseEvent} event
 */
Canvas.prototype.drawShape = function(canvas, event) {
    mousePos = this.getMouseCoordinates(canvas, event);
    this.currentShape.draw(this.ctx, mousePos);
};

/**
 * Remove the last shape drawn on the canvas
 */
Canvas.prototype.undo = function() {
    if (this.shapes.length > 0) {
        var shape = this.shapes.pop();
        this.undone.push(shape);
        this.renderShapes();
    }
    this.active();
};

/**
 * Retrieve tha last shape removed by undone
 */
Canvas.prototype.redo = function() {
    if (this.undone.length > 0) {
        var shape = this.undone.pop();
        this.shapes.push(shape);
        this.renderShapes();
    }
    this.active();
};

/**
 * Clears the canvas
 */
Canvas.prototype.clear = function() {
    if (this.shapes.length > 0) {
        if (confirm("Are you sure you want to clear the canvas?")) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.undone = [];
            this.shapes = [];
        }
    }
    this.active();
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.shapes.length; ++i) {
        shape = this.shapes[i];
        shape.render(this.ctx);
    }
};
/**
 * Removes tool class active when the tool is load,save,undo,redo or clear.
 * Makes last shape be the current shape and the shape active
 */

Canvas.prototype.active = function() {
    $(".tool").removeClass("active");
    this.draw(this.lastShape, this.lastShape.stroke);
    var lastStroke = this.currentShape.stroke;
    if (lastStroke === undefined) {
        lastStroke = "fill";
    }
    var last = this.lastShape + "-" + lastStroke;
    $("#" + last).toggleClass("active");
};
