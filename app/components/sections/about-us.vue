<template>
  <section id="about-us" class="bg-white px-5 pt-16 pb-20 text-secondary sm:px-10 lg:px-[6.95vw] lg:pb-28">
    <div class="mx-auto flex max-w-[1240px] flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16" dir="ltr">
      <div class="flex w-full max-w-[693px] flex-col items-end gap-10 text-right" dir="rtl">
        <div class="flex w-full flex-col items-start gap-5">
          <p class="m-0 w-full font-medium text-lg leading-6 text-[var(--color-primary)] sm:text-xl">
            {{ $t('nav.about_us') }}
          </p>
          <h2 class="m-0 w-full font-bold text-[32px] leading-[1.35] tracking-[-0.3px] text-[#313131] sm:text-[40px] sm:leading-[48px]">
            {{ aboutUs?.title }}
          </h2>
        </div>

        <div class="flex w-full flex-col items-start gap-6">
          <div
            class="w-full font-normal text-base leading-8 text-[#757575] sm:text-lg sm:leading-[33px] [&_p]:m-0"
            v-html="aboutUs?.description"
          ></div>
          <NuxtLink
            to="/services"
            class="inline-flex h-[50px] min-w-[149px] items-center justify-center rounded-full bg-[var(--color-primary)] px-4 font-medium text-base text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-lg sm:text-lg"
          >
            اكتشفي USH
          </NuxtLink>
        </div>
      </div>

      <div v-if="aboutUs?.image" class="o-[430px] w-full max-w-[467px] shrink-0 overflow-hidden rounded-t-[180px] sm:o-[500px] lg:o-[553px] lg:rounded-t-[200px]">
        <img
          :src="aboutUs.image"
          :alt="aboutUs?.title || $t('nav.about_us')"
          class="size-full object-cover"
          loading="lazy"
          width="467"
          height="553"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IAbout } from '~/types';

defineProps<{ aboutUs?: IAbout }>();
</script>



