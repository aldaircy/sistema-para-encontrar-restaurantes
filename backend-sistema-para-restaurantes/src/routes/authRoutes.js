const express = require('express');
const router = express.Router();
const { signUp, signIn, logOut } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', logOut);

module.exports = router;
