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
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    group: { type: String, required: true },
    foodType: { type: [String], required: true },
    frequency: { type: [frequencySchema], required: true },
  });

const petSchema = mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    reptile: { type: reptileSchema, required: true },
    birthday: { type: Date, required: false },
    shade: { type: [Date], required: false },
    calciumFreq: { type: Number, required: false },
    vitaminFreq: { type: Number, required: false }
  });

module.exports = mongoose.model('Pet', petSchema);