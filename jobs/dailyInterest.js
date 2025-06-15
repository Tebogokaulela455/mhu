const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Investment = require('../models/Investment');
const User = require('../models/User');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

async function runInterestJob() {
  const activeInvestments = await Investment.find({ status: 'active' });

  for (let inv of activeInvestments) {
    const user = await User.findById(inv.user);
    if (!user) continue;

    user.wallet += inv.dailyProfit;
    await user.save();
  }

  console.log(`💸 Daily interest applied to ${activeInvestments.length} investments`);
  process.exit();
}

runInterestJob();