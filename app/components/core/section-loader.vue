<template>
  <!-- START:: LOADING SECTION -->
  <div class="section-loader-container flex items-center justify-center h-[300px]" :class="{ 'loader-full-screen': fullScreen }" v-if="loading">
    <div class="section-loader"></div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  loading: boolean;
  fullScreen?: boolean;
}>();
</script>
<style scoped>
.loader-full-screen {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background-color: var(--color-light);
  z-index: 9999;
}
.section-loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
}
.section-loader::before,
.section-loader::after {
  content: "";
  grid-area: 1/1;
  --c: no-repeat radial-gradient(farthest-side, var(--color-primary) 92%, #0000);
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 12px 12px;
  animation: l12 1s infinite;
}
.section-loader::before {
  margin: 4px;
  filter: var(--secondary-filter);
  background-size: 8px 8px;
  animation-timing-function: linear;
}

@keyframes l12 {
  100% {
    transform: rotate(0.5turn);
  }
}
</style>
