const { Schema } = require('mongoose');

const quizAttemptSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

module.exports = quizAttemptSchema;