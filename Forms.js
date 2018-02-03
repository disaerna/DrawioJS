// Shape
Shape.prototype = Object.create(Canvas.prototype);
Shape.prototype.constructor = Shape;

var currentLetter;
var currentCtx;

function Shape(type, id, mousePos, fillColor, strokeColor, lineWidth, stroke) {
    this.type = type;
    this.id = id;
    this.xStartPos = mousePos.xPos;
    this.yStartPos = mousePos.yPos;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
    this.stroke = stroke;
}

Shape.prototype.getType = function() {
    return this.type;
};

Shape.prototype.setStyles = function(ctx) {
    this.lineWidth = lineWidth();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;
};

Shape.prototype.loadStyles = function(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;
};

/**
 * RECTANGLE
 */
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

function Rectangle(id, mousePos, fillColor, strokeColor, lineWidth, stroke) {
    Shape.call(
        this,
        "rectangle",
        id,
        mousePos,
        fillColor,
        strokeColor,
        lineWidth,
        stroke
    );
    this.width = 0;
    this.height = 0;
    this.xEndPos = 0;
    this.yEndPos = 0;
}

Rectangle.prototype.draw = function(ctx, mousePos) {
    this.width = mousePos.xPos - this.xStartPos;
    this.height = mousePos.yPos - this.yStartPos;
    this.setStyles(ctx);
    if (this.stroke === "stroke") {
        ctx.strokeRect(this.xStartPos, this.yStartPos, this.width, this.height);
    } else {
        ctx.fillRect(this.xStartPos, this.yStartPos, this.width, this.height);
        ctx.strokeRect(this.xStartPos, this.yStartPos, this.width, this.height);
    }
    this.xEndPos = mousePos.xPos;
    this.yEndPos = mousePos.yPos;
};

Rectangle.prototype.render = function(ctx) {
    this.loadStyles(ctx);
    if (this.stroke === "stroke") {
        ctx.strokeRect(this.xStartPos, this.yStartPos, this.width, this.height);
    } else {
        ctx.fillRect(this.xStartPos, this.yStartPos, this.width, this.height);
        ctx.strokeRect(this.xStartPos, this.yStartPos, this.width, this.height);
    }
};

/**
 * CIRCLE
 */
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

function Circle(id, mousePos, fillColor, strokeColor, lineWidth, stroke) {
    Shape.call(
        this,
        "circle",
        id,
        mousePos,
        fillColor,
        strokeColor,
        lineWidth,
        stroke
    );
    this.radius = 0;
}

Circle.prototype.draw = function(ctx, mousePos) {
    ctx.beginPath();
    this.radius = Math.sqrt(
        Math.pow(this.xStartPos - mousePos.xPos, 2) +
            Math.pow(this.yStartPos - mousePos.yPos, 2)
    );
    this.setStyles(ctx);
    ctx.arc(this.xStartPos, this.yStartPos, this.radius, 0, Math.PI * 2);
    if (this.stroke === "stroke") {
        ctx.stroke();
    } else {
        ctx.fill();
        ctx.stroke();
    }
};

Circle.prototype.render = function(ctx) {
    ctx.beginPath();
    this.loadStyles(ctx);
    ctx.arc(this.xStartPos, this.yStartPos, this.radius, 0, Math.PI * 2);
    if (this.stroke === "stroke") {
        ctx.stroke();
    } else {
        ctx.fill();
        ctx.stroke();
    }
};

/**
 * LINE
 */
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

function Line(id, mousePos, fillColor, strokeColor, lineWidth) {
    Shape.call(this, "line", id, mousePos, fillColor, strokeColor, lineWidth);
    this.xEndPos = 0;
    this.yEndPos = 0;
}

Line.prototype.draw = function(ctx, mousePos) {
    console.log("draw");
    ctx.beginPath();
    ctx.moveTo(mousePos.xPos, mousePos.yPos);
    this.setStyles(ctx);
    ctx.lineTo(this.xStartPos, this.yStartPos);
    ctx.stroke();
    this.xEndPos = mousePos.xPos;
    this.yEndPos = mousePos.yPos;
    ctx.closePath();
};

