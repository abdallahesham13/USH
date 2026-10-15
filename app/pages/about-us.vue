<template>
  <main>
    <core-page-title>
      <div class="flex flex-col items-center gap-6 w-full">
        <h1
          class="text-light font-bold lg:text-[64px] text-2xl text-center relative z-10"
        >
          {{ $t("nav.about_us") }}
        </h1>
      </div>
    </core-page-title>

    <lazy-sections-about-us :aboutUs="aboutUs" v-if="state.activeSiteModels?.abouts" />
    <sections-about-values />
    <sections-location-highlight />
  </main>
</template>

<script setup>
useHead({
  title: `${$t("nav.about_us")}`,
  titleTemplate: `${$t("app.title")} - %s`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
const { state } = useAppStore();
const { $http } = useNuxtApp();

const { data: aboutUs } = useAsyncData(
  "about-us",
  () => $http.shared.aboutUs(),
  {
    transform: (data) => data.data,
    default: () => ({
      image: "",
      title: "",
      description: "",
    }),
  },
);
</script>
