<template>
  <h2 class="title-with-icon text-primary font-normal text-base" v-bind="$attrs">
    <slot />
  </h2>
</template>

<script setup lang="ts">

</script>
<style scoped>
.title-with-icon{
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}
.title-with-icon::before,.title-with-icon::after{
  content: ""; 
  width: 11px;
  height: 14px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
.title-with-icon::before{
  background-image: url("/imgs/logo/logo-arrow-right.svg");
}
.title-with-icon::after{
  background-image: url("/imgs/logo/logo-arrow-left.svg");
}
</style>