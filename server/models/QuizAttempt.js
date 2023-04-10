const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
  },
  dateAdded: {
    type: Date, 
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  
});

module.exports = quizAttemptSchema;