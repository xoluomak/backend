const reptileRoutes = require('./routes/reptile');
const flowerRoutes = require('./routes/flower');
const userRoutes = require('./routes/user');
const { Expo } = require("expo-server-sdk");
const bodyParser = require('body-parser');
const petRoutes = require('./routes/pet');
const User = require('./models/User')
const Pet = require('./models/Pet')
const mongoose = require('mongoose');
const express = require('express');
const cron = require('node-cron');
const path = require('path');
const expo = new Expo();

const app = express();

  // Connexion to MongoDb dataBase
  mongoose.connect('mongodb+srv://admin:admin1234@backend.mgck9.mongodb.net/repminder?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected !'))
    .catch(() => console.log('MongoDB connexion failed...'));

  // Setting up express app
  app.use((req, res, next) => {
    console.log('Request received !');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use('/assets/pictures', express.static(path.join(__dirname, 'assets/pictures')));

  // Declaring the project's routes
  app.use('/api/reptile', reptileRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/api/pet', petRoutes);
  app.use('/api/flower', flowerRoutes);

  // Crontab sending notifications everyday to pets who needs to be fed
  cron.schedule('* * * * *', function() {
    User.find()
    .then((users) => {
      for (let user of users) {
        let receipt = "Failed to send notfication to " + user.username;
        if (Expo.isExpoPushToken(user.expoPushToken)) {
          receipt = expo.sendPushNotificationsAsync({
            to: user.expoPushToken,
            sound: "default",
            title: "Test quotidien !",
            body: "Notification RepMinder !",
            data: null
          });          
          continue;
        }
        console.log(receipt);
      }
    })
    Pet.find()
      .then((pets) => {
        let Difference_In_Days, months = 0;
        let lastMeal, today = new Date();

        console.log(pets);
        console.log('Sending Notifications');
        for (let pet of pets) {
          console.log("Checking pet : " + pet.name);
          if (pet.enabled && pet.lastMeal.length > 1)
            console.log("    " + pet.name + " is enabled for notifications");
            lastMeal = new Date(pet.lastMeal[pet.lastMeal.length - 1].date)
            Difference_In_Days = Math.floor((today.getTime() - lastMeal.getTime()) / (1000 * 60 * 60 * 24));
            months = ((today.getFullYear() - pet.birthday.getFullYear()) * 12) + (today.getMonth() - pet.birthday.getMonth());
            if (pet.reptile.frequency)
              for (let frequency of pet.reptile.frequency) {
                console.log("Looking for the correct frequency for the pet " + pet.name);
                if (frequency.periodEnd > months || frequency.periodEnd == null)
                  if (Difference_In_Days >= +frequency.delay) {
                    console.log(pet.name + " needs to be fed, sending notification");
                    User.findOne({ _id: pet.owner })
                    .then((user) => {
                      console.log("Verifying user's expo push token");
                      if (Expo.isExpoPushToken(user.expoPushToken)) {
                        console.log("Notification send successfully");
                        let receipt = expo.sendPushNotificationsAsync({
                          to: user.expoPushToken,
                          sound: "default",
                          title: "Nourrissez " + pet.name + " aujourd'hui !",
                          body: "Donnez " + frequency.number + " " + frequency.foodType + (frequency.number > 1 ? "s" : "") + " a " + this.state.pet.name + " !",
                          data: null
                        });
                        console.log(receipt);
                      }
                    })
                    .catch((error) => {
                      console.log("Failed sending notification");
                      res.status(404).json({ error })
                    });   
                  } 
              }        
        }
      })
      .catch(console.log("Failed getting users to push notifications."));
  });

module.exports = app;