<template>
  <section id="services" :class="[
      'bg-[#faf9f5] px-4 pb-16 text-[#313131] sm:px-8 sm:pb-20 lg:px-[6.944vw] lg:pb-[6.944vw]',
      hideHeader ? 'pt-10 sm:pt-12 lg:pt-16' : 'pt-16 sm:pt-20 lg:pt-[6.944vw]',
    ]" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-10 lg:gap-14">
      <header v-if="!hideHeader" class="flex w-full flex-col items-center gap-3 text-center lg:gap-5">
        <p class="m-0 text-base font-medium leading-6 text-[var(--color-primary)] lg:text-xl">{{ $t('sub_titles.our_services') }}</p>
        <h2 class="m-0 max-w-[920px] text-[30px] font-bold leading-[1.35] tracking-[-0.3px] sm:text-4xl lg:text-[40px] lg:leading-[48px]">{{ $t('services.section_title') }}</h2>
      </header>

      <div v-if="visibleItems.length" dir="rtl" class="hidden w-full grid-cols-2 items-stretch gap-x-8 gap-y-8 sm:grid lg:grid-cols-3">
        <shared-cards-service v-for="(item, index) in visibleItems" :key="item.id" :item="item" :index="index" />
      </div>

      <Swiper v-if="visibleItems.length" :key="locale" class="mobile-only-slider section-slider w-full" :modules="[A11y, Keyboard, Pagination]" :dir="locale === 'ar' ? 'rtl' : 'ltr'" :slides-per-view="1" :space-between="20" :keyboard="{ enabled: true, onlyInViewport: true }" :pagination="{ clickable: true }" :breakpoints="{ 640: { slidesPerView: 2, spaceBetween: 24 }, 1024: { slidesPerView: 3, spaceBetween: 32 } }">
        <SwiperSlide v-for="(item, index) in visibleItems" :key="item.id">
          <shared-cards-service :item="item" :index="index" />
        </SwiperSlide>
      </Swiper>

      <p v-else class="m-0 text-center text-lg text-[#757575]">{{ $t('services.empty') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Keyboard, Pagination } from 'swiper/modules';
import type { IService } from '~/types';
import 'swiper/css';
import 'swiper/css/pagination';

const props = defineProps<{ services?: IService[]; staticMode?: boolean; hideHeader?: boolean }>();
const hideHeader = computed(() => props.hideHeader ?? false);
const { locale } = useI18n();
const visibleItems = computed(() => (props.services ?? []).slice(0, 6));
</script>

<style scoped>
@media (min-width: 640px) { .mobile-only-slider { display: none !important; } }
.section-slider { padding-bottom: 42px; }
.section-slider :deep(.swiper-slide) { height: auto; }
.section-slider :deep(.swiper-pagination-bullet) { background: var(--color-primary); opacity: .3; }
.section-slider :deep(.swiper-pagination-bullet-active) { width: 22px; border-radius: 999px; opacity: 1; }
</style>
