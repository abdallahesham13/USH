<template>
  <section id="gallery" class="bg-white px-4 py-16 sm:px-8 lg:px-[6.944vw]" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-10 lg:gap-14">
      <header class="flex w-full flex-col items-center gap-3 text-center lg:gap-5">
        <p class="m-0 text-base font-medium leading-6 text-[var(--color-primary)] lg:text-xl">{{ $t('static_gallery.label') }}</p>
        <h2 class="m-0 text-[30px] font-bold leading-[1.35] tracking-[-0.3px] text-[#313131] sm:text-4xl lg:text-[40px] lg:leading-[48px]">{{ $t('static_gallery.title') }}</h2>
      </header>

      <div v-if="items.length" class="gallery-layout hidden w-full sm:flex" dir="ltr" data-aos="fade-up">
        <div class="gallery-left">
          <a v-if="items[0]" class="gallery-tile gallery-wide" :href="items[0].image" data-fancybox="gallery">
            <core-lazy-image :src="items[0].image" :alt="itemAlt(items[0])" :loading="false" />
          </a>
          <div class="gallery-left-bottom">
            <div v-for="group in [[1, 2], [3, 4]]" :key="group[0]" class="gallery-stack">
              <a v-for="index in group" v-show="items[index]" :key="index" class="gallery-tile gallery-small" :href="items[index]?.image" data-fancybox="gallery">
                <core-lazy-image v-if="items[index]" :src="items[index].image" :alt="itemAlt(items[index])" :loading="false" />
              </a>
            </div>
          </div>
        </div>
        <div class="gallery-right">
          <a v-if="items[5]" class="gallery-tile gallery-portrait" :href="items[5].image" data-fancybox="gallery">
            <core-lazy-image :src="items[5].image" :alt="itemAlt(items[5])" :loading="false" />
          </a>
          <a v-if="items[6]" class="gallery-tile gallery-nails" :href="items[6].image" data-fancybox="gallery">
            <core-lazy-image :src="items[6].image" :alt="itemAlt(items[6])" :loading="false" />
          </a>
        </div>
      </div>

      <Swiper v-if="items.length" :key="locale" class="mobile-only-slider gallery-slider w-full" :modules="[A11y, Keyboard, Pagination]" :dir="locale === 'ar' ? 'rtl' : 'ltr'" :slides-per-view="1" :space-between="20" :keyboard="{ enabled: true, onlyInViewport: true }" :pagination="{ clickable: true }" :breakpoints="{ 640: { slidesPerView: 2, spaceBetween: 24 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }" data-aos="fade-up">
        <SwiperSlide v-for="item in items" :key="item.id || item.image">
          <a class="gallery-tile" :href="item.image" data-fancybox="gallery" :aria-label="itemAlt(item)">
            <core-lazy-image :src="item.image" :alt="itemAlt(item)" :loading="false" />
          </a>
        </SwiperSlide>
      </Swiper>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const props = defineProps<{ gallery?: any[] }>();
const { locale } = useI18n();
const items = computed(() => props.gallery ?? []);
const itemAlt = (item: any) => item?.name || item?.title || '';
</script>

<style scoped>
@media (min-width: 640px) { .mobile-only-slider { display: none !important; } }
.gallery-slider { padding-bottom: 42px; }
.gallery-slider :deep(.swiper-slide) { height: auto; }
.gallery-layout { gap: 24px; }
.gallery-left { display: flex; min-width: 0; flex: 777 1 0; flex-direction: column; gap: 24px; }
.gallery-right { display: flex; min-width: 0; flex: 437 1 0; flex-direction: column; gap: 24px; }
.gallery-left-bottom { display: flex; gap: 21px; }
.gallery-stack { display: flex; min-width: 0; flex: 1; flex-direction: column; gap: 24px; }
.gallery-tile {
  position: relative;
  display: block;
  width: 100%;
  height: 420px;
  overflow: hidden;
  border-radius: 24px;
  background: #d9d9d9;
}
.gallery-layout .gallery-wide { height: 247px; }
.gallery-layout .gallery-small { height: 190px; }
.gallery-layout .gallery-portrait { height: 249px; }
.gallery-layout .gallery-nails { height: 404px; }
.gallery-tile :deep(.core-lazy-image) { width: 100%; height: 100%; }
.gallery-tile :deep(.original-image) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
}
.gallery-tile:hover :deep(.original-image) { transform: scale(1.035); }
.gallery-slider :deep(.swiper-pagination-bullet) { background: var(--color-primary); opacity: .3; }
.gallery-slider :deep(.swiper-pagination-bullet-active) { width: 22px; border-radius: 999px; opacity: 1; }

@media (max-width: 639px) {
  .gallery-tile { height: auto; aspect-ratio: 1 / 1; border-radius: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .gallery-tile :deep(.original-image) { transition: none; }
}
</style>
