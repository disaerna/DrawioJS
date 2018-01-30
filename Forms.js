// Shape
Shape.prototype = Object.create(Canvas.prototype);
Shape.prototype.constructor = Shape;

function Shape(type, id, mousePos, fillColor, lineWidth){
    this.type = type;
    this.id = id
    this.xStartPos = mousePos.xPos;
    this.yStartPos = mousePos.yPos;
    this.xEndPos = 0;
    this.yEndPos = 0;
    this.lineWidth = lineWidth;
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

function Rectangle(id, mousePos, fillColor, lineWidth){
    Shape.call(this, 'rectangle', id, mousePos, fillColor)
    this.width = 0;
    this.height = 0
}

Rectangle.prototype.draw = function(ctx, mousePos){
    this.width = mousePos.xPos - this.xStartPos;
    this.height = mousePos.yPos - this.yStartPos;
    this.lineWidth = lineWidth();
    ctx.lineWidth = this.lineWidth;
    ctx.fillRect(this.xStartPos, this.yStartPos, this.width, this.height);
}

Rectangle.prototype.render = function(ctx){
    ctx.fillStyle = this.fillColor;
    ctx.lineWidth = this.lineWidth;
    ctx.fillRect(this.xStartPos, this.yStartPos, this.width, this.height);
}

/**
 * CIRCLE
 */
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

function Circle(id, mousePos, fillColor, lineWidth){
    Shape.call(this, 'circle', id, mousePos, fillColor);
    this.radius = 0;
}

Circle.prototype.draw = function(ctx, mousePos){
    ctx.beginPath();
    this.radius =  Math.sqrt(Math.pow((this.xStartPos - mousePos.xPos),2) + Math.pow((this.yStartPos - mousePos.yPos), 2));
    this.lineWidth = lineWidth();
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.xStartPos, this.yStartPos, this.radius, 0, 100);
    ctx.fill()
    ctx.stroke();
}

Circle.prototype.render = function(ctx){
    ctx.fillStyle = this.fillColor;
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.xStartPos, this.yStartPos, this.radius, 0, Math.PI * 2)        
    // this.ctx.stroke();
    ctx.fill();
}

/**
 * LINE
 */
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

function Line(id, mousePos, fillColor, lineWidth){
    Shape.call(this, 'line', id, mousePos, fillColor);
}

Line.prototype.draw = function(ctx, mousePos){
    ctx.beginPath();
    this.lineWidth = lineWidth();
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(mousePos.xPos, mousePos.yPos);
    ctx.lineTo(this.xStartPos, this.yStartPos);
    ctx.strokeStyle = this.fillColor;
    ctx.stroke();
    this.xEndPos = mousePos.xPos;
    this.yEndPos = mousePos.yPos;
}

Line.prototype.render = function(ctx){
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.xStartPos, this.yStartPos);
    ctx.lineTo(this.xEndPos, this.yEndPos);
    ctx.strokeStyle = this.fillColor;
    ctx.stroke();
}

/** 
 * TEXT
 */

 Letters.prototype = Object.create(Shape.prototype);
 Letters.prototype.constructor = Letters;

 function Letters(id, fillColor, lineWidth){
    Shape.call(this, 'letters', id, fillColor);
    this.fontSize = "12px";
    this.fontType = "Arial";
    this.font = this.fontSize + " " + this.fontType;
    this.value = "";
 }

 Letters.prototype.draw = function(ctx, mousePos){
    this.value = document.getElementById("textValue").value;
    var fs = document.getElementById("textSize");
    this.fontSize = fs.options[fs.selectedIndex].text;
    var ft = document.getElementById("textType");
    this.fontType = ft.options[ft.selectedIndex].text;
    ctx.beginPath();
    ctx.font = this.fontSize + " " + this.fontType;
    ctx.fillText(this.value, mousePos.xPos, mousePos.yPos);
    ctx.closePath();
    
}

 Letters.prototype.render = function(ctx){
    ctx.beginPath();
    ctx.font = this.fontSize + " " + this.fontType;
    ctx.fillText(this.value, shape.xStartPos, shape.yStartPos);
    ctx.closePath();
 }
 /**
  * PEN 
  */

 Pen.prototype = Object.create(Shape.prototype);
 Pen.prototype.constructor = Pen;

 function Pen(id, mousePos, fillColor, lineWidth){
     Shape.call(this, 'pen', id, mousePos, fillColor);
     this.xEndPos = 0;
     this.yEndPos = 0;
     this.xPos = [];
     this.yPos = [];
     this.posArr = [];
 }


Pen.prototype.click = function(x, y, drag) {
     this.xPos.push(x);
     this.yPos.push(y);
     this.posArr.push(drag);
 }

 Pen.prototype.draw = function(ctx, mousePos){
    this.lineWidth = lineWidth();
    this.click(mousePos.xPos, mousePos.yPos, true);
    this.drawRender(ctx)
 }

 Pen.prototype.render = function(ctx){
    this.drawRender(ctx);
    ctx.closePath();
 }

 Pen.prototype.drawRender = function(ctx){
    for(var i = 0; i < this.xPos.length; i++){
       ctx.beginPath();
       ctx.lineWidth = this.lineWidth;
       if(this.posArr[i] && i > 0){
           ctx.moveTo(this.xPos[i-1], this.yPos[i-1]);
       }
       else {
           ctx.moveTo(this.xPos[i]-1, this.yPos[i]);
       }
       ctx.lineTo(this.xPos[i], this.yPos[i]);
       ctx.strokeStyle = this.fillColor;
       ctx.stroke();
   }
 }

 function lineWidth(){
     var width = document.getElementById("lineWidth");
     return width.options[width.selectedIndex].value;
 }
 