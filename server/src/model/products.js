const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    tags: [
      {
        tagName: {
          type: String,
          required: true,
        },
        tagValue: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = model('Product',productSchema)