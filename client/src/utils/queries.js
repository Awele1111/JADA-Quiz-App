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
  }`;

  export const QUERY_QUIZZES = gql`
  query quizzes {
    quizzes {
      _id
      title
      category
      creator
    }
  }
  `

  