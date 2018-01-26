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
    console.log(fillColor);
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

function Circle(){
    Form.call(this, 'circle')
    this.diameter = 0;
    this.radius = this.diameter / 2;
    this.circumference = 2 * Math.PI * this.radius;
}

Circle.prototype.test = function(){
    console.log("drawing circle");
}
