import { gql } from "@apollo/client";

export const PLANT_FIELDS = gql`
  fragment PlantFields on PlantEntity {
    id
    attributes {
      name
      latinName
      visibility
      plantationDate
      favorite_users {
        data {
          id
          attributes {
            username
          }
        }
      }
      owner {
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

export const GET_ALL_PLANTS = gql`
  query GetAllPlants {
    plants(sort: ["name:asc"]) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

export const GET_MY_PLANTS = gql`
  query GetMyPlants($userId: ID) {
    plants(
      filters: {
        owner: { id: { eq: $userId } }
      }
      sort: ["name:asc"]
    ) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

export const GET_MY_FAVORITE_PLANTS = gql`
  query GetMyFavoritesPlants($userId: ID) {
    plants(
      filters: {
        favorite_users: { id: { eq: $userId } }
      }
      sort: ["name:asc"]
    ) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

/* export const GET_ALL_PLANTS = gql`
  query GetAllPlants($userId: ID) {
    plants(
      filters: {
        or: [
          { owner: { id: { eq: $userId } } },
          { visibility: { eq: "public" } }
        ]
      }
      sort: ["name:asc"]
    ) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;
 */
/* export const GET_PLANTS_BY_FILTER = gql`
  query GetPlantsByFilter($userId: ID, $ownerOnly: Boolean!) {
    plants(
      filters: {
        or: [
          { owner: { id: { eq: $userId } } },
          { and: [
            { visibility: { eq: "public" } },
            { owner: { id: { ne: $userId } } },
            { or: [{ owner: { id: { eq: null } } }, { ownerOnly: { eq: false } }] }
          ] }
        ]
      }
      sort: ["name:asc"]
    ) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`; */

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

export const DELETE_PLANT = gql`
  mutation deletePlant($id: ID!) {
    deletePlant(id: $id) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($id: ID!, $input: PlantInput!) {
    updatePlant(
      id: $id
      data: $input
    ) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($id: ID!, $input: PlantInput!) {
    updatePlant(
      id: $id
      data: $input
    ) {
      data {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;


