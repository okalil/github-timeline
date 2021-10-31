<template>
  <div class="timeline">
    <TimelineElement v-for="repo in repositories" :key="repo.id" :repo="repo" />
  </div>
</template>

<script>
import TimelineElement from './TimelineElement.vue';
export default {
  components: { TimelineElement },
  name: 'Timeline',
  props: {
    repositories: Array,
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
  left: 50%;
  height: 100%;
  width: 4px;
  background: #161b22;
}
</style>
