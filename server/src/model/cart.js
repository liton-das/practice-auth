const { Schema, model } = require("mongoose");

const cartSchema=new Schema({
    creatorId:{
        type:String
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    varient:[
        {
            varient:{
                type:String,
                required:true
            },
            qty:{
                type:String,
                default:1
            }
        }
    ]
})
module.exports = model('cart',cartSchema)