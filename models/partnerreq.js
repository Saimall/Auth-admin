const mongoose = require('mongoose');

// Define the data model schema
const PartnerRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    aadhar: {
      type: String,
      required: false,
    },
    pancard: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the data model using the schema
const Data = mongoose.model('PartnerRequest', PartnerRequestSchema);

module.exports = Data;
