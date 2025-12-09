const { Schema, model } = require("mongoose");

const copunSchema = new Schema({
    copunName:{
        type:String,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    }
},{timestamps:true})
module.exports = model('copun',copunSchema)