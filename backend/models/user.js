const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    maxLength: 64,
  },
  email: {
    type: String,
    required: true,
    maxLength: 25,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
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
