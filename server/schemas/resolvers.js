const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz } = require('../models')
const { signToken } = require('../utils/auth');

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
      throw new AuthenticationError("you need to be logged in");
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
   }
  }
};

module.exports = resolvers;