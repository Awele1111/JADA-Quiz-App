import { gql } from '@apollo/client';

export const CREATE_QUIZ = gql`
mutation createQuiz($title: String!, $questions: [QuestionInput]!, $creator: String, $public: Boolean, $style: String, $description: String, $category: String) {
    createQuiz(title: $title, questions: $questions, creator: $creator, public: $public, style: $style, description: $description, category: $category) {
      _id
      category
      creator {
        _id
        username
      }
      description
      public
      questions {
        question
        choices {
          choice
          correct
        }
      }
      style
      title
    }
  }
  `;


export const UPDATE_QUIZ = gql`
mutation updateQuiz($title: String!, $questions: [QuestionInput]!, $creator: String, $public: Boolean, $style: String, $description: String, $category: String) {
    updateQuiz(title: $title, questions: $questions, creator: $creator, public: $public, style: $style, description: $description, category: $category) {
      _id
      category
      creator {
        _id
        username
      }
      description
      public
      questions {
        question
        choices {
          choice
          correct
        }
      }
      style
      title
    }
  }
  `;

export const DELETE_QUIZ = gql`
mutation deleteQuiz($quizId: ID!) {
    deleteQuiz(quizId: $quizId) {
      title
      _id
    }
  }
  `;

export const ADD_ATTEMPT = gql`
mutation addAttempt($quizId: ID!, $score: Int, $time: Float) {
    addAttempt(quizId: $quizId, score: $score, time: $time) {
      _id
      highscores {
        score
        time
        username
      }
    }
  }
  `;
  
export const ADD_FAVORITE = gql`
mutation addFavorite($quizId: ID!) {
    addFavorite(quizId: $quizId) {
      _id
      username
      favoriteQuizzes {
        _id
      }
    }
  }
  `; 

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
        _id
      }
    }
  }
  `;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        favoriteQuizzes {
            _id
          }
      }
    }
  }
  `;

export const REMOVE_FAVORITE = gql`
mutation removeFavorite($quizId: ID!) {
    removeFavorite(quizId: $quizId) {
      username
    }
  }
  `;