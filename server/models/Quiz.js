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
    discription: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      default: 'general'
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
    let arr = [...this.highscores]
    //function to sort score attempts
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
            if(arr[j + 1].score < arr[j].score){
                [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
            }
        }
    };
    return arr;
});

const Quiz = model('Quiz', QuizSchema);

module.exports = Quiz;
