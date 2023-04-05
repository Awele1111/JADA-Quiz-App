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
 
   createQuiz: async (parent, { title, public, style, questions, description, categroy }) => {
    
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
    }
   },

  //  addAttempt: {

  //  },

  //  deleteQuiz: {

  //  },

  //  addFavorite: {

  //  },

  //  removeFavorite: {

  //  }
  }
;

module.exports = resolvers;