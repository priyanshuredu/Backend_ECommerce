const express = require('express');
const router = express.Router();
const {createUser ,login ,resetPassword ,verifyEmail ,forgotPassword ,updateProfile ,getMe} = require('../controller/userController');
const { auth } = require('../middleware/auth');

router.post('/sign-up', createUser);
router.post('/log-in', login);
router.post('/verify-mail', verifyEmail);
router.post('/forgot-password', forgotPassword);

router.post('/reset-password', auth, resetPassword);

router.get('/get-me',auth ,getMe);

module.exports = router;