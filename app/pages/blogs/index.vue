<template>
  <main>
    <core-page-title class="!mb-0">
      <h1 class="relative z-10 text-center text-2xl font-bold text-light lg:text-[64px]">
        {{ $t("nav.blogs") }}
      </h1>
    </core-page-title>
    <lazy-sections-blogs :blogs="visibleBlogs" static-mode hide-header />
    <core-pagination :meta="paginationMeta" />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: `${$t('nav.blogs')}`,
  titleTemplate: `%s - ${$t('app.title')}`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
const { $http } = useNuxtApp();
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const { data: blogs } = await useAsyncData<any>(
  "blogs-all",
  () => $http.shared.blogs(),
  {
    transform: data => data.data ?? [],
    default: () => [],
  }
);
const visibleBlogs = computed(() => blogs.value.slice((page.value - 1) * 6, page.value * 6));
const paginationMeta = computed(() => ({
  current_page: page.value,
  total: blogs.value.length,
  per_page: 6,
  last_page: Math.max(1, Math.ceil(blogs.value.length / 6)),
}));
</script>
