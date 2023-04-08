const { Schema, model } = require('mongoose');

const questionSchema = require('./Question');
const quizAttemptSchema = require('./QuizAttempt');

const QuizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    public: {
      type: Boolean,
      default: true,
    },
    style: {
        type: String,
        default: 'default',
    },
    questions: [questionSchema],
    highscores: [quizAttemptSchema],
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      default: 'General'
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

QuizSchema.virtual('questionCount').get(function () {
    return this.questions.length;
});

QuizSchema.virtual('getScoreboard').get(function () {
    const data = [...this.highscores];
    data.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      } else if ( a.time > b.time ) {
        return 1;
      } else {
        return -1;
      }
    });
    return data;
});

const Quiz = model('Quiz', QuizSchema);

module.exports = Quiz;
