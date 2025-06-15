const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const {
  listUsers,
  handleWithdrawal,
  listPendingWithdrawals
} = require('../controllers/adminController');

router.get('/users', auth, admin, listUsers);
router.get('/withdrawals/pending', auth, admin, listPendingWithdrawals);
router.post('/withdrawals/approve', auth, admin, handleWithdrawal);

module.exports = router;