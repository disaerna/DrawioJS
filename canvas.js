function Canvas(){
    this.shapes = []
    this.undone = []
    this.currentShape;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
    this.drawing = false;
    this.fillColor = document.getElementById("fillColor").value;
    this.strokeColor;
    //generate unique id for shapes for when moving them
    this.id = 1;
}



/**
 * Recieves a requested shape to draw and sets up event listeners and draws the shape 
 * @param {the shape requested, can be either rectangle or circle} requestedShape 
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
        canvas.loadContent();
        canvas.initShape(this, event, requestedShape);
    }
    
    function mouseMove(event){
        // while we are in drawingmode we want to draw the shape
        if(canvas.drawing){    
            canvas.createShape(this, event);
        }
    }
    
    function mouseUp(event){
        console.log(canvas.currentShape);
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
    if(shape === 'rectangle'){
        this.currentShape = new Rectangle(this.id, this.fillColor);
        mousePos = this.getMouseCoordinates(canvas, event);
        this.currentShape.xPos = mousePos.xPos;
        this.currentShape.yPos = mousePos.yPos;
        this.id += 1;
    }
    if(shape === 'circle'){
        // initialize a circle 
        this.currentShape = new Circle(this.id, this.fillColor);
        mousePos = this.getMouseCoordinates(canvas, event);
        this.currentShape.xPos = mousePos.xPos;
        this.currentShape.yPos = mousePos.yPos;
        this.currentShape.radius = 0;
        this.id += 1;

    }
}

/**
 * Draw the actual element
 * @param {a canvas element} canvas 
 * @param {an event} event 
 */
Canvas.prototype.createShape = function(canvas, event){
    mousePos = this.getMouseCoordinates(canvas, event);
     // every drawn element has to constantly print the previous drawn
    // shapes to be able to draw the current shape in right proportions
    //this.loadContent();
    if(this.currentShape instanceof Rectangle){
        mousePos = this.getMouseCoordinates(canvas, event);
        this.currentShape.width = mousePos.xPos - this.currentShape.xPos;
        this.currentShape.height = mousePos.yPos - this.currentShape.yPos;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(this.currentShape.xPos, this.currentShape.yPos, this.currentShape.width, this.currentShape.height);
    }
    if(this.currentShape instanceof Circle){
        // draw a circle
        mousePos = this.getMouseCoordinates(canvas, event);
        //this.currentShape.radius = Math.abs(this.currentShape.xPos - mousePos.xPos)/2;
        this.ctx.beginPath();
        this.currentShape.radius =  Math.sqrt(Math.pow((this.currentShape.xPos - mousePos.xPos),2) + Math.pow((this.currentShape.yPos - mousePos.yPos), 2));
        this.ctx.arc(this.currentShape.xPos, this.currentShape.yPos, this.currentShape.radius, 0, 100);
        this.ctx.fill()
        this.ctx.stroke();
    }
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
Canvas.prototype.printShapes = function(){
    for(var i = 0; i < this.shapes.length; ++i){
        shape = this.shapes[i];
        if(shape instanceof Rectangle){
            //console.log(shape.fillColor);
            this.ctx.fillStyle = shape.fillColor;
            this.ctx.fillRect(shape.xPos, shape.yPos, shape.width, shape.height);
        }
        if(shape instanceof Circle){
            this.ctx.fillStyle = shape.fillColor;
            this.ctx.beginPath();
            this.ctx.arc(shape.xPos, shape.yPos, shape.radius, 0, Math.PI * 2)        
            this.ctx.stroke();
            this.ctx.fill();
        }
    }
}

Canvas.prototype.loadContent = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.printShapes();
}
