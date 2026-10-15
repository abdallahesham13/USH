<template>
  <main>
    <core-page-title> {{ customPage?.title }} </core-page-title>
    <section class="bg-light lg:py-[88px] py-10">
      <UContainer>
        <core-section-loader :loading="pending" />
        <div v-if="!pending">
          <core-lazy-image
            :src="customPage?.image"
            :alt="customPage?.title"
            class="w-full lg:!h-[500px] !h-[300px] !object-contain !object-center rounded-[24px]"
          />
          <div class="py-4">
            <div
              class="flex lg:items-center justify-between flex-col lg:flex-row gap-4 mb-10"
            >
              <h2 class="lg:text-2xl text-xl font-medium text-secondary">
                {{ customPage?.title }}
              </h2>
            </div>
            <div
              class="text-gray-500 editor-content"
              v-html="customPage?.description"
            ></div>
          </div>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
const { $http } = useNuxtApp();
const route = useRoute();
const { data: customPage, pending } = await useAsyncData(
  "customPage",
  () => $http.shared.customPage(route.params.slug as string),
  {
    transform: (data): any => data.data,
    default: (): any => ({
      id: 0,
      image: "",
      description: "",
      title: "",
    }),
    server: false,

  }
);
useHead({
  title: `${customPage.value?.title as any}`,
  titleTemplate: `%s - ${$t("app.title")}`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
</script>
