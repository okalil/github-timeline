<template>
  <div class="element-container">
    <span class="icon intersection">
      <Github />
    </span>
    <section class="card intersection">
      <span class="arrow"></span>
      <!-- <span class="mask"></span> -->
      <h2 class="font-semibold text-xl" style="color: #C7CFD1">
        {{ repo.name }}
      </h2>
      <div v-if="repo.repositoryTopics">
        <span
          v-for="node in repo.repositoryTopics.nodes"
          :key="node.id"
          class="topic"
        >
          {{ node.topic.name }}
        </span>
      </div>
      <div>{{ repo.description }}</div>
      <div class="flex justify-center flex-wrap gap-x-4">
        <span class="flex items-center" :v-if="repo.id">
          <span
            class="w-2 h-2 rounded-full mr-1"
            :style="`background: ${topLanguage.color}`"
          />
          {{ topLanguage.name }}
        </span>
        <span v-if="repo.stargazerCount" class="flex items-center gap-1">
          <Star />{{ repo.stargazerCount }}
        </span>
        <span>Atualizado {{ elapsedTimeSinceUpdated }}</span>
      </div>
      <div class="flex gap-4">
        <p class="date">{{ createdAt }}</p>
        <a
          class="text-blue-500 hover:underline"
          :href="'https://github.com' + repo.resourcePath"
          target="_blank"
        >
          Acessar repositório
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import pt from 'date-fns/locale/pt-BR';
import Github from 'vue-material-design-icons/Github.vue';
import Star from 'vue-material-design-icons/StarOutline.vue';

const observer = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      if (
        !entry.target.className.includes('in-viewport') &&
        entry.isIntersecting
      )
        entry.target.classList.add('in-viewport');
    }),
  { threshold: 0.25 }
);

export default {
  name: 'TimelineElement',
  props: ['repo'],
  components: {
    Github,
    Star,
  },
  mounted() {
    const elements = document.querySelectorAll('.intersection');
    elements.forEach(el => observer.observe(el));
  },
  computed: {
    createdAt() {
      const date = new Date(this.repo.createdAt);
      return format(date, 'dd/MM/yyyy', { locale: pt });
    },
    elapsedTimeSinceUpdated() {
      const date = new Date(this.repo.updatedAt);

      if (Date.now() - date > 3600000 * 24 * 30)
        return `em ${format(date, 'd MMM', { locale: pt })}`;

      return `há ${formatDistanceToNowStrict(date, {
        locale: pt,
      })}`;
    },
    topLanguage() {
      const lang = this.repo.languages.nodes[0];

      if (!lang) {
        return { color: '', name: '' };
      }

      const { color, name } = lang;

      return { color, name };
    },
  },
};
</script>

<style lang="postcss" scoped>
.element-container {
  @apply mb-4 relative;

  --icon-size: 3rem;
  --arrow-size: 1rem;
  --date-position-x: 120%;
  --card-bg: theme('colors.mine-shaft.500');
}

.intersection {
  visibility: hidden;
}
.in-viewport {
  visibility: visible;
}

.icon {
  @apply absolute top-0 rounded-full bg-mine-shaft-100;
  @apply flex items-center justify-center;

  width: var(--icon-size);
  height: var(--icon-size);
  border: 5px solid var(--card-bg);
  right: calc(100% - var(--icon-size) / 2);

  svg {
    width: calc(var(--icon-size) * 3 / 4);
    height: calc(var(--icon-size) * 3 / 4);
    color: theme('colors.mine-shaft.800');
  }

  &.in-viewport {
    @apply animate-spring;
  }
}

.card {
  @apply py-3 px-0 rounded text-white relative flex flex-col justify-center gap-2;
  @apply ml-auto items-center;
  width: 90%;
  background: var(--card-bg);
  color: theme('colors.mine-shaft.300');
  border: 1px solid #2b3138;

  &.in-viewport {
    @apply animate-slide;
  }

  .arrow {
    @apply absolute transform -rotate-45;

    border: 1px solid #2b3138;
    background: var(--card-bg);
    height: var(--arrow-size);
    width: var(--arrow-size);
    top: calc(var(--icon-size) / 2 - var(--arrow-size) / 2);
    left: -5px;
  }

  .mask {
    @apply absolute;

    --mask-size: calc(var(--arrow-size) + 6px);

    background: var(--card-bg);
    height: var(--mask-size);
    width: var(--mask-size);
    top: calc(var(--icon-size) / 2 - var(--arrow-size) / 2 - 3px);
    left: 0;
  }
}

.topic {
  @apply rounded-2xl py-1 px-2 mr-1 font-medium text-blue-400 bg-blue-900;
}

@media screen(md) {
  .element-container {
    &:nth-child(2n + 1) {
      .card {
        @apply mr-auto ml-0;
        .arrow {
          right: -5px;
          left: auto;
        }
      }
      .date {
        left: var(--date-position-x);
        margin-left: 1rem;
      }
    }
    &:nth-child(2n) {
      .card {
        @apply ml-auto;
      }
      .arrow {
        left: -5px;
      }
      .mask {
        left: 0;
      }
      .date {
        right: var(--date-position-x);
        margin-right: 1rem;
      }
    }
  }
  .icon {
    left: calc(50% - var(--icon-size) / 2);
  }
  .card {
    @apply text-center;
    width: 44%;
  }
  .date {
    @apply absolute top-0 flex items-center;
    height: var(--icon-size);
  }
}
</style>
