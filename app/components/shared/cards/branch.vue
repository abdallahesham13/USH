<template>
  <div
    class="about-card group hover:bg-primary relative w-full min-h-[265px] h-full bg-primary-light group-hover:shadow-md rounded-2xl overflow-hidden px-6 py-12 transition-all duration-500 flex flex-col gap-6 justify-center items-center"
  >
    <!-- <ClientOnly> -->
    <div
      class="about-icon h-18 w-18 overflow-hidden rounded-lg bg-light flex items-center justify-center duration-500 mx-auto"
    >
      <core-lazy-image
        src="/imgs/icons/location.svg"
        :alt="item?.name"
        :loading="false"
        class="!w-10 !h-10 object-cover rounded-none transition-all duration-0"
      />
    </div>
    <div class="text-center">
      <h3
        class="text-secondary group-hover:text-light transition-all duration-500 font-bold lg:text-2xl text-base mb-4"
      >
        {{ $t(item?.name) }}
      </h3>
      <p class="text-gray group-hover:text-light transition-all duration-500 lg:text-base text-sm">
        {{ $t(item?.address) }}
      </p>
    </div>
    <!-- </ClientOnly> -->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: any;
}>();
</script>
<style>
.about-card {
  position: relative;
  isolation: isolate;
}
.about-card:hover .about-icon img {
  filter: var(--primary-filter);
}
.about-card:before {
  content: "";
  position: absolute;
  left: -2rem;
  top: -4rem;
  background: url("/imgs/logo/big-logo-light.svg") no-repeat center center /
  100%;
  z-index: -1;
  isolation: auto;
  width: 170px;
  height: 240px;
  margin-inline: auto;
  animation: animation_left_and_right 12s ease 0s infinite normal none;
  opacity: 0;
}
.about-card:hover:before {
  opacity: 1;
}
</style>
