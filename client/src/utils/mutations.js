import { gql } from '@apollo/client';

export const CREATE_QUIZ = gql`
mutation createQuiz($title: String!, $questions: [QuestionInput]!, $creator: String, $public: Boolean, $style: String, $discription: String, $category: String) {
    createQuiz(title: $title, questions: $questions, creator: $creator, public: $public, style: $style, discription: $discription, category: $category) {
      _id
      category
      creator
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
mutation addAttempt($userId: ID!, $quizId: ID!, $score: Int) {
    addAttempt(userId: $userId, quizId: $quizId, score: $score) {
      _id
      highscores {
        score
        userId {
          _id
        }
      }
    }
  }
  `;
  
export const ADD_FAVORITE = gql`
mutation addFavorite($quizId: ID!, $userId: ID!) {
    addFavorite(quizId: $quizId, userId: $userId) {
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

// I need to add remove favorite once I get that working