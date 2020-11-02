const Flower = require('../models/Flower')

exports.createFlower = (req, res, next) => {
    console.log('Creating flower.'); 
    delete req.body._id;
    const flower = new Flower({
      ...req.body
    });
    flower.save()
      .then(() => res.status(201).json({ message: 'Flower saved !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.findOneFlower = (req, res, next) => {
  console.log('Looking for one flower.');
    Flower.findOne({ _id: req.params.id })
      .then(flower => res.status(200).json(flower))
      .catch(error => res.status(404).json({ error }));
  };

exports.editFlower = (req, res, next) => {
    console.log('Editing flower.');
    Flower.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Flower edited !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteFlower = (req, res, next) => {
    console.log('Deleting flower.');
    Flower.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Flower deleted !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteAllFlower = (req, res, next) => {
    console.log('Deleting all flowers.');
    Flower.deleteMany()
      .then(() => res.status(200).json({ message: 'All flowers deleted !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.findAllFlower = (req, res, next) => {
    console.log('Looking for all flowers.');
    Flower.find()
      .then(flowers => res.status(200).json(flowers))
      .catch(error => res.status(400).json({ error }));
  };

exports.findFlowerByUser = (req, res, next) => {
    console.log('Looking for flowers with owner.');
    Flower.find({ owner: req.params.id })
      .then(flowers => res.status(200).json(flowers))
      .catch(error => res.status(400).json({ error }));
  };