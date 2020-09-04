const express = require('express');
const reptileCtrl = require('../controllers/reptile')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

  router.get('/:id', auth, reptileCtrl.findOneReptile);

  router.post('/', auth, reptileCtrl.createReptile);

  router.put('/:id', auth, reptileCtrl.editReptile);

  router.delete('/:id', auth, reptileCtrl.deleteReptile);

  router.delete('/', auth, reptileCtrl.deleteAllReptile);
  
  router.use('/', auth, reptileCtrl.findAllReptile);

module.exports = router;