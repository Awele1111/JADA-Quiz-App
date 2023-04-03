const { Schema } = require('mongoose');

const choiceSchema = require('./Choice');

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  choices: [choiceSchema]
});

module.exports = questionSchema;