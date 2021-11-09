<template>
  <div>
    <div v-if="!username" class="title">
      Veja a timeline dos seus repositórios
    </div>
    <SearchControl />
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else-if="user">
      <div class="timeline">
        <TimelineElement
          v-for="repo in user.repositories.nodes"
          :key="repo.id"
          :repo="repo"
        />
      </div>
      <button
        v-if="user.repositories.totalCount > user.repositories.nodes.length"
        type="button"
        class="more"
        @click="showMore"
      >
        {{ loadingMore ? 'Carregando...' : 'Mostrar mais repositórios' }}
      </button>
    </div>
  </div>
</template>

<script>
import store, { mutations } from '../store';
import GET_REPOSITORIES from '../graphql/GetRepositories';

import TimelineElement from '../components/TimelineElement.vue';
import SearchControl from '../components/SearchControl.vue';
import Loader from '../components/Loader.vue';

const { loading, user, username } = store;

export default {
  name: 'Home',
  components: { TimelineElement, SearchControl, Loader },
  data() {
    return {
      loadingMore: false,
    };
  },
  computed: {
    loading,
    user,
    username,
  },
  methods: {
    showMore() {
      this.loadingMore = true;
      this.$apollo
        .query({
          query: GET_REPOSITORIES,
          variables: {
            login: this.username,
            after: this.user.repositories.pageInfo.endCursor,
          },
        })
        .then(r => {
          const { repositories } = r.data.user;
          mutations.setUser({
            ...this.user,
            repositories: {
              ...repositories,
              nodes: [...this.user.repositories.nodes, ...repositories.nodes],
            },
          });
        })
        .catch(err => console.log('err', err))
        .finally(() => (this.loadingMore = false));
    },
  },
};
</script>

<style lang="postcss" scoped>
.title {
  @apply px-4 mt-16 mb-4 mx-auto w-full max-w-xl;
  @apply font-bold text-3xl text-mine-shaft-100 text-left;
}
.timeline {
  @apply h-full relative mx-auto;
  width: min(89%, 1024px);
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  width: 5px;
  background: theme('colors.mine-shaft.500');

  @apply left-0 md:left-1/2;
}

.more {
  @apply bg-mine-shaft-700 border border-mine-shaft-400 text-blue-500 font-medium;
  @apply p-2 rounded my-2 mx-auto block w-full;
  @apply hover:bg-mine-shaft-600;
  width: min(89%, 1024px);
}
</style>
