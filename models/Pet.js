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
  frequency: { type: [Schema.Types.ObjectId], ref: Frequency },
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
  reptile: { type: Schema.Types.ObjectId, ref: Reptile },
  birthday: { type: Date, required: false },
  shade: { type: [Date], required: false },
  lastMeal: { type: [Schema.Types.ObjectId], ref: LastMeal },
  calciumFreq: { type: Number, required: false },
  vitaminFreq: { type: Number, required: false }
});

reptileSchema.plugin(uniqueValidator);
petSchema.plugin(uniqueValidator);

const Reptile = mongoose.model('Reptile', reptileSchema);
const LastMeal = mongoose.model('LastMeal', lastMealSchema);
const Frequency = mongoose.model('Frequency', frequencySchema);

module.exports = mongoose.model('Pet', petSchema);