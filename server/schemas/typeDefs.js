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
        username: String
        score: Int
        time: Float
        dateAdded: String
    }

    input AttemptInput {
        username: String
        score: Int
        time: Float
        dateAdded: String
    }

    type Category {
        _id: String
        count: Int
    }

    type Quiz {
        _id: ID
        title: String
        creator: User
        public: Boolean
        style: String
        questions: [Question]
        highscores: [Attempt]
        description: String
        category: String
        getScoreboard: [Attempt]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Donation {
        session: ID
    }

    type QuizAttemptRespose {
        message: String
    }
  
    type Query {
        myQuizzes(creator: ID!): [Quiz]
        quizCategory(category: String!): [Quiz]
        users: [User]
        user(_id: ID!): User
        quiz(_id: ID!): Quiz
        me: User
        highScores(_id: ID!): Quiz
        countByCategory: [Category]!
        donate(donationAmount: Int!): Donation
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
            description: String, 
            category: String, 
            highscores: [AttemptInput]
            ): Quiz

        addAttempt(score: Int, time: Float, quizId: ID!): QuizAttemptRespose
        
        updateQuiz(
            quizId: ID!
            title: String!, 
            creator: String, 
            public: Boolean, 
            style: String, 
            questions: [QuestionInput]!, 
            description: String, 
            category: String, 
            highscores: [AttemptInput]
            ): Quiz
            
        addFavorite(quizId: ID!): User
        deleteQuiz(quizId: ID!): [Quiz]!
        removeFavorite(quizId: ID!): User
    }
`;

module.exports = typeDefs;
