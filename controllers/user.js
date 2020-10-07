const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          username: req.body.username,
          isAdmin: req.body.isAdmin,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'New user created !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.signin = (req, res, next) => {
    if (req.body.email)
      User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(402).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              isAdmin: user.isAdmin,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    else
      User.findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.FindAllUser = (req, res, next) => {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(404).json({ error }));
  }

  exports.FindUserById = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
  }

  exports.DeleteAllUser = (req, res, next) => {
    User.deleteMany()
      .then(() => res.status(200).json({ message: 'All users deleted !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.DeleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'User deleted !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.VerifyToken = (req) => {
    var header1 = req.headers.authorization;
    if (!header1) return res.status(400).end('mauvais token or Bearer mal ecrit');

    var header = (header1.toString()).split(" ");
    var token = header[1];

    if (header < 2)
        return res.status(400).end('mauvais token or Bearer mal ecrit');
    if (header[0] != 'Bearer')
        return res.status(400).end('mauvais token or Bearer mal ecrit');
    try {
        jwt.verify(token, 'secret', {expiresIn: "500h"});
    } catch (e) {
       return res.status(400).end('mauvais token or Bearer mal ecrit');
    }
    return res.status(200).json('Successful');;
  }

