const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get all users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to get users' });
  }
};

// List pending withdrawals
exports.listPendingWithdrawals = async (req, res) => {
  try {
    const txs = await Transaction.find({ type: 'withdraw', status: 'pending' }).populate('user', 'phone');
    res.json(txs);
  } catch (err) {
    res.status(500).json({ msg: 'Could not fetch withdrawals' });
  }
};

// Approve/Reject withdrawal
exports.handleWithdrawal = async (req, res) => {
  const { txId, action } = req.body;

  if (!['approved', 'rejected'].includes(action)) {
    return res.status(400).json({ msg: 'Invalid action' });
  }

  try {
    const tx = await Transaction.findById(txId);
    if (!tx || tx.type !== 'withdraw') return res.status(404).json({ msg: 'Transaction not found' });

    tx.status = action;
    await tx.save();
    res.json({ msg: `Withdrawal ${action}` });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update withdrawal' });
  }
};