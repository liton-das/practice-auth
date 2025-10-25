const { Schema, model } = require("mongoose");

const authSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        default:null
    },
    otpExpireTime:{
        type:Date,
        default:null
    },
    avater:{
        type:String,
        default:'avater'
    },
    address:{
        type:String,
        required:true
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    userRole:{
        type:String,
        enum:['user','admin','staff'],
        default:'user'
    }
},{timestamps:true})

module.exports = model('auth',authSchema)