const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ["waiting", "rejected", "confirmed"],
    default: "waiting",
  },
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  currency: {
    type: String,
    required: true,
    enum: ["PLN", "USD", "EUR"],
    default: "PLN",
  },
  date: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  subexpenses: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 0.01,
        },
        status: {
          type: String,
          required: true,
          enum: ["waiting", "rejected", "confirmed"],
          default: "waiting",
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
