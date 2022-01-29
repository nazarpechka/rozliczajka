const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
    unique: true,
  },
  creationDate: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

groupSchema.pre("save", async function (next) {
  if (this.isModified("isActive")) return next();

  this.isActive = true;
  next();
});

module.exports = mongoose.model("Group", groupSchema);
