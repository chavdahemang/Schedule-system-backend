// models/BookingLink.js
const mongoose = require('mongoose');

const bookingLinkSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BookingLink', bookingLinkSchema);
