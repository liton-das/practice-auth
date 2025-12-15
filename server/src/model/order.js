const { Schema, model } = require("mongoose");

const orderSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        default:null
    },
    productInfo:Array,
    copun:{
        type:String,
        default:null
    },
    totalPrice:{
        type:String,
        required:true
    },
    total:{
        type:String,
        required:true
    }
},{Timestamp:true})
module.exports = model('order',orderSchema)