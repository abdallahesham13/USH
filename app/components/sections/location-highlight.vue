<template>
  <section class="bg-white" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#24150e] px-5 py-16 text-white sm:px-10 lg:min-h-[666px] lg:px-[6.944vw]">
      <img
        src="/imgs/location-section/salon-location.png"
        alt=""
        width="1620"
        height="911"
        loading="lazy"
        class="absolute inset-0 -z-20 size-full object-cover object-[34%_center] lg:object-center"
      />
      <div class="absolute inset-0 -z-10 bg-black/35 lg:bg-transparent" aria-hidden="true"></div>

      <div class="flex w-full max-w-[697px] flex-col items-start gap-8 text-right lg:absolute lg:right-[6.944vw] lg:top-1/2 lg:-translate-y-1/2 lg:gap-10">
        <h2 class="m-0 font-['The_Year_of_Handicrafts',sans-serif] text-[36px] font-bold leading-[1.35] tracking-[-0.6px] sm:text-5xl lg:text-[56px] lg:leading-[68px]">
          {{ $t('location_section.title') }}
        </h2>
        <div class="flex w-full flex-col items-start gap-6">
          <p class="m-0 max-w-[654px] font-['The_Year_of_Handicrafts',sans-serif] text-base font-medium leading-8 sm:text-lg lg:text-xl lg:leading-[33px]">
            {{ $t('location_section.description') }}
          </p>
          <div class="flex flex-wrap justify-start gap-4">
            <NuxtLink
              to="/contact"
              class="flex h-[50px] min-w-[149px] items-center justify-center rounded-full bg-[var(--color-primary)] px-4 font-['The_Year_of_Handicrafts',sans-serif] text-base font-medium leading-7 text-white transition-colors hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:text-lg"
            >
              {{ $t('buttons.book_appointment') }}
            </NuxtLink>
            <NuxtLink
              to="/services"
              class="flex h-[50px] min-w-[149px] items-center justify-center rounded-full border border-[var(--color-primary)] px-4 font-['The_Year_of_Handicrafts',sans-serif] text-base font-medium leading-7 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:text-lg"
            >
              {{ $t('buttons.discover_services') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:gap-8 lg:px-[6.944vw] lg:py-16">
      <div
        v-for="item in reversedFeatures"
        :key="item.titleKey"
        class="location-feature-card group flex flex-col items-center gap-4 rounded-3xl p-4 text-center text-[#404040]"
      >
        <span class="location-feature-icon grid size-[88px] place-items-center rounded-full bg-[#f6f2e7]">
          <img :src="item.icon" alt="" width="40" height="40" class="location-feature-image size-10 object-contain" />
        </span>
        <div class="flex flex-col items-center gap-4">
          <h3 class="m-0 font-['The_Year_of_Handicrafts',sans-serif] text-xl font-bold leading-6">
            {{ $t(item.titleKey) }}
          </h3>
          <p class="m-0 font-['The_Year_of_Handicrafts',sans-serif] text-base font-medium leading-[22px] tracking-[-0.18px]">
            {{ $t(item.descriptionKey) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const features = [
  {
    icon: '/imgs/location-section/whatsapp.svg',
    titleKey: 'location_section.features.contact.title',
    descriptionKey: 'location_section.features.contact.description',
  },
  {
    icon: '/imgs/location-section/nearby.svg',
    titleKey: 'location_section.features.nearby.title',
    descriptionKey: 'location_section.features.nearby.description',
  },
  {
    icon: '/imgs/location-section/services.svg',
    titleKey: 'location_section.features.services.title',
    descriptionKey: 'location_section.features.services.description',
  },
  {
    icon: '/imgs/location-section/location.svg',
    titleKey: 'location_section.features.location.title',
    descriptionKey: 'location_section.features.location.description',
  },
] as const;

const reversedFeatures = [...features].reverse();
</script>

<style scoped>
.location-feature-card {
  translate: 0 0;
  scale: 1;
  transition:
    translate 850ms cubic-bezier(0.16, 1, 0.3, 1),
    scale 850ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 700ms ease,
    box-shadow 900ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: translate, scale;
}

.location-feature-icon,
.location-feature-image {
  translate: 0 0;
  scale: 1;
  transition:
    translate 850ms cubic-bezier(0.16, 1, 0.3, 1),
    scale 850ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: translate, scale;
}

.location-feature-card:hover {
  translate: 0 -8px;
  scale: 1.01;
  background-color: #faf9f5;
  box-shadow: 0 18px 45px rgba(169, 133, 46, 0.12);
}

.location-feature-card:hover .location-feature-icon {
  translate: 0 -3px;
  scale: 1.08;
}

.location-feature-card:hover .location-feature-image {
  scale: 1.04;
}

@media (prefers-reduced-motion: reduce) {
  .location-feature-card,
  .location-feature-icon,
  .location-feature-image {
    translate: none;
    scale: none;
    transition: none;
  }
}
</style>


