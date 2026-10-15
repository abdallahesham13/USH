<template>
  <section
    id="blogs"
    :class="[
      'bg-[#faf9f5] px-4 pb-16 text-[#313131] sm:px-8 sm:pb-20 lg:px-[6.944vw] lg:pb-[6.944vw]',
      hideHeader ? 'pt-10 sm:pt-12 lg:pt-16' : 'pt-16 sm:pt-20 lg:pt-[6.944vw]',
    ]"
  >
    <div class="mx-auto w-full max-w-[1240px]">
      <h2 v-if="!hideHeader" class="mb-10 text-start text-3xl font-bold leading-snug lg:mb-14 lg:text-[40px]">{{ $t('titles.blogs') }}</h2>
      <core-section-loader v-if="pending && !items.length" :loading="true" />
      <div v-if="staticMode && items.length" class="grid grid-cols-1 items-stretch gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <shared-cards-blog v-for="item in items.slice(0, 6)" :key="item.id" :item="item" featured />
      </div>
      <template v-else-if="items.length">
        <Swiper :key="locale" :modules="[A11y, Keyboard]" :keyboard="{ enabled: true, onlyInViewport: true }" :dir="locale === 'ar' ? 'rtl' : 'ltr'" :slides-per-view="1" :space-between="32" @swiper="initialize" @slide-change="sync" @resize="sync" @snap-grid-length-change="sync">
          <SwiperSlide v-for="(group, page) in groups" :key="page">
            <div class="grid gap-6 md:grid-cols-[1.2fr_1fr] md:grid-rows-2 md:gap-8" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
              <shared-cards-blog v-for="(item, index) in group" :key="item.id" :item="item" featured
                class="min-w-0 md:!min-h-0"
                :class="index === 2 ? 'md:col-start-2 md:row-start-1 md:row-span-2' : 'md:col-start-1 md:aspect-[2.28/1]'" />
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="mt-8 flex items-center justify-between gap-6 lg:mt-[42px]">
          <div class="flex gap-[17px]">
            <button v-for="direction in ['previous', 'next'] as const" :key="direction" type="button" :aria-label="$t(`blogs_section.${direction}`)" :disabled="direction === 'previous' ? atStart : atEnd" class="grid size-[50px] cursor-pointer place-items-center rounded-full border border-primary bg-light transition-colors hover:bg-primary-light disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" @click="direction === 'previous' ? slider?.slidePrev() : slider?.slideNext()">
              <img src="/imgs/icons/doctor-arrow.svg" alt="" class="size-6" :class="{ 'rotate-180': (direction === 'previous') === (locale === 'ar') }" />
            </button>
          </div>
          <div class="flex gap-2">
            <button v-for="(_, index) in snapPoints" :key="index" type="button" :aria-label="$t('blogs_section.slide', { number: index + 1 })" :aria-current="activeSnap === index ? 'true' : undefined" class="grid size-6 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-primary" @click="slider?.slideTo(index)">
              <span class="size-3 rounded-full" :class="activeSnap === index ? 'bg-primary' : 'bg-light-gray'" />
            </button>
          </div>
        </div>
      </template>
      <p v-else>{{ $t('blogs_section.empty') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import type { IBlog } from '~/types';
import 'swiper/css';

const props = defineProps<{ blogs?: IBlog[]; staticMode?: boolean; hideHeader?: boolean }>();
const hideHeader = computed(() => props.hideHeader ?? false);
const staticMode = computed(() => props.staticMode ?? false);
const { locale } = useI18n();
const { $http } = useNuxtApp();
const { data, pending } = useLazyAsyncData('home-blogs', async () =>
  props.blogs?.length ? props.blogs : (await $http.shared.blogs()).data,
  { server: false, watch: [locale] },
);
const items = computed(() => props.blogs?.length ? props.blogs : data.value ?? []);
const groups = computed(() => Array.from({ length: Math.ceil(items.value.length / 3) }, (_, index) => items.value.slice(index * 3, index * 3 + 3)));
const slider = shallowRef<SwiperInstance>();
const snapPoints = ref<number[]>([]);
const activeSnap = ref(0);
const atStart = ref(true);
const atEnd = ref(true);
const sync = (instance: SwiperInstance) => {
  snapPoints.value = [...instance.snapGrid];
  activeSnap.value = instance.snapIndex;
  atStart.value = instance.isBeginning;
  atEnd.value = instance.isEnd || instance.isLocked;
};
const initialize = (instance: SwiperInstance) => {
  slider.value = instance;
  sync(instance);
};
</script>
