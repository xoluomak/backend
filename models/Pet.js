const mongoose = require('mongoose');
   
const lastMealSchema = mongoose.Schema({
  date: { type: Date, required: true },
  vitamin: { type: Boolean, required: true },
  calcium: { type: Boolean, required: true },
});
  
const petSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  enabled: { type: Boolean, required: true },
  reptileId: { type: String, required: true },
  birthday: { type: Date, required: false },
  shade: { type: [Date], required: false },
  lastMeal: { type: [lastMealSchema], required: false },
  calciumFreq: { type: Number, required: false },
  vitaminFreq: { type: Number, required: false }
});

module.exports = mongoose.model('Pet', petSchema);