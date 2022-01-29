const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 32,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 64,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 32,
    validate: {
      validator: isEmail,
      message: "Invalid email.",
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
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
    trim: true,
  },
  pesel: {
    type: String,
    trim: true,
    length: 11,
  },
  agency: {
    type: String,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10).catch(next);
  next();
});

userSchema.methods.validatePassword = async function validatePassword(
  candidate
) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
