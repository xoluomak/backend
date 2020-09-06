const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/users', userCtrl.FindAllUser);
router.get('/user/:id', userCtrl.FindUserById);
router.delete('/users', userCtrl.DeleteAllUser);
router.delete('/user/:id', userCtrl.DeleteUser);

module.exports = router;