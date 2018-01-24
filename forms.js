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
    this.x = x;
    this.y = y;
    this.height = 0;
    this.width = 0;
    Form.call(this, 'rectancle')

}
// Prototypes
Rectangle.prototype.getData = function(){
    return {
        height: this.height, 
        width: this.width,
        area: this.height * this.width,
    };
}

Rectangle.prototype.configure = function(x, y, height, width){
    this.x = x;
    this.y = y;
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


