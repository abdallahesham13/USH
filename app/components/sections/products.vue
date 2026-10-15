<template>
  <section id="services" class="px-4 py-12 sm:px-6 lg:px-11">
    <div class="relative isolate mx-auto max-w-[1352px] overflow-hidden rounded-[34px] bg-surface text-secondary lg:aspect-[1352/1261] [container-type:inline-size]">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <div class="absolute left-[49%] top-[51%] h-[70cqw] w-[32cqw] -translate-x-1/2 -translate-y-1/2 rotate-[32deg] [mask-image:url('/imgs/about/services-mask.svg')] [mask-size:100%_100%] [mask-position:center] [mask-repeat:no-repeat]">
          <img
            src="/imgs/about/services-background.png"
            alt=""
            width="628"
            height="776"
            loading="lazy"
            class="absolute left-1/2 top-1/2 h-[71.67cqw] w-[58cqw] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-[32deg] object-cover"
          />
        </div>
      </div>
      <h2 class="mb-10 text-start font-bold text-3xl leading-snug lg:absolute lg:top-[6.34%] lg:right-[5.92%] lg:m-0 lg:py-[.592cqw] lg:text-[2.959cqw] lg:leading-[4.142cqw]">{{ $t('services.intro_title') }}</h2>
      <div class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:block" dir="ltr">
        <div
          v-for="(item, index) in items.slice(0, 4)"
          :key="item.id"
          :dir="locale === 'ar' ? 'rtl' : 'ltr'"
          class="min-w-0 lg:absolute lg:w-[20.488%] lg:h-[23.373cqw]"
          :class="positions[index]"
        >
          <shared-cards-product
            :item="item"
            :index="index"
            class="[overflow-wrap:anywhere] lg:!gap-[1.775cqw] lg:!p-[1.775cqw] lg:[&>span]:!size-[5.917cqw] lg:[&_img]:!size-[2.959cqw] lg:[&_h3]:line-clamp-1 lg:[&_h3]:shrink-0 lg:[&_h3]:!text-[1.775cqw] lg:[&_h3]:!leading-[2.071cqw] lg:[&_p]:line-clamp-4 lg:[&_p]:!text-[1.331cqw] lg:[&_p]:!leading-[2.071cqw]"
          />
        </div>
        <div class="flex justify-center pt-2 sm:col-span-2 lg:absolute lg:left-[7.396%] lg:top-[77.716%] lg:pt-0">
          <button type="button" class="flex size-[132px] lg:size-[13.314cqw] cursor-pointer flex-col items-center justify-center gap-4 rounded-full bg-primary-dark p-1.5 text-light transition-colors hover:bg-primary-dark/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" @click="handleReservation">
            <span class="w-[112px] text-center font-bold text-sm leading-6 lg:w-[10.355cqw] lg:text-[1.183cqw] lg:leading-[1.775cqw]">{{ $t('buttons.book_consultation') }}</span>
            <img src="/imgs/about/consultation-arrow.svg" alt="" width="39" height="24" class="h-6 w-[39px] object-contain lg:h-[1.775cqw] lg:w-[2.885cqw]" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IService } from '~/types';
const props = defineProps<{ products?: IService[] }>();
const { locale } = useI18n();
const items = computed(() => props.products ?? []);
const positions = [
  'lg:left-[23.003%] lg:top-[15.464%]',
  'lg:left-[67.604%] lg:top-[29.738%]',
  'lg:left-[7.396%] lg:top-[46.233%]',
  'lg:left-[48.521%] lg:top-[64.949%]',
];
</script>
