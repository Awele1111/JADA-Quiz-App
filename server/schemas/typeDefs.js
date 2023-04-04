const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        favoriteQuizes: [Quiz]
    }

    type Choice {
        choice: String
        correct: Boolean
    }

    type Question {
        question: String
        choices: [Choice]
    }

    type Attempt {
        userId: User
        score: Int
    }

    type Quiz {
        _id: ID
        title: String
        creator: User
        public: Boolean
        style: String
        questions: [Question]
        highscores: [Attempt]
    }

    type Auth {
        token: ID!
        user: User
    }
  
    type Query {
        quizzes: [Quiz]
        users: [User]
        user(_id: ID!): User
        quiz(_id: ID!): Quiz
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createQuiz(title: String!, creator: String, public: Boolean, style: String, questions: [String]!): User
    }
`;

module.exports = typeDefs;
