
function Form(type){
    this.type = type;
}

Form.prototype.getType = function(){
    console.log(this.type);
}

Rectangle.prototype = Object.create(Form.prototype);
Rectangle.prototype.constructor = Rectangle;

function Rectangle(height, width){
    Form.call(this, 'rectancle')
    this.height = height;
    this.width = width;
}

Rectangle.prototype.getArea = function(){
    console.log(this.height * this.width);
}


function Circle(){
    Form.call(this, 'circle')
}

function Line(){
    Form.call(this, 'line')
}

function Text(){
    Form.call(this, 'text')
}

var rect = new Rectangle(400, 400);
rect.getArea();
rect.getType();
