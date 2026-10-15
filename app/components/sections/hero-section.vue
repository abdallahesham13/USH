<template>
  <section id="home" class="mb-12" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="relative isolate flex min-h-[600px] w-full flex-col overflow-hidden bg-[#17120f] text-white sm:min-h-[680px] lg:min-h-[min(817px,100svh)] before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:bg-[linear-gradient(180deg,rgba(17,12,9,.14)_0%,rgba(17,12,9,.04)_40%,rgba(17,12,9,.18)_100%)] before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(90deg,rgba(19,14,11,.08)_0%,rgba(19,14,11,.08)_38%,rgba(19,14,11,.72)_56%,rgba(19,14,11,.98)_100%)] after:content-[''] max-lg:after:bg-[linear-gradient(180deg,rgba(17,12,9,.08)_0%,rgba(17,12,9,.48)_45%,rgba(17,12,9,.96)_100%)] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-primary [&_a:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-primary [&_button:focus-visible]:outline-offset-4">
      <img class="absolute inset-0 -z-2 size-full object-cover object-[42%_center] lg:object-center" v-if="heroSection?.image" :src="heroSection.image" alt="" fetchpriority="high" />
      <UHeader mode="drawer" class="relative top-0 z-10 h-[88px] shrink-0" :ui="headerUi">
        <template #title>
          <img class="h-9 w-[88px] object-contain sm:h-10 sm:w-24 lg:h-12 lg:w-[120px]" v-if="state.settings?.image" :src="state.settings.image" :alt="$t('app.title')" width="137" height="56" />
        </template>

        <div class="flex items-center gap-4 xl:gap-7 [&_ul]:gap-4 xl:[&_ul]:gap-7 [&_li]:flex [&_li]:items-center [&_li]:p-0 [&_li]:before:hidden [&_.router-link]:!font-['The_Year_of_Handicrafts',sans-serif] [&_.router-link]:!text-[15px] xl:[&_.router-link]:!text-base [&_.router-link]:!font-light [&_.router-link]:!leading-6 [&_.router-link]:whitespace-nowrap [&_.router-link]:!text-white/90 [&_.router-link]:border-b [&_.router-link]:border-transparent [&_.router-link]:cursor-pointer [&_.router-link]:!transition-colors [&_.router-link]:!duration-200 [&_.router-link]:before:!hidden [&_.router-link]:after:!hidden [&_.router-link:hover]:!text-primary [&_.router-link:hover]:border-primary [&_.router-link-active]:!text-primary [&_.router-link-active]:border-primary [&_.router-link-active]:!font-['The_Year_of_Handicrafts',sans-serif] [&_.router-link-active]:!font-medium">
          <ui-navbar-nav-items />
          <NuxtLink to="/contact" class="cursor-pointer whitespace-nowrap rounded-full bg-[var(--color-primary)] min-h-12 px-7 py-3 font-['The_Year_of_Handicrafts',sans-serif] text-[15px] font-medium leading-6 text-white transition-colors duration-200 hover:bg-[var(--color-primary)] xl:px-8 xl:text-base">{{ $t('buttons.book_appointment') }}</NuxtLink>
        </div>

        <template #right>
          <div class="hidden" dir="ltr">
            <a
              :href="state.contactInfo?.unified_number ? `tel:0${state.contactInfo.unified_number}` : undefined"
              :aria-label="state.contactInfo?.unified_number ? String(state.contactInfo.unified_number) : $t('nav.contact_us')"
              :aria-disabled="!state.contactInfo?.unified_number"
              class="grid size-9 place-items-center rounded-full border border-primary transition-colors duration-200 min-[600px]:size-10 min-[1400px]:size-[50px] aria-disabled:cursor-default [&[href]:hover]:bg-primary/[.16]"
            >
              <img class="size-5 min-[600px]:size-6" src="/imgs/contact/header-phone.svg" alt="" width="24" height="24" />
            </a>
            <a
              :href="state.contactInfo?.email ? `mailto:${state.contactInfo.email}` : undefined"
              :aria-label="state.contactInfo?.email || $t('nav.contact_us')"
              :aria-disabled="!state.contactInfo?.email"
              class="grid size-9 place-items-center rounded-full border border-primary transition-colors duration-200 min-[600px]:size-10 min-[1400px]:size-[50px] aria-disabled:cursor-default [&[href]:hover]:bg-primary/[.16]"
            >
              <img class="size-5 min-[600px]:size-6" src="/imgs/contact/header-email.svg" alt="" width="24" height="24" />
            </a>
          </div>
        </template>

        <template #body>
          <ui-navbar-nav-items class="flex flex-col items-start !gap-2 lg:hidden" />
          <core-button class="w-full mt-6 core-button-animation" to="/contact">
            {{ $t('buttons.book_appointment') }}
          </core-button>
        </template>
      </UHeader>

      <div class="relative my-auto mr-auto flex w-full max-w-[620px] flex-col items-center gap-5 px-6 pt-24 pb-14 text-center sm:px-10 lg:mr-0 lg:ml-auto lg:w-[50%] lg:max-w-none lg:items-start lg:px-[6vw] lg:pt-14 lg:pb-20 lg:text-right xl:px-[7vw]">
        <h1 class="m-0 font-['The_Year_of_Handicrafts',sans-serif] text-[34px] leading-[1.35] sm:text-[40px] lg:text-[42px] lg:leading-[1.3] xl:text-5xl">{{ heroSection?.title }}</h1>
        <p class="m-0 max-w-[560px] font-['The_Year_of_Handicrafts',sans-serif] text-base leading-[1.9] text-white/90 sm:text-lg lg:text-base lg:leading-[1.9] xl:text-lg">{{ heroSection?.description }}</p>
        <core-button class="!mt-1 !flex !o-12 !w-auto !min-w-[156px] shrink-0 !justify-center !rounded-full !border !border-[var(--color-primary)] !bg-[var(--color-primary)] !px-6 !text-sm !leading-5 !text-white !shadow-none hover:!bg-[var(--color-primary)]" @click="handleReservation">
          <span class="flex-1 text-center">{{ $t('buttons.book_consultation') }}</span>
          <span class="hidden"><img class="size-6" src="/imgs/icons/header-arrow-left.svg" alt="" width="24" height="24" /></span>
        </core-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ heroSection?: any }>();
const { state } = useAppStore();
const { locale } = useI18n();
const headerUi = {
  root: '!bg-transparent !bg-none !backdrop-blur-none !border-0 !shadow-none',
  container: '!max-w-none !bg-transparent !bg-none !shadow-none !px-6 !py-5 !gap-4 sm:!px-10 lg:!px-[4vw] xl:!px-[4vw]',
  left: '!flex-none',
  right: '!flex-none',
  toggle: 'text-primary',
};
</script>




