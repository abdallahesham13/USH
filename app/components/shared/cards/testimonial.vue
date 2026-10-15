<template>
  <article class="testimonial-card flex h-full min-h-[142px] flex-col justify-between gap-6 rounded-2xl border border-[#f9fafa] bg-white p-6 text-right shadow-[0_1px_12px_rgba(3,25,29,0.05)]">
    <p class="m-0 line-clamp-3 w-full font-['The_Year_of_Handicrafts',sans-serif] text-base font-medium leading-7 text-[#757575] lg:text-lg">
      {{ stripHtml(item.description || item.comment || '') }}
    </p>
    <div class="flex w-full items-center justify-between gap-4" dir="ltr">
      <img src="/imgs/testimonials/five-stars.svg" :alt="$t('testimonials_section.rating', { value: 5 })" width="126" height="22" class="h-[22px] w-[126px] shrink-0 object-contain" />
      <div class="flex min-w-0 items-center gap-2">
        <h3 class="m-0 truncate font-['The_Year_of_Handicrafts',sans-serif] text-base font-bold leading-[22px] tracking-[-0.18px] text-[#031418]">{{ item.user_name || item.name }}</h3>
        <img v-if="item.image" :src="item.image" :alt="item.user_name || item.name || ''" width="40" height="40" loading="lazy" class="size-10 shrink-0 rounded-full object-cover" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ITestimonial } from '~/types';
defineProps<{ item: ITestimonial }>();
</script>

<style scoped>
.testimonial-card {
  translate: 0 0;
  transition: translate 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 600ms ease;
}
.testimonial-card:hover {
  translate: 0 -6px;
  box-shadow: 0 16px 36px rgba(3, 25, 29, 0.08);
}
@media (prefers-reduced-motion: reduce) {
  .testimonial-card { translate: none; transition: none; }
}
</style>
