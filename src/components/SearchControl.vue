<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        spellcheck="false"
        type="text"
        placeholder="Insira o nome de usuário Github"
        v-model="username"
      />
      <button type="submit">Gerar Timeline</button>
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag';
import store, { mutations } from '../store';

const { setLogin, setUser, setLoading } = mutations;

export default {
  name: 'SearchControl',
  data() {
    return { username: '' };
  },
  methods: {
    onSubmit() {
      setLoading(true);
      setLogin(this.username);
      setUser(null);

      this.queryRepositories(this.username.trim())
        .then(r => {
          setUser(r.data.user);
        })
        .catch(error => console.log('Error', error))
        .finally(() => {
          setLoading(false);
          console.log('store', store);
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

<style lang="postcss" scoped>
form {
  display: flex;

  div {
    @apply flex my-2 mx-auto rounded;
    width: 550px;

    &:focus-within {
      box-shadow: 0 0 1px 1px #41b883;
    }
  }

  input {
    @apply rounded-l px-2;
    background: #534f5f;
    color: white;

    flex: 2;

    &::placeholder {
      color: white;
    }

    &:focus-within {
      outline: 0;
    }
  }

  button {
    @apply rounded-r px-2 py-4;
    background: #41b883;
    color: white;
    flex: 1;
  }
}
</style>
