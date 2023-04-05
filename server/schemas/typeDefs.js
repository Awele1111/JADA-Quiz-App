const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        favoriteQuizzes: [Quiz]
    }

    type Choice {
        choice: String
        correct: Boolean
    }

    input ChoiceInput {
        choice: String
        correct: Boolean
    }

    type Question {
        question: String
        choices: [Choice]
    }

    input QuestionInput {
        question: String
        choices: [ChoiceInput]
    }

    type Attempt {
        userId: User
        score: Int
    }

    input AttemptInput {
        userId: ID
        score: Int
    }

    type Quiz {
        _id: ID
        title: String
        creator: String
        public: Boolean
        style: String
        questions: [Question]
        highscores: [Attempt]
        description: String
        category: String
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
        
        createQuiz(
            title: String!, 
            creator: String, 
            public: Boolean, 
            style: String, 
            questions: [QuestionInput]!, 
            discription: String, 
            category: String, 
            highscores: [AttemptInput]
            ): Quiz

        addAttempt(userId: ID!, score: Int, quizId: ID!): Quiz
        addFavorite(quizId: ID!, userId: ID!): User
        deleteQuiz(quizId: ID!): Quiz
        removeFavorite(quizId: ID!, userId: ID!): User
    }
`;

module.exports = typeDefs;
