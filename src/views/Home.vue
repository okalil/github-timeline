<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        placeholder="Insira o nome de usuário Github"
        v-model="username"
      />
      <button type="submit">Gerar Timeline</button>
    </form>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="user">
      <Timeline :repositories="user.repositories.nodes" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Timeline from '../components/Timeline.vue';

export default {
  name: 'Home',
  components: { Timeline },
  data() {
    return { user: null, username: '', loading: false };
  },
  methods: {
    onSubmit() {
      this.user = null;
      this.loading = true;
      this.queryRepositories(this.username.trim())
        .then(r => {
          this.user = r.data.user;
        })
        .catch(error => console.log('Error', error))
        .finally(() => {
          this.loading = false;
        });
    },
    queryRepositories(login) {
      return this.$apollo.query({
        query: GET_REPOSITORIES,
        variables: {
          login,
        },
      });
    },
  },
};

const GET_REPOSITORIES = gql`
  query getRepositories($login: String!) {
    user(login: $login) {
      id
      name
      repositories(
        first: 10
        privacy: PUBLIC
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
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
</script>
