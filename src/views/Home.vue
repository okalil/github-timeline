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
    </div>
  </div>
</template>

<script>
import store from '../store';
import TimelineElement from '../components/TimelineElement.vue';
import SearchControl from '../components/SearchControl.vue';
import Loader from '../components/Loader.vue';

const { loading, user, username } = store;

export default {
  name: 'Home',
  components: { TimelineElement, SearchControl, Loader },
  computed: {
    loading,
    user,
    username,
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
</style>
