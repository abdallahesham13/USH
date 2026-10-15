<template>
  <section class="bg-white px-5 py-12 sm:px-10 sm:py-14 lg:px-[6.95vw] lg:py-16" dir="rtl">
    <div class="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
      <div v-for="item in highlights" :key="item.label" class="group flex min-w-0 cursor-default flex-col items-center gap-4 text-center transition-transform duration-300 ease-out hover:-translate-y-2">
        <div class="flex size-[88px] shrink-0 items-center justify-center rounded-full bg-[#f6f2e7] shadow-[0_0_0_0_rgba(182,146,34,0)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-[#f1e8cf] group-hover:shadow-[0_12px_28px_rgba(182,146,34,0.18)]">
          <img :src="item.icon" alt="" class="size-10 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110" width="40" height="40" />
        </div>
        <p class="m-0 text-base font-medium leading-6 text-[#404040] transition-colors duration-300 group-hover:text-[var(--color-primary)]">{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const highlights = [
  { icon: '/imgs/home-highlights/diamond.svg', label: 'أخصائيات بخبرة واهتمام' },
  { icon: '/imgs/home-highlights/leaf.svg', label: 'خدمات لجمالكِ في مكان واحد' },
  { icon: '/imgs/home-highlights/care.svg', label: 'خيارات تناسبكِ' },
  { icon: '/imgs/home-highlights/chair.svg', label: 'في الصالون أو منزلكِ' },
  { icon: '/imgs/home-highlights/location.svg', label: 'في قلب شمال الرياض حي النرجس' },
];
</script>
