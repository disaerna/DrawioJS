// Shape
Shape.prototype = Object.create(Canvas.prototype);
Shape.prototype.constructor = Shape;

function Shape(type, id, mousePos, fillColor){
    this.type = type;
    this.id = id
    this.xStartPos = mousePos.xPos;
    this.yStartPos = mousePos.yPos;
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

function Rectangle(id, mousePos, fillColor){
    Shape.call(this, 'rectangle', id, mousePos, fillColor)
    this.width = 0;
    this.height = 0
}

Rectangle.prototype.draw = function(ctx, mousePos){
    this.width = mousePos.xPos - this.xStartPos;
    this.height = mousePos.yPos - this.yStartPos;
    ctx.fillRect(this.xStartPos, this.yStartPos, this.width, this.height);
}

Rectangle.prototype.render = function(ctx){
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.xStartPos, this.yStartPos, this.width, this.height);
}

/**
 * CIRCLE
 */
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

function Circle(id, mousePos, fillColor){
    Shape.call(this, 'circle', id, mousePos, fillColor);
    this.radius = 0;
}

Circle.prototype.draw = function(ctx, mousePos){
    ctx.beginPath();
    this.radius =  Math.sqrt(Math.pow((this.xStartPos - mousePos.xPos),2) + Math.pow((this.yStartPos - mousePos.yPos), 2));
    ctx.arc(this.xStartPos, this.yStartPos, this.radius, 0, 100);
    ctx.fill()
    ctx.stroke();
}

Circle.prototype.render = function(ctx){
    ctx.fillStyle = this.fillColor;
    ctx.beginPath();
    ctx.arc(this.xStartPos, this.yStartPos, this.radius, 0, Math.PI * 2)        
    // this.ctx.stroke();
    ctx.fill();
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

 /**
  * PEN 
  */

 Pen.prototype = Object.create(Shape.prototype);
 Pen.prototype.constructor = Pen;

 function Pen(id, mousePos, fillColor){
     Shape.call(this, 'freehand', id, mousePos, fillColor);
     this.xEndPos = 0;
     this.yEndPos = 0;
 }

 Pen.prototype.draw = function(ctx, mousePos){
    ctx.beginPath();
    ctx.moveTo(mousePos.xPos, mousePos.yPos);
    ctx.lineTo(mousePos.xStartPos, mousePos.yStartPos);
    ctx.stroke();
    this.xEndPos = mousePos.xPos;
    this.yEndPos = mousePos.yPos;
}

Pen.prototype.render = function(ctx){
    ctx.beginPath();
    ctx.moveTo(this.xStartPos, this.yStartPos);
    ctx.lineTo(this.xEndPos, this.yEndPos);
    ctx.strokeStyle = shape.fillColor;
    ctx.stroke();
}