// Shape
Shape.prototype = Object.create(Canvas.prototype);
Shape.prototype.constructor = Shape;

function Shape(type, id, mousePos, fillColor, strokeColor, lineWidth){
    this.type = type;
    this.id = id;
    this.xStartPos = mousePos.xPos;
    this.yStartPos = mousePos.yPos;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
}

Shape.prototype.getType = function(){
    return this.type;
}

Shape.prototype.setStyles = function(ctx){
    this.lineWidth = lineWidth();
    ctx.fillStyle = this.strokeColor;
    ctx.strokeStyle = this.fillColor;
    ctx.lineWidth = this.lineWidth;
}

Shape.prototype.loadStyles = function(ctx){
    ctx.fillStyle = this.strokeColor;
    ctx.strokeStyle = this.fillColor;
    ctx.lineWidth = this.lineWidth;
}

/**
 * RECTANGLE
 */
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

function Rectangle(id, mousePos, fillColor, strokeColor, lineWidth){
    Shape.call(this, 'rectangle', id, mousePos, fillColor, strokeColor, lineWidth)
    this.width = 0;
    this.height = 0
}

Rectangle.prototype.draw = function(ctx, mousePos){
    this.width = mousePos.xPos - this.xStartPos;
    this.height = mousePos.yPos - this.yStartPos;
    this.setStyles(ctx);
    ctx.fillRect(this.xStartPos, this.yStartPos, this.width, this.height);
    ctx.strokeRect(this.xStartPos, this.yStartPos, this.width, this.height)
}

Rectangle.prototype.render = function(ctx){
    this.loadStyles(ctx);
    ctx.fillRect(this.xStartPos, this.yStartPos, this.width, this.height);
    ctx.strokeRect(this.xStartPos, this.yStartPos, this.width, this.height)

}

Rectangle.prototype.move = function(ctx, mousePos){
    
}

/**
 * CIRCLE
 */
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

function Circle(id, mousePos, fillColor, strokeColor, lineWidth){
    Shape.call(this, 'circle', id, mousePos, fillColor, strokeColor, lineWidth);
    this.radius = 0;
}

Circle.prototype.draw = function(ctx, mousePos){
    ctx.beginPath();
    this.radius =  Math.sqrt(Math.pow((this.xStartPos - mousePos.xPos),2) + Math.pow((this.yStartPos - mousePos.yPos), 2));
    this.setStyles(ctx);
    ctx.arc(this.xStartPos, this.yStartPos, this.radius, 0, Math.PI * 2);
    ctx.fill()
    ctx.stroke();
}

Circle.prototype.render = function(ctx){
    ctx.beginPath();
    this.loadStyles(ctx);
    ctx.arc(this.xStartPos, this.yStartPos, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

}

/**
 * LINE
 */
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

function Line(id, mousePos, fillColor, strokeColor, lineWidth){
    Shape.call(this, 'line', id, mousePos, fillColor, strokeColor, lineWidth);
    this.xEndPos = 0;
    this.yEndPos = 0;
}

Line.prototype.draw = function(ctx, mousePos){
    ctx.beginPath();
    ctx.moveTo(mousePos.xPos, mousePos.yPos);
    this.setStyles(ctx);
    ctx.lineTo(this.xStartPos, this.yStartPos);
    ctx.stroke();
    this.xEndPos = mousePos.xPos;
    this.yEndPos = mousePos.yPos;
}

Line.prototype.render = function(ctx){
    ctx.beginPath();
    this.loadStyles(ctx);
    ctx.moveTo(this.xStartPos, this.yStartPos);
    ctx.lineTo(this.xEndPos, this.yEndPos);
    ctx.stroke();
}

/** 
 * TEXT
 */

 Letters.prototype = Object.create(Shape.prototype);
 Letters.prototype.constructor = Letters;

 function Letters(id, fillColor, strokeColor, lineWidth){
    Shape.call(this, 'letters', id, fillColor, strokeColor, lineWidth);
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
    this.setStyles(ctx);
    ctx.fillText(this.value, mousePos.xPos, mousePos.yPos);
    ctx.strokeText(this.value, mousePos.xPos, mousePos.yPos);
    ctx.closePath();
    
}

 Letters.prototype.render = function(ctx){
    ctx.beginPath();
    this.loadStyles(ctx);
    ctx.font = this.fontSize + " " + this.fontType;
    ctx.fillText(this.value, shape.xStartPos, shape.yStartPos);
    ctx.strokeText(this.value, shape.xStartPos, shape.yStartPos);
    ctx.closePath();
 }
 /**
  * PEN 
  */

 Pen.prototype = Object.create(Shape.prototype);
 Pen.prototype.constructor = Pen;

 function Pen(id, mousePos, fillColor, strokeColor, lineWidth){
     Shape.call(this, 'pen', id, mousePos, fillColor, strokeColor, lineWidth);
     this.xEndPos = 0;
     this.yEndPos = 0;
     this.xPos = [];
     this.yPos = [];
     this.posArr = [];
     this.moveArr = [];
 }


Pen.prototype.click = function(mousePos, drag) {
     this.xPos.push(mousePos.xPos);
     this.yPos.push(mousePos.yPos);
     this.moveArr.push(mousePos);
     this.posArr.push(drag);
 }

 Pen.prototype.draw = function(ctx, mousePos){
    this.lineWidth = lineWidth();
    this.click(mousePos, true);
    this.drawRender(ctx)
 }

 Pen.prototype.render = function(ctx){
    this.drawRender(ctx);
    ctx.closePath();
 }


Pen.prototype.drawRender = function(ctx){
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoine = "round";
    // ctx.shadowBlur = 5;
    // ctx.shadowColor = this.fillColor;
    for(var i = 0; i < this.xPos.length; i++){ 
        if(this.posArr[i]){
            ctx.beginPath();
            ctx.moveTo(this.xPos[i], this.yPos[i]);
        }
        ctx.lineTo(this.xPos[i+1], this.yPos[i+1]);
        ctx.strokeStyle = this.fillColor;
        ctx.stroke();
   }
 }

 function lineWidth(){
     var width = document.getElementById("lineWidth");
     return width.options[width.selectedIndex].value;
 }
 
