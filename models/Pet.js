const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const frequencySchema = mongoose.Schema({
  period: { type: String, required: true },
  periodStart: { type: Number, required: true },
  periodEnd: { type: Number, required: false },
  foodType: { type: String, required: true },
  number: { type: String, required: true },
  delay: { type: String, required: true },
});
   
const reptileSchema = mongoose.Schema({
  name: { type: String, required: true, unique: false },
  imageUrl: { type: String, required: false },
  group: { type: String, required: true },
  foodType: { type: [String], required: true },
  frequency: { type: [frequencySchema], required: true, ref: frequencySchema },
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
  reptile: { type: reptileSchema, required: true, unique: false, ref: reptileSchema },
  birthday: { type: Date, required: false },
  shade: { type: [Date], required: false },
  lastMeal: { type: [lastMealSchema], required: false, ref: lastMealSchema },
  calciumFreq: { type: Number, required: false },
  vitaminFreq: { type: Number, required: false }
});

reptileSchema.plugin(uniqueValidator);
petSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Pet', petSchema);