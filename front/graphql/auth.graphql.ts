import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: String!, $userInput: UserInput!) {
    updateUser(userId: $userId, userInput: $userInput) {
      _id
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getUsers {
    getUsers {
      _id
      firstName
      lastName
      email
      roles
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      firstName
      lastName
      email
      roles
    }
  }
`;
