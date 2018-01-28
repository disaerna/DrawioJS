// Shape
Shape.prototype = Object.create(Canvas.prototype);
Shape.prototype.constructor = Shape;

function Shape(type, id, fillColor){
    this.type = type;
    this.id = id
    if(fillColor) this.fillColor = fillColor;
}

Shape.prototype.getType = function(){
    return this.type;
}



/**
 * RECTANGLE
 */
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

function Rectangle(id, fillColor){
    Shape.call(this, 'rectangle', id, fillColor)
    this.xPos = 0;
    this.yPos = 0;
    this.width = 0;
    this.height = 0
}

/**
 * CIRCLE
 */
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

function Circle(id, fillColor){
    Shape.call(this, 'circle', id, fillColor);
    this.xPos = 0;
    this.yPos = 0;
    this.radius = 0;
    this.circumference = 2 * Math.PI;
}

Circle.prototype.test = function(){
    console.log("drawing circle");
}

/**
 * LINE
 */
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

function Line(id, fillColor){
    Shape.call(this, 'line', id, fillColor);
    this.xStartPos = 0;
    this.yStartPos = 0;
    this.xEndPos = 0;
    this.yEndPos = 0;
}

/** 
 * TEXT
 */

 Letters.prototype = Object.create(Shape.prototype);
 Letters.prototype.constructor = Letters;

 function Letters(id, fillColor){
    Shape.call(this, 'letters', id, fillColor);
     this.xPos = 0;
     this.yPos = 0;
     this.fontSize = "12px";
     this.fontType = "Arial";
     this.font = this.fontSize + " " + this.fontType;
     this.value = "";
    
 }