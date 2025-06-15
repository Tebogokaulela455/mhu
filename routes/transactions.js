const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { withdrawRequest, getTransactions, getBalance } = require('../controllers/transactionController');

router.post('/withdraw', auth, withdrawRequest);
router.get('/history', auth, getTransactions);
router.get('/balance', auth, getBalance);

module.exports = router;