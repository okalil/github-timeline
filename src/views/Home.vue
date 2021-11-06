<template>
  <div>
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

const { loading, user } = store;

export default {
  name: 'Home',
  components: { TimelineElement, SearchControl, Loader },
  computed: {
    loading,
    user,
  },
};
</script>

<style lang="postcss" scoped>
.timeline {
  @apply h-full max-w-5xl w-11/12 relative mx-auto;
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
