const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'auths'
    },
    adminApproval:{
        type:String,
        enum:['pendding','approved','cancel'],
        default:'pendding'
    }
},{timestamps:true})
module.exports = model('category',categorySchema)