const Investment = require('../models/Investment');
const PLANS = { 5: 0.1, 8: 0.4, 12: 0.7, 15: 0.9, 20: 1.0, 30: 1.2, 40: 1.5 };

exports.createInvestment = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  if (!PLANS[amount]) {
    return res.status(400).json({ msg: 'Invalid amount. Use fixed plan.' });
  }

  try {
    const newInv = new Investment({
      user: userId,
      amount,
      dailyProfit: PLANS[amount],
    });

    await newInv.save();
    res.status(201).json({ msg: 'Investment created', investment: newInv });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating investment', err });
  }
};

exports.getUserInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user.id });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch investments' });
  }
};