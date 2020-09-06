const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const petCtrl = require('../controllers/pet');

router.get('/:id', auth, petCtrl.findOnePet);

router.get('/user/:id', auth, petCtrl.findPetByUser);

router.post('/', auth, petCtrl.createPet);

router.put('/:id', auth, petCtrl.editPet);

router.delete('/:id', auth, petCtrl.deletePet);

router.delete('/', auth, petCtrl.deleteAllPet);

router.use('/', auth, petCtrl.findAllPet);

module.exports = router;