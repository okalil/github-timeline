<template>
  <form @submit.prevent="onSubmit">
    <div :class="!error ? 'focused' : ''">
      <input
        spellcheck="false"
        type="text"
        placeholder="Insira o nome de usuário Github"
        v-model="username"
        :class="!!error ? 'border border-red-500' : ''"
      />
      <button type="submit">Gerar Timeline</button>
      <span v-if="!!error" class="warning text-red-500"
        >O nome de usuário não é válido.</span
      >
      <span v-if="empty" class="warning"
        >O usuário inserido ainda não possui repositórios públicos.</span
      >
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag';
import { mutations } from '../store';

const { setLogin, setUser, setLoading } = mutations;

export default {
  name: 'SearchControl',
  data() {
    return { username: '', error: null, empty: false };
  },
  methods: {
    onSubmit() {
      this.reset();
      setLogin(this.username);
      this.queryRepositories(this.username.trim())
        .then(r => {
          setUser(r.data.user);
          if (!r.data.user.repositories.nodes.length) {
            this.empty = true;
          }
        })
        .catch(error => (this.error = error))
        .finally(() => {
          setLoading(false);
        });
    },
    reset() {
      setLoading(true);
      setUser(null);
      this.error = null;
      this.empty = false;
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
  @apply flex p-4;
  --button-bg: theme('colors.green.400');

  div {
    @apply flex mx-auto rounded relative;
    width: min(550px, 100%);

    &.focused:focus-within {
      box-shadow: 0 0 1px 1px var(--button-bg);
    }
  }

  input {
    @apply rounded sm:rounded-r-none bg-mine-shaft-500 text-white;
    @apply px-2 py-2;
    flex: 2;

    &::placeholder {
      color: theme('colors.mine-shaft.300');
    }

    &:focus-within {
      outline: 0;
    }
  }

  button {
    @apply font-medium rounded-r px-2 py-4 hidden sm:block;
    background: var(--button-bg);
    color: theme('colors.mine-shaft.600');
    flex: 1;
  }

  .warning {
    @apply absolute opacity-90;
    top: calc(100% + 16px);
  }

  .shadow-red {
    box-shadow: 0 0 1px 1px theme('colors.red.500');
  }
  .shadow-green {
    box-shadow: 0 0 1px 1px var(--button-bg);
  }
}
</style>
