const mongoose = require('mongoose');

const frequencySchema = mongoose.Schema({
  period: { type: String, required: true },
  periodStart: { type: Number, required: true },
  periodEnd: { type: Number, required: false },
  foodType: { type: String, required: true },
  number: { type: String, required: true },
  delay: { type: String, required: true },
});
   
const reptileSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  group: { type: String, required: true },
  foodType: { type: [String], required: true },
  frequency: { type: [mongoose.Schema.Types.ObjectId], ref: frequencySchema },
});
   
const lastMealSchema = mongoose.Schema({
  date: { type: Date, required: true },
  vitamin: { type: Boolean, required: true },
  calcium: { type: Boolean, required: true },
});
  
const petSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  enabled: { type: Boolean, required: true },
  reptile: { type: mongoose.Schema.Types.ObjectId, ref: reptileSchema },
  birthday: { type: Date, required: false },
  shade: { type: [Date], required: false },
  lastMeal: { type: [mongoose.Schema.Types.ObjectId], ref: lastMealSchema },
  calciumFreq: { type: Number, required: false },
  vitaminFreq: { type: Number, required: false }
});

module.exports = mongoose.model('Pet', petSchema);