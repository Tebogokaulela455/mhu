const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Withdraw request
exports.withdrawRequest = async (req, res) => {
  const { amount, method } = req.body;
  const user = await User.findById(req.user.id);

  if (amount < 1) return res.status(400).json({ msg: 'Minimum withdrawal is $1' });
  if (user.wallet < amount) return res.status(400).json({ msg: 'Insufficient balance' });

  try {
    const fee = amount * 0.01;
    const finalAmount = amount - fee;

    // Create transaction
    const tx = new Transaction({
      user: user._id,
      type: 'withdraw',
      amount: finalAmount,
      method,
    });

    // Deduct from wallet
    user.wallet -= amount;
    await user.save();
    await tx.save();

    res.json({ msg: 'Withdrawal request submitted', transaction: tx });
  } catch (err) {
    res.status(500).json({ msg: 'Error processing withdrawal', err });
  }
};

// Get transaction history
exports.getTransactions = async (req, res) => {
  try {
    const txs = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch history' });
  }
};

// Get user balance
exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('wallet');
    res.json({ balance: user.wallet });
  } catch (err) {
    res.status(500).json({ msg: 'Could not fetch balance' });
  }
};