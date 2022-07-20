const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  products: { type: Array },
});

module.exports = mongoose.model("Category", categorySchema);
