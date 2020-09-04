const Reptile = require('../models/Reptile')

exports.createReptile = (req, res, next) => {
    console.log('Creating reptile.'); 
    delete req.body._id;
    const reptile = new Reptile({
      ...req.body
    });
    reptile.save()
      .then(() => res.status(201).json({ message: 'Reptile saved !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.findOneReptile = (req, res, next) => {
    console.log('Looking for one reptile.');
    Reptile.findOne({ _id: req.params.id })
      .then(reptile => res.status(200).json(reptile))
      .catch(error => res.status(404).json({ error }));
  };

exports.editReptile = (req, res, next) => {
    console.log('Editing reptile.');
    Reptile.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Reptile edited !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteReptile = (req, res, next) => {
    console.log('Deleting reptile.');
    Reptile.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Reptile deleted !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteAllReptile = (req, res, next) => {
    console.log('Deleting all reptiles.');
    Reptile.deleteMany()
      .then(() => res.status(200).json({ message: 'All reptiles deleted !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.findAllReptile = (req, res, next) => {
    console.log('Looking for all reptiles.');
    Reptile.find()
      .then(reptiles => res.status(200).json(reptiles))
      .catch(error => res.status(400).json({ error }));
  };