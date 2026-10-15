<template>
  <UFooter class="mt-3" v-if="meta?.last_page > 1">
    <UPagination
      show-edges
      @update:page="updatePage"
      v-model:page="page"
      :items-per-page="meta?.per_page"
      :total="meta?.total"
      :max="15"
    />
  </UFooter>
</template>

<script setup lang="ts">
import type { IMeta } from '~/types';

const props = defineProps<{ meta?: IMeta; queryKey?: string }>();
const route = useRoute();
const router = useRouter();

const key = computed(() => props.queryKey || 'page');

const page = ref<number>(Number(route.query[key.value]) || 1);

// Keep page in sync when the URL changes externally (e.g. tab switch clears query)
watch(
  () => route.query[key.value],
  (val) => {
    page.value = Number(val) || 1;
  }
);

const updatePage = (newPage: number) => {
  router.replace({ query: { ...route.query, [key.value]: newPage } });
};
</script>
