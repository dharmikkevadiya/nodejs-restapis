const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  login,
  getMe,
  addData,
  verifyCode,
  forgotPassword,
} = require('../controllers/auth.js');
const { LoginValidation } = require('../middleware/validationSchema');

//@route    POST /api/auth/login
//@desc     User login
//@access   PUBLIC
router.post('/login', LoginValidation, login.controller);

//@route    GET /api/auth/me
//@desc     GET me
//@access   PUBLIC
router.get('/me', auth, getMe.controller);

//@route    POST /api/auth/addData
//@desc     User login
//@access   PUBLIC
router.post('/addData', addData.controller);

//@route    POST /api/auth/verify-code
//@desc     Verify the provided code for password reset
//@access   Public
router.post('/verify-code', verifyCode.controller);

//@route    POST /api/auth/forgot-password
//@desc     Initiate the password reset process and send a verification code
//@access   Public
router.post('/forgot-password', forgotPassword.controller);

module.exports = router;
