const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    maxLength: 32,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 64,
  },
  email: {
    type: String,
    required: true,
    maxLength: 32,
    validate: {
      validator: isEmail,
      message: "Invalid email.",
    },
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 32,
  },
  surname: {
    type: String,
    required: true,
    maxLength: 32,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  isParticipant: {
    type: Boolean,
    required: true,
  },
  joinDate: {
    type: Date,
    default: new Date().toISOString(),
  },
  city: {
    type: String,
  },
  pesel: {
    type: String,
    length: 11,
  },
  agency: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
