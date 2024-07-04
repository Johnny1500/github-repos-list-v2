import { gql } from "@apollo/client";

export const GET_REPOSITORY_BY_ID = gql`
  query GetRepositoryByID($id: ID!) {
    node(id: $id) {
      ... on Repository {
        id
        name
        stargazerCount
        updatedAt
        description
        languages(first: 10) {
          nodes {
            name
          }
        }
        owner {
          avatarUrl
          login
          url
        }
      }
    }
  }
`;


