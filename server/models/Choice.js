const { Schema } = require('mongoose');

const choiceSchema = new Schema({
  choice: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    required: true,
  },
});

module.exports = choiceSchema;