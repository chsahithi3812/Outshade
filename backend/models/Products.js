const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
}); 

module.exports = mongoose.model("Product", productSchema);