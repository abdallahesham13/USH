<template>
  <div
    ref="scrollContainer"
    class="overflow-x-auto mb-3 min-h-[50px] scroll-smooth scrollbar-custom pb-2"
  >
    <UTabs
      v-model="active"
      :items="items"
      v-bind="$attrs"
      :content="false"
      :ui="{
        root: 'inline-flex min-w-full gap-8 px-0',
        list: '!px-0 bg-white !rounded-[28px] gap-3 overflow-hidden mb-8',
        indicator: '!rounded-[28px]',
        trigger:
          'px-4 !h-14 flex items-center justify-center !rounded-[28px] cursor-pointer  border border-primary text-secondary  data-[state=active]:text-light data-[state=inactive]:text-secondary',
        label: 'text-base !font-medium',
      }"
      class="overflow-hidden"
    />

    <!-- Content -->
    <div class="overflow-hidden">
      <slot name="content" :item="activeItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
// const active = defineModel<string>("active");
const props = defineProps<{
  items: TabsItem[];
}>();
const active = ref(props.items[0]?.value);

const activeItem = computed(() =>
  props.items.find((item) => item.value === active.value)
);

</script>
<style scoped>
button[data-state="active"] span {
  color: var(--color-light) !important;
}
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
