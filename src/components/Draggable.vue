<template>
  <div
    @mousedown.prevent="handleMouseDown"
    class="fixed z-50"
    ref="draggable"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Draggable',
  props: {
    initial: {
      default: { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' },
    },
  },
  computed: {
    style() {
      const { top, right, bottom, left } = this.initial;
      return `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`;
    },
  },
  data() {
    return {
      clientX: 0,
      clientY: 0,
      position: this.initial,
    };
  },
  methods: {
    handleMouseDown(e) {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      document.onmouseup = this.stopMove;
      document.onmousemove = this.handleMouseMove;
    },
    handleMouseMove(e) {
      e.preventDefault();
      const { clientX, clientY } = e;
      const newPositionX = this.clientX - clientX;
      const newPositionY = this.clientY - clientY;
      this.clientX = clientX;
      this.clientY = clientY;

      const element = this.$refs.draggable;

      if (element) {
        const top = element.offsetTop - newPositionY;
        const left = element.offsetLeft - newPositionX;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        element.style.cursor = 'grabbing';
        this.top = top;
        this.left = left;
      }
    },
    stopMove() {
      this.$refs.draggable.style.cursor = 'auto';
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>
