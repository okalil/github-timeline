<template>
  <Draggable :initial="{ right: '12px', top: '88%' }">
    <div class="float">
      <span
        class="github"
        @mousedown="setShowLink(false)"
        @mouseup="setShowLink(true)"
        title="Arraste"
      >
        <Github />
      </span>
      <span class="link" v-if="showLink">
        <a href="https://github.com/okalil/github-timeline" target="_blank">
          Star on Github
        </a>
      </span>
    </div>
  </Draggable>
</template>

<script>
import Github from 'vue-material-design-icons/Github.vue';
import Draggable from '../components/Draggable.vue';

export default {
  name: 'GithubLink',
  components: { Github, Draggable },
  data() {
    return { showLink: true };
  },
  methods: {
    setShowLink(boolean) {
      this.showLink = boolean;
    },
  },
};
</script>

<style lang="postcss" scoped>
.float {
  @apply inline-flex items-center justify-end relative;

  --icon-size: 3rem;

  &:hover .link {
    display: block;
    background: theme('colors.mine-shaft.500');
    box-shadow: 0 0 2px 2px theme('colors.mine-shaft.400');
    border-top-left-radius: 1700px;
    border-bottom-left-radius: 1700px;

    &:hover {
      opacity: 0.85;
    }
  }

  &:focus .link {
    display: none;
  }

  .link {
    @apply hidden absolute rounded-r-full;

    --link-width: 4rem;
    animation: slide-in 0.6s;
    height: var(--icon-size);
    right: 0.3rem;

    a {
      @apply flex items-center mr-auto;
      height: inherit;
      width: var(--link-width);
      margin-left: 0.125rem;
      margin-right: var(--icon-size);
      font-size: 0.975rem;
    }
  }

  .github {
    @apply rounded-full bg-mine-shaft-500 cursor-pointer;
    @apply border-2 border-mine-shaft-400 z-50;

    svg {
      @apply text-mine-shaft-50;
      width: var(--icon-size);
      height: var(--icon-size);
      cursor: inherit;
    }
  }
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(var(--icon-size));
    background: none;
    box-shadow: none;
  }

  60% {
    opacity: 1;
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
