<template>
  <UButton
    target="_blank"
    :href="`https://wa.me/${state.contactInfo?.whatsApp_link}`"
    variant="outline"
    color="primary"
    class="font-semibold order-first lg:order-last w-full lg:w-[200px]"
  >
    <!-- <img src="/imgs/icons/whatsapp.svg" alt="whatsapp" class="w-6 h-6" /> -->
    <span> تواصل واتس أب </span>
  </UButton>
</template>

<script setup lang="ts">
const { state } = useAppStore();
</script>
