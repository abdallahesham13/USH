<template>
  <main>
    <core-page-title class="!mb-0">
      <h1 class="relative z-10 text-center text-2xl font-bold text-light lg:text-[64px]">
        {{ $t('nav.services') }}
      </h1>
    </core-page-title>
    <lazy-sections-services :services="services?.data" hide-header />
    <core-pagination :meta="services?.meta" query-key="page" />
  </main>
</template>

<script setup lang="ts">
definePageMeta({ path: '/services', alias: ['/products'] });
const { t } = useI18n();
useHead(() => ({ title: t('nav.services'), titleTemplate: `${t('app.title')} - %s` }));
const { $http } = useNuxtApp();
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const { data: services } = await useLazyAsyncData(
  () => `services-page-${page.value}`,
  () => $http.shared.services({ page: page.value, per_page: 6 }),
  {
    server: false,
    watch: [page],
    default: () => ({ data: [], meta: undefined }),
  },
);
</script>
