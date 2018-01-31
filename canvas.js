function Canvas(){
    this.shapes = []
    this.undone = []
    this.currentShape;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
    this.drawing = false;
    this.fillColor = document.getElementById("fillColor").value;
    this.strokeColor = document.getElementById('strokeColor').value;
    this.lineWidth = document.getElementById("lineWidth").value;
    //generate unique id for shapes for when moving them
    this.id = 1;
}


/**
 * Recieves a requested shape to draw and sets up event listeners and draws the shape 
 * @param {the requested shape to be drawn} requestedShape 
 */
Canvas.prototype.draw = function(requestedShape){
    // assign this to the variable canvas, this is done due to javascripts scoping
    var canvas = this;
    $("#canvas").on("mousedown", mouseDown);
    $("#canvas").on("mousemove", mouseMove);
    $("#canvas").on("mouseup", mouseUp);

    function mouseDown(event){
        canvas.drawing = true;
        // send the canvas element, the event and the requested shape as parameters
        canvas.initShape(this, event, requestedShape);
        if(requestedShape === 'letters'){
            canvas.drawShape(this, event);
        }
    }
    
    function mouseMove(event){
        // while we are in drawingmode we want to draw the shape
        if(canvas.drawing){ 
            // every drawn element has to constantly print the previous drawn
            // shapes to be able to draw the current shape in right proportions   
            canvas.loadContent();
            canvas.drawShape(this, event);
        }
    }
    
    function mouseUp(event){
        canvas.drawing = false;
        canvas.shapes.push(canvas.currentShape);
    }
}

/**
 * Initialize shape and prepare for drawing
 * @param {a canvas element} canvas 
 * @param {an event} event 
 * @param {a shape to initialize} shape 
 */
Canvas.prototype.initShape = function(canvas, event, shape){
    mousePos = this.getMouseCoordinates(canvas, event);
    console.log(mousePos)
    if(shape === 'rectangle'){
        this.currentShape = new Rectangle(this.id, mousePos, this.fillColor, this.strokeColor, this.lineWidth);
    }
    if(shape === 'circle'){
        this.currentShape = new Circle(this.id, mousePos, this.fillColor, this.strokeColor, this.lineWidth);
    }
    if(shape === 'line'){
        this.currentShape = new Line(this.id, mousePos, this.fillColor, this.strokeColor, this.lineWidth);
    }
    if(shape == 'letters'){
        this.currentShape = new Letters(this.id, mousePos, this.fillColor, this.strokeColor, this.lineWidth);
    }
    if(shape == 'pen'){
        this.currentShape = new Pen(this.id, mousePos, this.fillColor, this.strokeColor, this.lineWidth);
    }
    this.id += 1;
}

Canvas.prototype.loadShapes = function(shapes){
    temp = []
    shapes.forEach(shape => {
        console.log("here")
        if(shape.type === 'rectangle'){
            temp.push(Object.assign(Object.create(Rectangle.prototype), shape));
        }
        if(shape.type === 'circle'){
            temp.push(Object.assign(Object.create(Circle.prototype), shape));
        }
        if(shape.type === 'line'){
            temp.push(Object.assign(Object.create(Line.prototype), shape));
        }
        if(shape.type === 'letters'){
            temp.push(Object.assign(Object.create(Letters.prototype), shape));
        }
        if(shape.type === 'pen'){
            temp.push(Object.assign(Object.create(Pen.prototype), shape));
        }
    });
    this.shapes = temp;
    this.loadContent();
}

/**
 * Draw the actual element
 * @param {a canvas element} canvas 
 * @param {an event} event 
 */
Canvas.prototype.drawShape = function(canvas, event){
    mousePos = this.getMouseCoordinates(canvas, event);
    // this.ctx.fillStyle = this.fillColor;
    // this.ctx.strokeStyle = this.strokeStyle;
    this.currentShape.draw(this.ctx, mousePos);
    
}

Canvas.prototype.undo = function(){
    if(this.shapes.length > 0){
        var shape = this.shapes.pop();
        this.undone.push(shape);
        this.loadContent();
    }
}

Canvas.prototype.redo = function(){
    if(this.undone.length > 0){
        var shape = this.undone.pop();
        this.shapes.push(shape);
        this.loadContent();
    }
}

Canvas.prototype.clear = function(){
    if(this.shapes.length > 0){
        if(confirm("Are you sure you want to clear the canvas?")){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.undone = [];
            this.shapes = [];
        }
    }
}

/**
 * Retrieve the current mouse coordinates
 * @param {the canvas element} canvas 
 * @param {the mouse event} event 
 */
Canvas.prototype.getMouseCoordinates = function(canvas, event){
    return {
        xPos: event.pageX - canvas.offsetLeft,
        yPos: event.pageY - canvas.offsetTop,
    }
}

/**
 * Loop through all elements of the shape array
 * and print them on the canvas
 */
Canvas.prototype.renderShapes = function(){
    for(var i = 0; i < this.shapes.length; ++i){
        shape = this.shapes[i];    
        shape.render(this.ctx);
    }
}

Canvas.prototype.loadContent = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderShapes();
}
