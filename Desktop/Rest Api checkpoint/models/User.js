let mongoose = require('mongoose')

const personSchema = mongoose.Schema;

let person = new personSchema({
    name : {
        type : String,
        required : true,
        unique: true,
    },
    age : { 
        type : Number ,
        required : true
    },
    
})

const model = mongoose.model("persons", person);

module.exports = model