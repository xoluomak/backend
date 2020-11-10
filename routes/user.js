const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/users', auth, userCtrl.FindAllUser);
router.get('/user/:id', auth, userCtrl.FindUserById);
router.delete('/users', auth, userCtrl.DeleteAllUser);
router.delete('/user/:id', auth, userCtrl.DeleteUser);
router.get('/verify', userCtrl.VerifyToken);

module.exports = router;