<template>
  <section id="branches" class="py-12">
    <UContainer>
      <core-header-section title="branches" subTitle="branches" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="(item, i) in branches?.slice(0, 2)"
          :key="i"
          data-aos="fade-up"
        >
          <shared-cards-branch :item="item" />
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <core-button class="core-button-animation mt-0 mx-auto" to="/branches">
          {{ $t("buttons.show_all", { name: $t("common.branches") }) }}
        </core-button>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  branches?: any;
}>();
</script>
