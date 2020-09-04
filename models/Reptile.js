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
  name: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: false },
  group: { type: String, required: true },
  foodType: { type: [String], required: true },
  frequency: { type: [frequencySchema], required: true },
});

reptileSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Reptile', reptileSchema);