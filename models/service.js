const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model('Services', ServiceSchema);

module.exports = Data;
