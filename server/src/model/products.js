const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    subImages: [
      {
        type: String,
        default: null,
      },
    ],
    price: {
      type: String,
      required: true,
    },
    varient: [
      {
        varientName: {
          type: String,
          default: null,
        },
        extraPrice: {
          type: Number,
          default: null,
        },
      },
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    review: [
      {
        reviewId: {
          type: Schema.Types.ObjectId,
          ref: "auths",
        },
        review:{
          type:String,
          default:null
        }
      },
    ],
    discountPrice:{
      type:String,
      default:null
    },
    tags:[
      {
        type:String,
        default:null
      }
    ],
    stock:{
      type:Number,
      required:true
    },
    sku:{
      type:String,
      required:true
    },
    adminApproval:{
        type:String,
        enum:['pending','approved','cancle'],
        default:'pending'
    },
    slug:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);
module.exports = model('Product',productSchema)