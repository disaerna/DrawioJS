// Prototype hieararchy declaration
Rectangle.prototype = Object.create(Form.prototype);
Rectangle.prototype.constructor = Rectangle;

// Constructor
function Rectangle(){
    Form.call(this, 'rectangle')
    this.xPos = 0;
    this.yPos = 0;
    this.width = 0;
    this.height = 0
}
// Prototypes
Rectangle.prototype.getData = function(){
    return {
        xPos: this.xPos,
        yPos: this.yPos,
        width: this.width,
        height: this.height, 
    };
}
