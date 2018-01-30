// Shape
Shape.prototype = Object.create(Canvas.prototype);
Shape.prototype.constructor = Shape;

function Shape(type, id, mousePos, fillColor){
    this.type = type;
    this.id = id
    this.xStartPos = mousePos.xPos;
    this.yStartPos = mousePos.yPos;
    this.xEndPos = mousePos.xPos;
    this.yEndPos = mousePos.yPos;
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

     /*var clickX = new Array();
     var clickY = new Array();
     var clickDrag = new Array();
     clickX.push(mousePos.xPos);
     clickY.push(mousePos.yPos);
     clickDrag.push(true);*/
 }
 var clickX = new Array();
 var clickY = new Array();
 var clickDrag = new Array();

 function addclick(x, y, drag) {
     clickX.push(x);
     clickY.push(y);
     clickDrag.push(drag);
 }

 Pen.prototype.draw = function(ctx, mousePos){
    addclick(mousePos.xPos, mousePos.yPos, true);
    for(var i = 0; i < clickX.length; i++){
        ctx.beginPath();
        if(clickDrag[i] && i){
            ctx.moveTo(clickX[i-1], clickY[i-1]);
        }
        else {
            ctx.moveTo(clickX[i]-1, clickY[i]);
        }
        ctx.lineTo(clickX[i], clickY[i]);
        ctx.closePath();
        ctx.strokeStyle = this.fillColor;
        ctx.stroke();
    }   
 }

 Pen.prototype.render = function(ctx){
    for(var i = 0; i < clickX.length; i++){
        ctx.beginPath();
        if(clickDrag[i] && i){
            ctx.moveTo(clickX[i-1], clickY[i-1]);
        }
        else {
            ctx.moveTo(clickX[i]-1, clickY[i]);
        }
        ctx.lineTo(clickX[i], clickY[i]);
        ctx.closePath();
        ctx.strokeStyle = this.fillColor;
        ctx.stroke();
    }
 }