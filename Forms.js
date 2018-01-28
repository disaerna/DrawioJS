// Shape
Shape.prototype = Object.create(Canvas.prototype);
Shape.prototype.constructor = Shape;

function Shape(type, id, fillColor){
    this.type = type;
    this.id = id
    this.xStartPos = 0;
    this.yStartPos = 0;
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
    this.radius = 0;
}

/**
 * LINE
 */
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

function Line(id, fillColor){
    Shape.call(this, 'line', id, fillColor);
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
     this.fontSize = "12px";
     this.fontType = "Arial";
     this.font = this.fontSize + " " + this.fontType;
     this.value = "";
    
 }