const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  products: { type: Array },
});


module.exports = mongoose.model("User", userSchema);
