<template>
  <section class="bg-white px-5 pb-16 pt-8 text-[#404040] sm:px-10 lg:px-[6.944vw] lg:pb-24 lg:pt-12" dir="rtl">
    <div class="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-12 lg:gap-16">
      <header class="flex w-full flex-col items-center gap-3 text-center lg:gap-5">
        <p class="m-0 text-base font-semibold leading-6 text-[var(--color-primary)] lg:text-xl">
          {{ $t('about_values.label') }}
        </p>
        <h2 class="m-0 text-[30px] font-semibold leading-[1.35] tracking-[-0.3px] text-[#313131] sm:text-4xl lg:text-[40px] lg:leading-[48px]">
          {{ $t('about_values.title') }}
        </h2>
      </header>

      <div class="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-8">
        <article v-for="item in items" :key="item.key" class="value-card group flex flex-col items-center gap-4 rounded-3xl p-4 text-center">
          <span class="value-icon grid size-[88px] place-items-center rounded-full bg-[#f6f2e7]">
            <img :src="item.icon" alt="" width="40" height="40" class="value-image size-10 object-contain" />
          </span>
          <div class="flex flex-col items-center gap-4">
            <h3 class="m-0 text-xl font-semibold leading-6">{{ $t(`about_values.items.${item.key}.title`) }}</h3>
            <p class="m-0 max-w-[360px] text-base font-medium leading-[22px] tracking-[-0.18px]">
              {{ $t(`about_values.items.${item.key}.description`) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  { key: 'taste', icon: '/imgs/about-values/care.svg' },
  { key: 'experience', icon: '/imgs/about-values/stars.svg' },
  { key: 'all_in_one', icon: '/imgs/about-values/place.svg' },
] as const;
</script>

<style scoped>
.value-card,
.value-icon,
.value-image {
  translate: 0 0;
  scale: 1;
  transition:
    translate 850ms cubic-bezier(0.16, 1, 0.3, 1),
    scale 850ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 700ms ease,
    box-shadow 900ms cubic-bezier(0.16, 1, 0.3, 1);
}

.value-card:hover {
  translate: 0 -8px;
  scale: 1.01;
  background-color: #faf9f5;
  box-shadow: 0 18px 45px rgba(169, 133, 46, 0.12);
}
.value-card:hover .value-icon { translate: 0 -3px; scale: 1.08; }
.value-card:hover .value-image { scale: 1.04; }

@media (prefers-reduced-motion: reduce) {
  .value-card, .value-icon, .value-image { translate: none; scale: none; transition: none; }
}
</style>
