import gql from 'graphql-tag';

const GET_REPOSITORIES = gql`
  query getRepositories($login: String!, $after: String) {
    user(login: $login) {
      id
      name
      repositories(
        first: 10
        privacy: PUBLIC
        orderBy: { field: CREATED_AT, direction: DESC }
        after: $after
      ) {
        totalCount
        pageInfo {
          endCursor
        }
        nodes {
          id
          name
          createdAt
          updatedAt
          description
          resourcePath
          repositoryTopics(first: 5) {
            nodes {
              id
              topic {
                name
              }
            }
          }
          languages(first: 1, orderBy: { direction: DESC, field: SIZE }) {
            nodes {
              color
              name
            }
          }
          stargazerCount
        }
      }
    }
  }
`;

export default GET_REPOSITORIES;
