<template>
  <UHeader
    mode="drawer"
    class="absolute inset-x-0 top-0 z-50 h-[88px] border-0 bg-transparent !backdrop-blur-none"
    :ui="headerUi"
  >
    <template #title>
      <img
        v-if="state.settings?.image"
        class="h-12 w-[120px] object-contain"
        :src="state.settings.image"
        :alt="$t('app.title')"
        width="137"
        height="56"
      />
    </template>

    <div class="flex items-center gap-4 xl:gap-7 [&_ul]:gap-4 xl:[&_ul]:gap-7 [&_li]:flex [&_li]:items-center [&_li]:p-0 [&_li]:before:hidden [&_.router-link]:!font-['The_Year_of_Handicrafts',sans-serif] [&_.router-link]:!text-[15px] xl:[&_.router-link]:!text-base [&_.router-link]:!font-light [&_.router-link]:!leading-6 [&_.router-link]:whitespace-nowrap [&_.router-link]:!text-white/90 [&_.router-link]:border-b [&_.router-link]:border-transparent [&_.router-link]:cursor-pointer [&_.router-link]:!transition-colors [&_.router-link]:!duration-200 [&_.router-link]:before:!hidden [&_.router-link]:after:!hidden [&_.router-link:hover]:!text-primary [&_.router-link:hover]:border-primary [&_.router-link-active]:!text-primary [&_.router-link-active]:border-primary [&_.router-link-active]:!font-['The_Year_of_Handicrafts',sans-serif] [&_.router-link-active]:!font-medium">
      <ui-navbar-nav-items />
      <NuxtLink
        to="/contact"
        active-class="booking-button-active"
        exact-active-class="booking-button-active"
        class="booking-button cursor-pointer whitespace-nowrap rounded-full bg-[var(--color-primary)] min-h-12 px-7 py-3 font-['The_Year_of_Handicrafts',sans-serif] text-[15px] font-medium leading-6 text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-110 xl:px-8 xl:text-base"
      >
        {{ $t('buttons.book_appointment') }}
      </NuxtLink>
    </div>

    <template #right><div class="hidden" /></template>

    <template #body>
      <ui-navbar-nav-items class="flex flex-col items-start !gap-2 lg:hidden" />
      <core-button class="mt-6 w-full core-button-animation" to="/contact">
        {{ $t('buttons.book_appointment') }}
      </core-button>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { state } = useAppStore();
const headerUi = {
  root: '!bg-transparent !bg-none !backdrop-blur-none !border-0 !shadow-none',
  container: '!max-w-none !bg-transparent !bg-none !shadow-none !px-6 !py-5 !gap-4 sm:!px-10 lg:!px-[4vw]',
  left: '!flex-none',
  right: '!flex-none',
  toggle: 'text-primary',
};
</script>

<style scoped>
.booking-button.booking-button-active {
  color: #fff !important;
  border-color: transparent !important;
}
</style>
