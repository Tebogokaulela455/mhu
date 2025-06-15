const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: String,
  country: String,
  isAdmin: { type: Boolean, default: false },
  referralCode: String,
  referredBy: String,
  wallet: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);