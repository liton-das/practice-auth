const { Schema, model } = require("mongoose");

const authSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        default:null
    },
    otpExpireTime:{
        type:Date,
        default:null
    },
    avatar:{
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
const auth = model('auth',authSchema)
module.exports = auth
// module.exports = model('auth',authSchema)