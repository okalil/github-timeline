<template>
  <div class="container">
    <span class="icon intersection">
      <Github />
    </span>
    <section class="card intersection">
      <span class="arrow"></span>
      <h2 class="font-semibold text-xl" style="color: #C7CFD1">
        {{ repo.name }}
      </h2>
      <div
        v-if="repo.repositoryTopics.nodes.length"
        class="flex flex-wrap justify-center gap-x-1 gap-y-1"
      >
        <span
          v-for="node in repo.repositoryTopics.nodes"
          :key="node.id"
          class="topic"
        >
          {{ node.topic.name }}
        </span>
      </div>
      <div v-if="repo.description">{{ repo.description }}</div>
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
        <span>Atualizado {{ updatedAt }}</span>
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
import format from 'date-fns/format/index';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import getYear from 'date-fns/fp/getYear/index';
import getMonth from 'date-fns/fp/getMonth/index';
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
    updatedAt() {
      const date = new Date(this.repo.updatedAt);
      const now = Date.now();

      if (getYear(date) !== getYear(now))
        return `em ${format(date, 'd MMM yyyy', { locale: pt })}`;

      if (getMonth(date) !== getMonth(now))
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

<style src="./styles.css" scoped></style>
