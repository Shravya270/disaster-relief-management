const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim:true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    enum: ['Money', 'Food', 'Clothes', 'Medicine', 'Other'],
    default: 'Money'
  },
  message: {
    type: String,
    trim: true
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending'
  },
  transactionId: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['Stripe', 'Cash', 'Bank Transfer'],
    default: 'Stripe'
  }

},
{
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
