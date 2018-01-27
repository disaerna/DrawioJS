// FORM
Form.prototype = Object.create(Canvas.prototype);
Form.prototype.constructor = Form;

function Form(type, id, fillColor){
    this.type = type;
    this.id = id
    if(fillColor) this.fillColor = fillColor;
}

Form.prototype.getType = function(){
    return this.type;
}



/**
 * RECTANGLE
 */
Rectangle.prototype = Object.create(Form.prototype);
Rectangle.prototype.constructor = Rectangle;

function Rectangle(id, fillColor){
    Form.call(this, 'rectangle', id, fillColor)
    this.xPos = 0;
    this.yPos = 0;
    this.width = 0;
    this.height = 0
}

/**
 * CIRCLE
 */
Circle.prototype = Object.create(Form.prototype);
Circle.prototype.constructor = Circle;

function Circle(id, fillColor){
    Form.call(this, 'circle', id, fillColor);
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
Line.prototype = Object.create(Form.prototype);
Line.prototype.constructor = Line;

function Line(id, fillColor){
    Form.call(this, 'line', id, fillColor);
    this.xStartPos = 0;
    this.yStartPos = 0;
    this.xEndPos = 0;
    this.yEndPos = 0;
}