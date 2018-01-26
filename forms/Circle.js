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

Circle.prototype.test = function(){
    console.log("drawing circle");
}