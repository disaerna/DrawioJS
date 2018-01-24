// FORM

// Constructor
function Form(type){
    this.type = type;
}

// Prototypes
Form.prototype.getType = function(){
    console.log(this.type);
}

// RECTANGLE

// Prototype hieararchy declaration
Rectangle.prototype = Object.create(Form.prototype);
Rectangle.prototype.constructor = Rectangle;

// Constructor
function Rectangle(x, y){
    this.xOrigin = x;
    this.yOrigin = y;
    this.height = 0;
    this.width = 0;
    Form.call(this, 'rectancle')

}
// Prototypes
Rectangle.prototype.getData = function(){
    return {
        xOrigin: this.xOrigin,
        yOrigin: this.yOrigin,
        height: this.height, 
        width: this.width,
    };
}

Rectangle.prototype.configure = function(xOrigin, yOrigin, height, width){
    this.xOrigin = xOrigin;
    this.yOrigin = yOrigin;
    this.height = height;
    this.width = width;
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


