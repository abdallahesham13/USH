<template>
  <div
    class="gallery-card cursor-zoom-in group lg:h-[500px] h-[300px] rounded-2xl flex flex-col justify-center items-center gap-4 transition-all duration-500  relative overflow-hidden"
  >
    <div class="before-effect"></div>
    <div class="gallery-card-image w-full h-full">
      <core-lazy-image
        :src="item.image"
        :alt="item.name"
        :loading="false"
        class="!w-full !h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: any;
}>();
</script>
<style>
.gallery-card {
  isolation: isolate;
}

.gallery-card::after {
  content: "";
  position: absolute;
  bottom: 0rem;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(26, 18, 2, 0.48) 100%
  );

  isolation: auto;
  z-index: 1;
}

.gallery-card .before-effect {
  position: absolute;
  top: 0;
  left: -85%;
  z-index: 2;
  display: block;
  width: 50%;
  height: 100%;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  -webkit-transform: skewX(-25deg);
  transform: skewX(-25deg);
}
.product-card:hover .before-effect {
  -webkit-animation: shine 0.75s;
  animation: shine 0.75s;
}
@-webkit-keyframes shine {
  100% {
    left: 125%;
  }
}
@keyframes shine {
  100% {
    left: 125%;
  }
}
</style>
