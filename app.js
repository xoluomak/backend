const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const reptileRoutes = require('./routes/reptile');
const userRoutes = require('./routes/user');
const petRoutes = require('./routes/pet');
const flowerRoutes = require('./routes/flower');
const path = require('path');

const app = express();

  mongoose.connect('mongodb+srv://admin:admin1234@realmcluster.mgck9.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected !'))
    .catch(() => console.log('MongoDB connexion failed...'));

  app.use((req, res, next) => {
    console.log('Request received !');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use('/assets/pictures', express.static(path.join(__dirname, 'assets/pictures')));

  app.use('/api/reptile', reptileRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/api/pet', petRoutes);
  app.use('/api/flower', flowerRoutes);

module.exports = app;