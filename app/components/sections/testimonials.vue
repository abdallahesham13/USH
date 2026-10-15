<template>
  <section id="testimonials" class="bg-white px-4 py-16 text-[#313131] sm:px-8 lg:px-[6.944vw] lg:py-16" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-10 lg:gap-14">
      <header class="flex w-full flex-col items-center gap-3 text-center lg:gap-5">
        <p class="m-0 text-base font-medium leading-6 text-[var(--color-primary)] lg:text-xl">{{ $t('testimonials_section.label') }}</p>
        <h2 class="m-0 text-[30px] font-bold leading-[1.35] tracking-[-0.3px] sm:text-4xl lg:text-[40px] lg:leading-[48px]">{{ $t('testimonials_section.title') }}</h2>
      </header>

      <div v-if="items.length" class="hidden w-full grid-cols-2 gap-6 sm:grid lg:grid-cols-3">
        <shared-cards-testimonial v-for="item in items.slice(0, 6)" :key="item.id" :item="item" />
      </div>

      <Swiper v-if="items.length" :key="locale" class="mobile-only-slider section-slider w-full" :modules="[A11y, Keyboard, Pagination]" :dir="locale === 'ar' ? 'rtl' : 'ltr'" :slides-per-view="1" :space-between="20" :keyboard="{ enabled: true, onlyInViewport: true }" :pagination="{ clickable: true }" :breakpoints="{ 640: { slidesPerView: 2, spaceBetween: 24 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }">
        <SwiperSlide v-for="item in items" :key="item.id">
          <shared-cards-testimonial :item="item" />
        </SwiperSlide>
      </Swiper>

      <core-section-loader v-else-if="pending" :loading="true" />
      <p v-else class="m-0 text-center text-lg text-[#757575]">{{ $t('testimonials_section.empty') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Keyboard, Pagination } from 'swiper/modules';
import type { ITestimonial } from '~/types';
import 'swiper/css';
import 'swiper/css/pagination';

const props = defineProps<{ testimonials?: ITestimonial[]; staticMode?: boolean }>();
const { locale } = useI18n();
const { $http } = useNuxtApp();
const { data, pending } = useLazyAsyncData('home-testimonials', async () => props.testimonials?.length ? props.testimonials : (await $http.shared.testimonials()).data, { server: false, watch: [locale] });
const items = computed(() => props.testimonials?.length ? props.testimonials : data.value ?? []);
</script>

<style scoped>
@media (min-width: 640px) { .mobile-only-slider { display: none !important; } }
.section-slider { padding-bottom: 42px; }
.section-slider :deep(.swiper-slide) { height: auto; }
.section-slider :deep(.swiper-pagination-bullet) { background: var(--color-primary); opacity: .3; }
.section-slider :deep(.swiper-pagination-bullet-active) { width: 22px; border-radius: 999px; opacity: 1; }
</style>
