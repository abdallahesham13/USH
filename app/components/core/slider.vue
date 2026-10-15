<template>
  <div class="custom-swiper">
    <client-only>
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="slidesPerView"
        :breakpoints="breakpoints"
        :space-between="spaceBetween"
        :centered-slides="centeredSlides"
        dir="rtl"
        :loop="loop"
        :looped-slides="items.length"
        :allowTouchMove="allowTouchMove"
        :simulateTouch="allowTouchMove"
        @swiper="onSwiperInit"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
      >
        <SwiperSlide
          v-for="(item, index) in items"
          :key="index"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <slot name="item" :item="item" :index="index" />
        </SwiperSlide>
      </Swiper>
    </client-only>

    <div class="flex justify-between items-center gap-6 mt-10">
      <div class="flex items-center gap-4">
        <button
          @click="prevSlide"
          :class="[
            'prev-btn flex items-center justify-center !rounded-full',
            isPrevDisabled
              ? 'disabled bg-primary/10 cursor-not-allowed'
              : 'hover:bg-black hover:text-white',
          ]"
          :disabled="isPrevDisabled"
        >
          <img
            src="/imgs/icons/arrow-right.svg"
            alt="arrow-right"
            class="size-6"
          />
        </button>

        <button
          @click="nextSlide"
          :class="[
            'next-btn !rounded-full',
            isNextDisabled
              ? 'disabled bg-primary/10 flex items-center justify-center cursor-not-allowed'
              : 'hover:bg-black hover:text-white',
          ]"
          :disabled="isNextDisabled"
        >
          <img
            src="/imgs/icons/arrow-left.svg"
            alt="arrow-left"
            class="size-6"
          />
        </button>
      </div>
      <div class="btns-dots flex items-center gap-3">
        <button
          v-for="(dot, index) in totalPages"
          :key="index"
          @click="goToSlide(index)"
          class="w-4 h-4 rounded-full bg-[#D8BED7] transition-all duration-300 cursor-pointer border border-transparent"
          :class="['dot', currentPage === index ? 'active bg-[#D8BED7] !border-[#822C7E]' : '']"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { nextTick, ref } from "vue";
const hoveredIndex = ref<number | null>(null);

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperInstance = ref<any>(null);
const currentPage = ref(0);
const totalPages = ref(0);

const isPrevDisabled = ref(true);
const isNextDisabled = ref(false);

const props = defineProps<{
  items: any[];
  slidesPerView: number;
  spaceBetween?: number;
  autoplay?: boolean;
  breakpoints?: any;
  centeredSlides?: boolean;
  loop?: boolean;
  allowTouchMove?: boolean;
}>();

const updatePagination = () => {
  if (!swiperInstance.value) return;
  currentPage.value = swiperInstance.value.activeIndex;
  totalPages.value = Math.ceil(
    swiperInstance.value.slides.length /
      swiperInstance.value.params.slidesPerView,
  );

  isPrevDisabled.value = currentPage.value === 0;
  isNextDisabled.value = currentPage.value >= totalPages.value - 1;
};

const prevSlide = () => {
  swiperInstance.value?.slidePrev();
};

const nextSlide = () => {
  swiperInstance.value?.slideNext();
};

const goToSlide = (index: number) => {
  swiperInstance.value?.slideTo(index);
};

const onSwiperInit = (swiper: any) => {
  swiperInstance.value = swiper;
  nextTick(() => {
    updatePagination();
    swiper.on("slideChange", updatePagination);
  });
};
</script>
