import { gql } from "@apollo/client";

export const PLANT_FIELDS = gql`
  fragment PlantFields on PlantEntity {
    id
    attributes {
      name
      latinName
      visibility
      plantationDate
      users_permissions_user {
        data {
          id
          attributes {
            username
            email
          }
        }
      }
      images {
        data {
          attributes {
            url
          }
        }
      }
    }
  }
`;

export const GET_PLANTS = gql`
  query {
    plants {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

export const GET_PLANTS_BY_FILTER = gql`
  query GetPlantsByFilter($visibility: String) {
    plants(filters: { visibility: { eq: $visibility } }) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

export const GET_PLANT = gql`
  query getPlant($id: ID) {
    plant(id: $id) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

export const CREATE_PLANT = gql`
  mutation createPlant($input: PlantInput!) {
    createPlant(data: $input) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

export const UPDATE_PLANT = gql`
  mutation updatePlant($id: ID!, $input: PlantInput!) {
    updatePlant(id: $id, data: $input) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;
