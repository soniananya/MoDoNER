const express = require('express');
const router = express.Router();

const { generateOTP, verifyOTP, resendOTP, deleteOTP } = require('../controllers/otpController');

router.post('/generate', generateOTP);
router.post('/verify', verifyOTP);
router.post('/resend', resendOTP);
router.delete('/delete/:id', deleteOTP);

module.exports = router;