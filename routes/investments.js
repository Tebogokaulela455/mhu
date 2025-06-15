const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createInvestment, getUserInvestments } = require('../controllers/investmentController');

router.post('/create', auth, createInvestment);
router.get('/my-investments', auth, getUserInvestments);

module.exports = router;