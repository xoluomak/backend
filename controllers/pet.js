const Pet = require('../models/Pet')

exports.createPet = (req, res, next) => {
    console.log('Creating pet.'); 
    delete req.body._id;
    const pet = new Pet({
      ...req.body
    });
    pet.save()
      .then(() => res.status(201).json({ message: 'Pet saved !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.findOnePet = (req, res, next) => {
    console.log('Looking for one pet.');
    Pet.findOne({ _id: req.params.id })
      .then(pet => res.status(200).json(pet))
      .catch(error => res.status(404).json({ error }));
  };

exports.editPet = (req, res, next) => {
    console.log('Editing pet.');
    Pet.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Pet edited !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deletePet = (req, res, next) => {
    console.log('Deleting pet.');
    Pet.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Pet deleted !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteAllPet = (req, res, next) => {
    console.log('Deleting all pets.');
    Pet.deleteMany()
      .then(() => res.status(200).json({ message: 'All pets deleted !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.findAllPet = (req, res, next) => {
    console.log('Looking for all pets.');
    Pet.find()
      .then(pets => res.status(200).json(pets))
      .catch(error => res.status(400).json({ error }));
  };

exports.findPetByUser = (req, res, next) => {
    console.log('Looking for pets with owner.' );
    Pet.find({ [owner]: req.params.id })
      .then(pets => res.status(200).json(pets))
      .catch(error => res.status(400).json({ error }));
  };