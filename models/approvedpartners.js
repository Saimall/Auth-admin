const mongoose = require('mongoose');

const approvedPartnerSchema = new mongoose.Schema({
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
  isOnDuty: {
    type: Boolean,
    default: false,
  },
  payment: {
    outstanding: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Number,
      default: 0,
    },
  },
}, {
  timestamps: true,
});

const ApprovedPartner = mongoose.model('ApprovedPartner', approvedPartnerSchema);

module.exports = ApprovedPartner;
