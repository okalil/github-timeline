<template>
  <div class="container">
    <span v-for="n in [0, 1, 2]" :key="n" class="dot" />
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style lang="postcss" scoped>
.container {
  @apply flex justify-center items-center space-x-2 p-5;
  height: 200px;
}
.dot {
  --p: 0.75;

  @apply bg-green-400 p-2 w-4 h-4 rounded-full animate-bounce;
  animation: wave calc(1.3s * var(--p)) infinite;
  animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);

  &:nth-child(2) {
    animation-delay: calc(-1.1s * var(--p));
  }
  &:nth-child(3) {
    animation-delay: calc(-0.9s * var(--p));
  }
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }
  30% {
    transform: translateY(-15px);
  }
}
</style>
