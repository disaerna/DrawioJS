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
function Rectangle(height, width){
    Form.call(this, 'rectancle')
    this.height = height;
    this.width = width;
    this.area = this.width * this.height;
}

// Prototypes
Rectangle.prototype.getNumbers = function(){
    return {
        height: this.height, 
        width: this.width,
        area: this.height * this.width,
    };
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

var rect = new Rectangle(400, 400);
var circle = new Circle(1000);
var rectNumbers = rect.getNumbers();

console.log(rectNumbers);

