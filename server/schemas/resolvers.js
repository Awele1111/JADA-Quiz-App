const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz } = require('../models')
const { signToken } = require('../utils/auth');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SK);

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { _id }) => {
      return User.findOne({ _id }).populate('favoriteQuizzes').populate('creator');;
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: "favoriteQuizzes",
          populate: "creator"
        })
      }
      throw new AuthenticationError("You need to be logged in");
    },

    myQuizzes: async (parent, { creator }) => {
      return Quiz.find({ creator });
    },

    quizCategory: async (parent, { category }) => {
      return Quiz.find({ category, public: true }).populate('creator');
    },

    quiz: async (parent, { _id }) => {
      return Quiz.findById({ _id }).populate('creator');
    },

    highScores: async (parent, { _id }) => { 
      return Quiz.findById({ _id });
    },

    countByCategory: async (parent, args) => {
      let myCategories = await Quiz.aggregate(
        [
          {
            $match: {
              public: true
            }
          },
          {
            $group : {
              _id: "$category", 
              count: {$sum:1}
            }
          }
        ],
      );
      return myCategories;
    },

    donate: async (parent, { donationAmount }, context) => {
      
      const url = new URL(context.headers.referer).origin;

      const product = await stripe.products.create({
        name: 'Donation',
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: donationAmount,
        currency: 'usd',
      });

      line_items = [{ 
        price: price.id,
        quantity: 1
      }]

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
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

    createQuiz: async (parent, { title, public, style, questions, description, category }, context) => {
      if (context.user) {
        const quiz = await Quiz.create({
          title,
          public,
          style,
          questions,
          description,
          category,
          creator: context.user._id
        });
        return quiz;
      }
    },

    updateQuiz: async (parent, { quizId, title, public, style, questions, description, category }, context) => {
      if (context.user) {
        const quiz = await Quiz.findOneAndUpdate({_id: quizId},{
          title,
          public,
          style,
          questions,
          description,
          category,
          creator: context.user._id
        });
        return quiz;
      }
    },

    addAttempt: async (parent, { quizId, score, time }, context) => {
      if (context.user) {
        return Quiz.findOneAndUpdate(
          { _id: quizId },
          {
            $addToSet: {
              highscores: { score, time, username: context.user.username },
            }
          }
        );
      }
      throw new AuthenticationError('You need to be logged in')
    },

    deleteQuiz: async (parent, { quizId }, context) => {
      if (context.user) {
        await Quiz.findOneAndDelete({
          _id: quizId,
          creator: context.user._id
        });
        const quizzes = Quiz.find({ creator: context.user._id });
        return quizzes;
      }
      throw new AuthenticationError('You need to be logged in');
    },

    addFavorite: async (parent, { quizId }, context
    ) => {
      if (context.user) {
        const favorite = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              favoriteQuizzes: { _id: quizId }
            },
          }
        );
        return favorite;
      } throw new AuthenticationError('You need to be logged in');
    },

    removeFavorite: async (parent, { quizId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              favoriteQuizzes: quizId
            },
          },
          { new: true }
        ).populate({
          path: "favoriteQuizzes",
          populate: "creator"
        });
      } throw new AuthenticationError('You need to be logged in');
    }
  },
};

module.exports = resolvers;