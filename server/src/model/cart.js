const { Schema, model } = require("mongoose");

const cartSchema=new Schema({
    creatorId:{
        type:String,
        required:true
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    variant:[
        {
            variant:{
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