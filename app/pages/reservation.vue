<template>
  <main>
    <core-page-title>
      <div class="flex flex-col items-center gap-6 w-full">
        <h1
          class="text-light font-bold lg:text-[64px] text-2xl text-center relative z-10"
        >
          {{ $t("buttons.book_appointment") }}
        </h1>
      </div>
    </core-page-title>
    <div class=" ">
      <sections-reservation />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ path: "/contact", alias: ["/reservation"] });
useHead({
  title: `${$t("buttons.book_appointment")}`,
  titleTemplate: `${$t("app.title")} - %s`,
  meta: [{ name: "description", content: `${$t("app.description")}` }],
});
</script>
