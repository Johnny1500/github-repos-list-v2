import { gql } from "@apollo/client";

export const GET_SCHEMA = gql`
  query {
    __schema {
      types {
        name
        kind
        description
        fields {
          name
        }
      }
    }
  }
`;

export const GET_REPOSITORY_SCHEMA_FIED = gql`
  query {
    __type(name: "Repository") {
      name
      kind
      description
      fields {
        name
      }
    }
  }
`;

export const GET_OWN_REPOSITORIES = gql`
  query getOwnRepositories {
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
  query getRepositoriesByName {
    search(type: REPOSITORY, query: "micro", first: 100) {
      edges {
        node {
          ... on Repository {
            name
            url
            description
          }
        }
      }
    }
  }
`;
