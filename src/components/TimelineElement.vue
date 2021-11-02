<template>
  <div class="element-container">
    <span class="icon intersection">
      <img src="@/assets/github.svg" alt="Github" />
    </span>
    <section class="card intersection">
      <span class="arrow"></span>
      <span class="mask"></span>
      <h2 class="font-semibold text-xl" style="color: #C7CFD1">
        {{ repo.name }}
      </h2>
      <div v-if="repo.repositoryTopics">
        <span
          v-for="node in repo.repositoryTopics.nodes"
          :key="node.id"
          class="border border-blue-300 border-solid rounded p-1 mr-1"
        >
          {{ node.topic.name }}
        </span>
      </div>
      <div>{{ repo.description }}</div>
      <div class="flex justify-center gap-4">
        <span class="flex items-center" :v-if="repo.id">
          <span
            class="w-2 h-2 rounded-full mr-1"
            :style="`background: ${topLanguage.color}`"
          />
          {{ topLanguage.name }}
        </span>
        <span v-if="repo.stargazerCount">sg: {{ repo.stargazerCount }}</span>
        <span>Atualizado {{ elapsedTimeSinceUpdated }}</span>
      </div>
      <a
        class="text-blue-500 hover:underline"
        :href="'https://github.com' + repo.resourcePath"
        target="_blank"
      >
        Acessar repositório
      </a>
    </section>
    <p class="date">{{ createdAt }}</p>
  </div>
</template>

<script>
const observer = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      if (
        !entry.target.className.includes('in-viewport') &&
        entry.isIntersecting
      )
        entry.target.classList.add('in-viewport');
    }),
  {
    // root: null,
    // rootMargin: '0px',
    threshold: 0.25,
  }
);

import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import pt from 'date-fns/locale/pt-BR';

export default {
  name: 'TimelineElement',
  props: {
    repo: Object,
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
  --date-position-x: calc(50% + var(--icon-size) / 2);
  --card-bg: #161b22;

  &:nth-child(2n + 1) {
    .card {
      @apply mr-auto;
    }
    .arrow {
      right: -5px;
    }
    .mask {
      right: 0;
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

.intersection {
  visibility: hidden;
}
.in-viewport {
  visibility: visible;
}

.icon {
  @apply absolute top-0 rounded-full bg-gray-700;

  left: calc(50% - var(--icon-size) / 2);
  width: var(--icon-size);
  height: var(--icon-size);
  box-shadow: inset 0 0 3px 3px var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: calc(var(--icon-size) * 2 / 3);
  }

  &.in-viewport {
    @apply animate-spring;
  }
}

.card {
  @apply p-3 rounded text-white text-center relative flex flex-col items-center justify-center gap-2;
  width: 44%;

  background: var(--card-bg);
  color: #848484;
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
  }

  .mask {
    @apply absolute;

    --mask-size: calc(var(--arrow-size) + 6px);

    background: var(--card-bg);
    height: var(--mask-size);
    width: var(--mask-size);
    top: calc(var(--icon-size) / 2 - var(--arrow-size) / 2 - 3px);
  }
}

.date {
  @apply absolute top-0 flex items-center;
  height: var(--icon-size);
}
</style>
