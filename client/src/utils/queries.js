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
  query MyQuizzes($creator: ID!) {
    myQuizzes(creator: $creator) {
      _id
      title
      category
    }
  }
  `;

  export const QUIZ_CATEGORY = gql`
  query quizCategory($category: String!) {
    quizCategory(category: $category) {
      _id
      title
      creator {
        _id
        username
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
        username
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
  
export const HIGHSCORES = gql`
query HighScores($id: ID!) {
  highScores(_id: $id) {
    _id
    title
    getScoreboard {
      score
      time
      username
    }
  }
}
`;


export const COUNT_BY_CATEGORY = gql`
query CountByCategory {
  countByCategory {
    _id
    count
  }
}
`;