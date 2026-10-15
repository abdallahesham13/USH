<template>
  <article class="group relative flex h-full min-w-0 flex-col items-center gap-4 text-center">
    <NuxtLink
      :to="`/services/${item.id}`"
      class="relative block aspect-[4/3] w-full overflow-hidden rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
      :aria-label="item.name"
    >
      <img
        :src="item.image"
        :alt="item.name"
        width="1448"
        height="1086"
        loading="lazy"
        class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
      />
      <span
        v-if="categoryName"
        class="absolute end-4 top-4 rounded-full bg-[var(--color-primary)] px-4 py-2 font-['The_Year_of_Handicrafts',sans-serif] text-sm font-medium leading-[22px] text-white sm:text-base"
      >
        {{ categoryName }}
      </span>
    </NuxtLink>

    <div class="flex w-full flex-1 flex-col items-center gap-3 px-2 lg:gap-4">
      <h3 class="m-0 line-clamp-1 w-full font-['The_Year_of_Handicrafts',sans-serif] text-xl font-bold leading-[30px] tracking-[-0.15px] text-[#313131] lg:text-2xl">
        {{ item.name }}
      </h3>
      <p class="m-0 line-clamp-2 min-h-14 w-full max-w-[326px] font-['The_Year_of_Handicrafts',sans-serif] text-base leading-7 text-[#757575] lg:text-lg">
        {{ stripHtml(item.description || '') }}
      </p>
    </div>

    <NuxtLink
      :to="`/services/${item.id}`"
      class="flex h-[50px] w-full items-center justify-center rounded-full border border-[#d7c79f] bg-[#f6f2e7] px-4 py-2 font-['The_Year_of_Handicrafts',sans-serif] text-base font-medium leading-7 text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)] hover:bg-[#eee5cd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] lg:text-lg"
    >
      {{ $t('buttons.service_details') }}
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { IService } from '~/types';

const props = withDefaults(defineProps<{ item: IService; index?: number }>(), { index: 0 });

const categoryName = computed(() => {
  const category = props.item.category;

  if (typeof category === 'string') return category;
  return category?.name || props.item.category_name || '';
});
</script>