Line.prototype.render = function(ctx) {
    ctx.beginPath();
    this.loadStyles(ctx);
    ctx.moveTo(this.xStartPos, this.yStartPos);
    ctx.lineTo(this.xEndPos, this.yEndPos);
    ctx.stroke();
    ctx.closePath();
};

/**
 * TEXT
 */

Letters.prototype = Object.create(Shape.prototype);
Letters.prototype.constructor = Letters;

function Letters(id, mousePos, fillColor, strokeColor, lineWidth) {
    Shape.call(this, "letters", id, fillColor, strokeColor, lineWidth);
    this.fontSize = "12px";
    this.fontType = "Arial";
    this.font = this.fontSize + " " + this.fontType;
    this.value = "";
    this.xStartPos = mousePos.xPos;
    this.yStartPos = mousePos.yPos;
    this.width = 0;
    this.height = 0;
}

Letters.prototype.display = function() {
    var fs = document.getElementById("textSize");
    this.fontSize = fs.options[fs.selectedIndex].text;
    var ft = document.getElementById("textType");
    this.fontType = ft.options[ft.selectedIndex].text;
    $("#textValue").removeAttr("style");
    $("#textValue").css({
        top: mousePos.yPos + $("canvas").offset().top,
        left: mousePos.xPos + $("canvas").offset().left,
        height: this.fontSize,
        fontSize: this.fontSize,
        display: "block",
        color: this.fillColor
    });

    setTimeout(function() {
        $("#textValue").focus();
    }, 50);
};

Letters.prototype.draw = function(ctx, mousePos) {
    this.value = document.getElementById("textValue").value;
    this.width = ctx.measureText(this.value).width;
    var temp = String(this.fontSize);
    this.height = temp.slice(0, 2);
    ctx.beginPath();
    ctx.font = this.fontSize + " " + this.fontType;
    this.setStyles(ctx);
    //Position of the text was jumping, trying to minimize it with -5
    this.yStartPos = parseInt(this.height) + parseInt(this.yStartPos) - 5;
    ctx.fillText(this.value, this.xStartPos, this.yStartPos);
    //ctx.strokeText(this.value, this.xStartPos, this.yStartPos);
    ctx.closePath();
    $("#textValue")
        .removeAttr("style")
        .css("display", "none");
    document.getElementById("textValue").value = "";
};

Letters.prototype.render = function(ctx) {
    ctx.beginPath();
    this.loadStyles(ctx);
    ctx.font = this.fontSize + " " + this.fontType;
    ctx.fillText(this.value, shape.xStartPos, shape.yStartPos);
    //ctx.strokeText(this.value, shape.xStartPos, shape.yStartPos);
    ctx.closePath();
};
/**
 * PEN
 */

Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

function Pen(id, mousePos, fillColor, strokeColor, lineWidth) {
    Shape.call(this, "pen", id, mousePos, fillColor, strokeColor, lineWidth);
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
};

Pen.prototype.draw = function(ctx, mousePos) {
    this.lineWidth = lineWidth();
    this.click(mousePos, true);
    this.drawRender(ctx);
};

Pen.prototype.render = function(ctx) {
    this.drawRender(ctx);
    ctx.closePath();
};

Pen.prototype.drawRender = function(ctx) {
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";

    //ctx.shadowColor = this.fillColor;
    for (var i = 0; i < this.xPos.length; i++) {
        if (this.posArr[i]) {
            ctx.beginPath();
            ctx.moveTo(this.xPos[i], this.yPos[i]);
        }
        ctx.lineTo(this.xPos[i + 1], this.yPos[i + 1]);
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
    }
};

function lineWidth() {
    var width = document.getElementById("lineWidth");
    return width.options[width.selectedIndex].value;
}
