// FORM

// Constructor
function Form(type){
    this.type = type;
}

// Prototypes
Form.prototype.getType = function(){
    return this.type;
}

// RECTANGLE

// Prototype hieararchy declaration
Rectangle.prototype = Object.create(Form.prototype);
Rectangle.prototype.constructor = Rectangle;

// Constructor
function Rectangle(xPos, yPos, width, height){
    Form.call(this, 'rectangle')
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;

}
// Prototypes
Rectangle.prototype.getData = function(){
    return {
        xPos: this.xPos,
        yPos: this.yPos,
        width: this.width,
        height: this.height, 
    };
}

Rectangle.prototype.configure = function(xPos, yPos, width, height){
    if(xPos) this.xOrigin = xOrigin;
    if(yPos) this.yOrigin = yOrigin;
    if(width) this.width = width;
    if(height) this.height = height;
}



// CIRCLE

Circle.prototype = Object.create(Form.prototype);
Circle.prototype.constructor = Circle;

// Constructor

function Circle(diameter){
    Form.call(this, 'circle')
    this.diameter = diameter;
    this.radius = this.diameter / 2;
    this.circumference = 2 * Math.PI * this.radius;
}

// Prototypes

Circle.prototype.getCircumference = function(){
    return this.circumference;
}

function Line(){
    Form.call(this, 'line')
}

function Text(){
    Form.call(this, 'text')
}


