<template>
  <main>
    <core-page-title>
      <div class="flex flex-col items-center gap-6 w-full">
        <h1
          class="text-light font-bold lg:text-[64px] text-2xl text-center relative z-10"
        >
          {{ $t("nav.faqs") }}
        </h1>
      </div>
    </core-page-title>
    <lazy-sections-faqs :faqs="faqs?.data" />
    <div class="flex justify-center py-8">
      <core-pagination :meta="faqs?.meta" />
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: `${$t("nav.faqs")}`,
  titleTemplate: `${$t("app.title")} - %s`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
const { $http } = useNuxtApp();
const route = useRoute();
const page = computed(() => route.query.page || 1);
const { data: faqs, pending } = await useAsyncData<any>(
  () => `faqs-page-${page.value}`,
  () => $http.shared.faqs({ page: page.value, per_page: 6 }),
  {
    transform: (data) => ({ data: data.data, meta: data.meta }),
    default: () => ({ data: [], meta: undefined }),
    watch: [page],
  },
);
</script>
