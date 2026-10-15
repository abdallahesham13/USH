<template>
  <main>
    <core-page-title>
      <h1 class="relative z-10 text-center text-2xl font-bold text-light lg:text-[64px]">
        {{ $t("nav.doctors") }}
      </h1>
    </core-page-title>
    <lazy-sections-team :doctors="visibleDoctors" static-mode />
    <div class="flex justify-center py-8">
      <core-pagination :meta="paginationMeta" />
    </div>
    
  </main>
</template>

<script setup lang="ts">
definePageMeta({ path: "/doctors", alias: ["/team"] });
useHead({
  title: `${$t("nav.doctors")}`,
  titleTemplate: `%s - ${$t("app.title")}`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
const { $http } = useNuxtApp();
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const { data: doctors } = await useAsyncData<any>(
  "doctors-all",
  () => $http.shared.doctors(),
  {
    transform: (data) => data.data ?? [],
    default: () => [],
  }
);
const visibleDoctors = computed(() => doctors.value.slice((page.value - 1) * 6, page.value * 6));
const paginationMeta = computed(() => ({
  current_page: page.value,
  total: doctors.value.length,
  per_page: 6,
  last_page: Math.max(1, Math.ceil(doctors.value.length / 6)),
}));
</script>