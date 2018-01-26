// Constructor
function Form(type, id){
    this.type = type;
    this.id = id
}

// Prototypes
Form.prototype.getType = function(){
    return this.type;
}

// Form inherits canvas to access mousePos etc.
Form.prototype = Object.create(Canvas.prototype);
Form.prototype.constructor = Form;