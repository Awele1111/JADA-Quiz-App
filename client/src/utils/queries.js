import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      favoriteQuizes {
        _id
      }
    }
  }`;

  