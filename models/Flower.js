const mongoose = require('mongoose');
  
const flowerSchema = mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  freq: { type: Number, required: true },
  enabled: { type: Boolean, required: true },
  lastMeal: { type: [Date], required: false },
  notifId: { type: String, required: false },
  picture: { type: String, required: false },  
});

module.exports = mongoose.model('Flower', flowerSchema);