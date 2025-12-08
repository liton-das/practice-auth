const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "auth",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  varients: [
    {
      varient: {
        type: String,
        required: true,
      },
    },
  ],
  qty: {
    type: Number,
    default: 1,
  },
});
module.exports = model('cart',cartSchema)