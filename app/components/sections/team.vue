<template>
  <section id="doctors" class="bg-light py-12 text-secondary lg:py-[88px]">
    <UContainer class="!max-w-[1440px] !px-4 sm:!px-6 lg:!px-[88px]">
      <h2 class="mb-8 text-start font-bold text-3xl leading-snug lg:mb-[42px] lg:text-[40px] lg:leading-[56px]">
        {{ $t('doctors_section.title') }}
      </h2>
      <core-section-loader v-if="pending" :loading="pending" />
      <p v-else-if="error" role="alert">{{ $t('doctors_section.error') }}</p>
      <p v-else-if="!doctors.length">{{ $t('doctors_section.empty') }}</p>
      <div v-if="staticMode && doctors.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="doctor in doctors.slice(0, 6)" :key="doctor.id" class="relative isolate h-[440px] overflow-hidden rounded-2xl lg:h-[500px]">
          <img :src="doctor.image" :alt="doctor.name" loading="lazy" class="size-full object-cover object-top" />
          <div class="absolute inset-x-4 bottom-4 flex flex-col items-center gap-3 rounded-2xl bg-primary px-4 py-4 text-center">
            <h3 class="font-bold text-2xl leading-8">{{ doctor.name }}</h3>
            <p class="line-clamp-2 font-medium text-lg leading-[26px]">{{ stripHtml(doctor.about_me || '') }}</p>
          </div>
        </article>
      </div>
      <template v-else>
        <Swiper class="!pt-[10px] -mt-[10px]" :key="locale" :modules="[A11y, Keyboard]" :keyboard="{ enabled: true, onlyInViewport: true }" :dir="locale === 'ar' ? 'rtl' : 'ltr'" :slides-per-view="1" :space-between="24" :breakpoints="{ 640: { slidesPerView: 2, spaceBetween: 24 }, 1024: { slidesPerView: 3, spaceBetween: 42 } }" @swiper="initialize" @slide-change="sync" @resize="sync" @snap-grid-length-change="sync">
          <SwiperSlide v-for="doctor in doctors" :key="doctor.id">
            <article class="transition-transform duration-300 ease-out hover:-translate-y-[10px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 relative isolate h-[440px] overflow-hidden rounded-2xl lg:h-[500px]">
              <img src="/imgs/about/doctor-mark-top.svg" alt="" class="absolute top-[14%] right-0 -z-10 h-[62.4%] w-[51%]" />
              <img src="/imgs/about/doctor-mark-bottom.svg" alt="" class="absolute bottom-0 left-0 -z-10 h-[68.8%] w-[56%]" />
              <img :src="doctor.image" :alt="doctor.name" loading="lazy" class="size-full object-cover object-top" />
              <div class="absolute inset-x-4 bottom-4 flex flex-col items-center gap-3 rounded-2xl bg-primary px-4 py-4 text-center">
                <h3 class="font-bold text-2xl leading-8">{{ doctor.name }}</h3>
                <p class="line-clamp-2 font-medium text-lg leading-[26px]">{{ stripHtml(doctor.about_me || '') }}</p>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
        <div class="mt-8 flex items-center justify-between gap-6 lg:mt-[42px]">
          <div class="flex gap-[17px]">
            <button v-for="direction in ['previous', 'next'] as const" :key="direction" type="button" :aria-label="$t(`doctors_section.${direction}`)" :disabled="direction === 'previous' ? atStart : atEnd" class="grid size-[50px] cursor-pointer place-items-center rounded-full border border-primary bg-light transition-colors hover:bg-primary-light disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" @click="direction === 'previous' ? slider?.slidePrev() : slider?.slideNext()">
              <img src="/imgs/icons/doctor-arrow.svg" alt="" class="size-6" :class="{ 'rotate-180': (direction === 'previous') === (locale === 'ar') }" />
            </button>
          </div>
          <div class="flex gap-2">
            <button v-for="(_, index) in snapPoints" :key="index" type="button" :aria-label="$t('doctors_section.slide', { number: index + 1 })" :aria-current="activeSnap === index ? 'true' : undefined" class="grid size-6 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-primary" @click="slider?.slideTo(index)">
              <span class="size-3 rounded-full" :class="activeSnap === index ? 'bg-primary' : 'bg-light-gray'" />
            </button>
          </div>
        </div>
      </template>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import type { IDoctor } from '~/types';
import 'swiper/css';

const props = defineProps<{ doctors?: IDoctor[]; staticMode?: boolean }>();
const staticMode = computed(() => props.staticMode ?? false);
const { $http } = useNuxtApp();
const { locale } = useI18n();
const { data, pending, error } = useLazyAsyncData(
  'home-doctors',
  () => $http.shared.doctors(),
  { server: false, immediate: !props.doctors?.length },
);
const doctors = computed(() => props.doctors?.length ? props.doctors : data.value?.data ?? []);
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
