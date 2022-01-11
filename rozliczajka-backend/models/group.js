const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    required: true,
    default: true,
  },
  participants: {
    type: [mongoose.Types.ObjectId],
  },
  manager: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Group', groupSchema);