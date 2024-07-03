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

export const GET_REPOSITORIES = gql`
  query AllRepositories {
    viewer {
      repositories(first: 100, isFork: false) {
        edges {
          node {
            id
            name
            url
            createdAt
            updatedAt
            stargazerCount
          }
        }
      }
    }
  }
`;
