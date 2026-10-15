<template>
  <article class="group relative flex h-full min-w-0 flex-col items-center gap-4 text-center">
    <NuxtLink
      :to="blogLink"
      class="relative block aspect-[4/3] w-full overflow-hidden rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
      :aria-label="item.title || ''"
    >
      <img
        :src="item.avatar || item.image"
        :alt="item.title || ''"
        width="1448"
        height="1086"
        loading="lazy"
        class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
      />
    </NuxtLink>

    <div class="flex w-full flex-1 flex-col items-center gap-3 px-2 lg:gap-4">
      <h3 class="m-0 line-clamp-1 w-full text-xl font-bold leading-[30px] tracking-[-0.15px] text-[#313131] lg:text-2xl">
        {{ item.title }}
      </h3>
      <p class="m-0 line-clamp-2 min-h-14 w-full max-w-[326px] text-base leading-7 text-[#757575] lg:text-lg">
        {{ stripHtml(item.short_description || '') }}
      </p>
    </div>

    <NuxtLink
      :to="blogLink"
      class="flex h-[50px] w-full items-center justify-center rounded-full border border-[#d7c79f] bg-[#f6f2e7] px-4 py-2 text-base font-medium leading-7 text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)] hover:bg-[#eee5cd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] lg:text-lg"
    >
      {{ $t('buttons.blog_details') }}
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { IBlog } from '~/types';

const props = defineProps<{ item: IBlog; featured?: boolean }>();
const blogLink = computed(() => {
  const slug = props.item.slug?.trim();
  return `/blogs/${encodeURIComponent(slug && slug !== 'null' && slug !== 'undefined' ? slug : String(props.item.id))}`;
});
</script>
