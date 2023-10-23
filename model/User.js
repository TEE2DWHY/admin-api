const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Field cannot be empty"],
  },
  lastName: {
    type: String,
    required: [true, "Field cannot be empty"],
  },
  email: {
    type: String,
    required: [true, "Field cannot be empty"],
    unique: [true, "Email is already taken."],
  },
  password: {
    type: String,
    required: [true, "Field cannot be empty"],
    minLength: 8,
  },
});

module.exports = mongoose.model("User", userSchema);
