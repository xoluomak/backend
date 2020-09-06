const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/users', userCtrl.FindAllUser);

module.exports = router;