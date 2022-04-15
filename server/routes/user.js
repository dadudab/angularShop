const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/users');
const { validateUser } = require('../middlewares');

router.post('/users/register', validateUser, registerUser);
router.post('/users/login', loginUser);

module.exports = router;
