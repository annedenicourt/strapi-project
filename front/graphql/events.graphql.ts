import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query {
    events {
      data {
        id
        attributes {
          name
          date
          time
          duration
          description
          address
          limit
          participants {
            firstName
            lastName
          }
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
