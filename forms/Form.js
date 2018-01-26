// Constructor
function Form(type){
    this.type = type;
}

// Prototypes
Form.prototype.getType = function(){
    return this.type;
}

// Form inherits canvas to access mousePos etc.
Form.prototype = Object.create(Canvas.prototype);
Form.prototype.constructor = Form;