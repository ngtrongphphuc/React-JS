const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    products: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("cart", cartSchema);
