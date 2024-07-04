import { gql } from "@apollo/client";

export const GET_OWN_REPOSITORIES = gql`
  query GetOwnRepositories {
    viewer {
      repositories(first: 100, isFork: false) {
        edges {
          node {
            id
            name
            url
            updatedAt
            stargazerCount
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES_BY_NAME = gql`
  query GetRepositoriesByName($queryString: String!) {
    search(type: REPOSITORY, query: $queryString, first: 100) {
      edges {
        node {
          ... on Repository {
            id
            name
            url
            updatedAt
            stargazerCount
          }
        }
      }
    }
  }
`;
