const { Schema } = require('mongoose');

const quizAttemptSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
});

module.exports = quizAttemptSchema;