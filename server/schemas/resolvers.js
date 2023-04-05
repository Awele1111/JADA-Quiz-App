const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz } = require('../models')
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongoose');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { _id }) => {
      return User.findOne({ _id });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in");
    },

    quizzes: async () => {
      return Quiz.find();
    },

    quiz: async (parent, { _id }) => {
      return Quiz.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password');
      }
      const token = signToken(user);
      return { token, user };
    },

    createQuiz: async (parent, { title, public, style, questions, description, categroy, creator }) => {

      const quiz = await Quiz.create({
        title,
        public,
        style,
        questions,
        description,
        categroy,
        creator
      });
      return quiz;
    },

    addAttempt: async (parent, { quizId, score, userId }, //context
    ) => {
      //if (context.user) {
      return Quiz.findOneAndUpdate(
        { _id: quizId },
        {
          $addToSet: {
            highscores: { score, userId },
          }
        }
      );
      //} throw new AuthenticationError('You need to be logged in')
    },

    deleteQuiz: async (parent, { quizId }, //context
    ) => {
      // if (context.user) {
      const quiz = await Quiz.findOneAndDelete({
        _id: quizId,
        // creator: context.user._id
      });
      return quiz;
      //}
      // throw new AuthenticationError('You need to be logged in');
    },

    addFavorite: async (parent, { quizId, userId }, //context
    ) => {
      // if (context.user) {
      const favorite = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            favoriteQuizzes: { _id: quizId }
          },
        }
      );
      return favorite;
      //} throw new AuthenticationError('You need to be logged in');
    },

    removeFavorite: async (parent, { quizId, userId }, //context
    ) => {
      //if (context.user) {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            favoriteQuizzes: quizId
          },
        },
        { new: true }
      );
      //} throw new AuthenticationError('You need to be logged in');
    }
  },
}
  ;

module.exports = resolvers;