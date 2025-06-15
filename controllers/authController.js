const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { phone, password, fullName, country, referredBy } = req.body;
  try {
    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ msg: 'Phone already registered' });

    const hashed = await bcrypt.hash(password, 12);
    user = new User({
      phone,
      password: hashed,
      fullName,
      country,
      referralCode: generateReferralCode(phone),
      referredBy
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering user', err });
  }
};

exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', err });
  }
};

function generateReferralCode(phone) {
  return 'REF' + phone.slice(-5) + Math.floor(Math.random() * 1000);
}