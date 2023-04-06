import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      favoriteQuizes {
        _id
      }
    }
  }
  `;

  export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
    }
  }
  `;

  export const QUERY_QUIZZES = gql`
  query myQuizzes {
    quizzes {
      _id
      title
      category
      creator {
        username
        _id
      }
    }
  }
  `;

  export const QUERY_QUIZ = gql`
  query quiz($id: ID!) {
    quiz(_id: $id) {
      title
      public
      style
      category
      description
      creator {
        username
      }
      questions {
        question
        choices {
          choice
          correct
        }
      }
      highscores {
        score
        userId {
          _id
        }
      }
    }
  }
  `;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    favoriteQuizzes {
      _id
      title
      description
      creator {
        username
      }
    }
  }
}
`;
  