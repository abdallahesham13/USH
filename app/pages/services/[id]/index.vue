<template>
  <main>
    <core-page-title>
      <div class="flex flex-col items-center gap-4 text-center text-light">
        <h1 class="text-4xl font-bold lg:text-[56px]">{{ $t('nav.services') }}</h1>
        <nav :aria-label="$t('blog_detail.breadcrumb')" class="flex flex-wrap items-center justify-center gap-3 text-sm">
          <NuxtLink to="/services" class="hover:underline">{{ $t('nav.services') }}</NuxtLink>
          <UIcon :name="locale === 'ar' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right'" class="size-4" aria-hidden="true" />
          <span aria-current="page" class="font-bold">{{ service?.name }}</span>
        </nav>
      </div>
    </core-page-title>
    <section class="bg-light py-10 text-secondary lg:py-[88px]">
      <UContainer class="!max-w-[1440px] !px-4 sm:!px-6 lg:!px-[88px]">
        <core-section-loader :loading="pending" />
        <p v-if="error" role="alert" class="text-center text-error">{{ $t("services.load_error") }}</p>
        <div
          class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10"
          v-if="!pending && service && !error"
        >
          <div data-fancybox="service" :href="service?.image">
            <core-lazy-image
              :src="service?.image"
              :alt="service?.name"
              class="aspect-[4/3] w-full rounded-2xl object-cover cursor-zoom-in lg:aspect-[477/544]"
            />
          </div>
          <div class="min-w-0 text-start">
            <h2 class="mb-6 text-xl font-bold leading-8 lg:text-2xl">{{ service?.name }}</h2>
            <div
              class="text-base leading-7 text-gray lg:text-lg lg:leading-8 [&_p]:mb-5 [&_img]:max-w-full [&_a]:underline [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:list-decimal [&_ol]:ps-6 [overflow-wrap:anywhere]"
              v-html="service?.full_description"
            ></div>
            <div class="mt-6">
              <core-button
                class="w-max core-button-animation"
                @click="handleReservation"
              >
                {{ $t("buttons.book_appointment") }}
              </core-button>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ path: '/services/:id', alias: ['/products/:id'] });
const { $http } = useNuxtApp();
const { t, locale } = useI18n();
const route = useRoute();
const { data: service, pending, error } = await useAsyncData(
  () => `service-${locale.value}-${route.params.id}`,
  () => $http.shared.service(Number(route.params.id)),
  { transform: data => data.data, server: false },
);
useHead(() => ({
  title: `${service.value?.name || t('nav.services')} - ${t('nav.services')}`,
  titleTemplate: `${t('app.title')} - %s`,
}));
</script>
