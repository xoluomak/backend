const express = require('express');
const router = express.Router();

const flowerCtrl = require('../controllers/flower');

router.get('/:id', flowerCtrl.findOneFlower);

router.get('/user/:id', flowerCtrl.findFlowerByUser);

router.post('/', flowerCtrl.createFlower);

router.put('/:id', flowerCtrl.editFlower);

router.delete('/:id', flowerCtrl.deleteFlower);

router.delete('/', flowerCtrl.deleteAllFlower);

router.use('/', flowerCtrl.findAllFlower);

module.exports = router;