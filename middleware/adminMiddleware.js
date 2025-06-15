const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: 'Admin access required' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Authorization failed' });
  }
};