const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "auth",
  },
  cartItem: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      qty: {
        type: Number,
        default: 1,
      },
      varients: [
        {
          varient: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});
module.exports = model("cart", cartSchema);
