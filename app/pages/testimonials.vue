<template>
  <main>
    <core-page-title>
      <div class="flex flex-col items-center gap-6 w-full">
        <h1
          class="text-light font-bold lg:text-[64px] text-2xl text-center relative z-10"
        >
          {{ $t("nav.testimonials") }}
        </h1>
      </div>
    </core-page-title>
    
    <lazy-sections-testimonials :testimonials="visibleTestimonials" static-mode />
    <div class="flex justify-center py-8">
      <core-pagination :meta="paginationMeta" />
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: `${$t("nav.testimonials")}`,
  titleTemplate: `${$t("app.title")} - %s`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
const { $http } = useNuxtApp();
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const { data: testimonials } = await useAsyncData<any>(
  "testimonials-all",
  () => $http.shared.testimonials(),
  {
    transform: (data) => data.data ?? [],
    default: () => [],
  }
);
const visibleTestimonials = computed(() => testimonials.value.slice((page.value - 1) * 6, page.value * 6));
const paginationMeta = computed(() => ({
  current_page: page.value,
  total: testimonials.value.length,
  per_page: 6,
  last_page: Math.max(1, Math.ceil(testimonials.value.length / 6)),
}));
</script>