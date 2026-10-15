<template>
  <section class="mb-12">
    <div class="page-title-section relative isolate flex h-[300px] w-full items-center justify-center overflow-hidden px-4 pt-20 lg:h-[394px]">
      <UContainer class="relative z-10 flex h-full w-full items-center justify-center text-center">
        <slot />
      </UContainer>
    </div>
  </section>
</template>

<style scoped>
.page-title-section::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgba(27, 20, 14, 0.64) 0%, rgba(27, 20, 14, 0.2) 100%);
}

.page-title-section::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  background: url("/imgs/general/sub-header-salon.png") center center / cover no-repeat;
  animation: bg-scale-animation 15s ease-in-out infinite;
}

.page-title-section :deep(h1) {
  margin: 0;
  color: #fff;
  font-family: "The Year of Handicrafts", sans-serif;
  font-size: clamp(2rem, 3vw, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
}

@media (prefers-reduced-motion: reduce) {
  .page-title-section::after { animation: none; }
}
</style>
