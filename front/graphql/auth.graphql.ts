import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query {
    events {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
