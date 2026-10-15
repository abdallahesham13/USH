<template>
  <main>
    <!-- v-if="pending || status === 'idle' || status === 'pending'" -->
    <!-- <core-loader v-if="pending || !state.activeSiteModels" /> -->
    <core-section-loader :loading="pending || !state.activeSiteModels" fullScreen />
    <div>
      <sections-hero-section :heroSection="home?.hero_section" />
      <sections-home-highlights />
      <lazy-sections-about-us :aboutUs="home?.abouts" />
      <lazy-sections-services :services="home?.services" />
      <sections-location-highlight />
      <lazy-sections-gallery :gallery="projects?.data" />
      <sections-testimonials :testimonials="home?.testimonials" />
    </div>
  </main>
</template>

<script setup lang="ts">
const { state } = useAppStore();
const { $http } = useNuxtApp();

const { data: projects } = useAsyncData(
  "home-projects",
  () => $http.shared.projects({ per_page: 7 }),
  { default: () => ({ data: [] }) as any, server: false },
);

const {
  data: home,
  status,
  error,
  pending,
} = useAsyncData("home", () => $http.shared.home(), {
  default: () => ({}) as any,
  server: false,
  lazy: false,
});
</script>


