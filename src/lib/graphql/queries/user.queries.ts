import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      email
      firstName
      lastName
      role {
        code
        name
      }
      status
      createdAt
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query GetUserDetail($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      role {
        code
        name
      }
      status
      profile {
        level
        element
      }
      createdAt
      updatedAt
    }
  }
`;
