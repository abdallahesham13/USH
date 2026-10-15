<template>
  <div class="header-section mb-14">
    <div v-if="subTitle" data-aos="zoom-out">
      <div class="flex justify-center flex-col items-center gap-6  text-center">
        <core-sub-title class="text-center">
          {{ $t(`sub_titles.${title}`) }}
        </core-sub-title>
        <h5
          class="text-secondary font-bold lg:text-[40px] text-2xl"
        >
          {{ $t(`titles.${subTitle}`) }}
        </h5>
      </div>
    </div>
    <div v-else>
      <core-sub-title class="text-center mb-6" data-aos="zoom-out">{{
        $t(`sub_titles.${title}`)
      }}</core-sub-title>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  subTitle?: string;
  buttonText?: string;
  to?: string;
}>();
</script>
