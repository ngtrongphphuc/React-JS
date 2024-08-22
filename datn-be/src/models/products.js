const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    // nguồn gốc
    original: {
      type: String,
      required: true,
    },
    // kích thước
    size: {
      type: String,
      required: true,
    },
    // tình trạng sức khoẻ
    health: {
      type: String,
      required: true,
    },
    // điều kiện sống
    habitat: {
      type: String,
      required: true,
    },
    // nguồn thức ăn
    foodSource: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("products", productSchema);
