<template>
  <main>
    <core-page-title>
      <div class="flex flex-col items-center gap-6 w-full">
        <h1
          class="text-light font-bold lg:text-[64px] text-2xl text-center relative z-10"
        >
          {{ $t("nav.branches") }}
        </h1>
      </div>
    </core-page-title>

    <section class="py-12">
      <UContainer>
        <core-section-loader :loading="pending" />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" v-if="!pending">
          <div
            v-for="(item, i) in branches?.data"
            :key="i"
            data-aos="fade-up"
          >
            <shared-cards-branch :item="item" />
          </div>
        </div>
        <core-pagination :meta="branches?.meta" />
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: `${$t("nav.branches")}`,
  titleTemplate: `${$t("app.title")} - %s`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
const { $http } = useNuxtApp();
const route = useRoute();
const page = computed(() => route.query.page || 1);
const { data: branches, pending } = await useAsyncData<any>(
  "branches",
  () =>
    $http.shared.branches({
      page: page.value,
    }),
  {
    transform: (data) => ({ data: data.data, meta: data.meta }),
    default: () => [],
    watch: [page],
  },
);
</script>
