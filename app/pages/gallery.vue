<template>
  <main>
    <core-page-title>
      <div class="flex flex-col items-center gap-6 w-full">
        <h1
          class="text-light font-bold lg:text-[64px] text-2xl text-center relative z-10"
        >
          {{ $t("nav.gallery") }}
        </h1>
      </div>
    </core-page-title>
    <section class="py-12">
      <UContainer>
        <core-section-loader :loading="pending" />
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6" v-if="!pending">
          <div v-for="project in projects?.data" :key="project.id" data-aos="fade-up">
            <shared-cards-gallery
              :item="project"
              data-fancybox="gallery"
              :href="project.image"
            />
          </div>
        </div>
        <core-pagination :meta="projects?.meta" />
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: `${$t("nav.gallery")}`,
  titleTemplate: `${$t("app.title")} - %s`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
const { $http } = useNuxtApp();
const route = useRoute();
const page = computed(() => route.query.page || 1);
const { data: projects, pending } = await useAsyncData<any>(
  "projects",
  () =>
    $http.shared.projects({
      page: page.value,
    }),
  {
    transform: (data) => ({ data: data.data, meta: data.meta }),
    default: () => [],
    watch: [page],
  },
);
</script>
