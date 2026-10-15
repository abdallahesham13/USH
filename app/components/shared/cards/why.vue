<template>
  <div
    class="group why-card rounded-2xl p-6 bg-primary-light hover:bg-primary transition-all duration-300"
  >
    <h3
      class="lg:text-xl text-lg font-bold text-secondary group-hover:text-light transition-all duration-300 flex items-center gap-2"
    >
      <span
        class="why-icon text-primary group-hover:text-light transition-all duration-300"
      >
        {{ formatIndex(index) }}
      </span>
      {{ item.title }}
    </h3>
    <p class="text-gray group-hover:text-light lg:text-base text-sm transition-all duration-300">
      {{ item.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: any;
  index: number;
}>();
const formatIndex = (index: number) => {
  return String(index + 1).padStart(2, "0");
};
</script>
<style>
.why-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  position: relative;
  isolation: isolate;
}
.why-card .why-icon {
  font-size: 40px;
  font-family: "The Year of Handicrafts", sans-serif;
}
.why-card:before {
  content: "";
  position: absolute;
  left: -1rem;
  top: 3rem;
  background: url("/imgs/logo/big-logo-light.svg") no-repeat center center /
    100% 100%;
  z-index: -1;
  isolation: auto;
  width: 135px;
  height: 155px;
  margin-inline: auto;
  animation: animation_left_and_right 12s ease 0s infinite normal none;
  opacity: 0;
}
.why-card:hover:before {
  opacity: 1;
}
</style>
