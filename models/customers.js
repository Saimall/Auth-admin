const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model('Customers', CustomerSchema);

module.exports = Data;
