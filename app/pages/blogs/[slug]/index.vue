<template>
  <main>
    <core-page-title class="!mb-0">
      <div class="flex flex-col items-center gap-4 text-center text-light">
        <h1 class="text-4xl font-semibold lg:text-[40px]">{{ blog?.title || $t('titles.blogs') }}</h1>
        <nav :aria-label="$t('blog_detail.breadcrumb')" class="flex flex-wrap items-center justify-center gap-3 text-sm">
          <NuxtLink to="/blogs" class="hover:underline">{{ $t('titles.blogs') }}</NuxtLink>
          <UIcon :name="locale === 'ar' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right'" class="size-4" aria-hidden="true" />
          <span v-if="blog?.title" aria-current="page" class="font-semibold">{{ blog.title }}</span>
        </nav>
      </div>
    </core-page-title>

    <section class="bg-[#faf9f5] px-4 py-12 text-[#313131] sm:px-8 lg:px-[6.944vw] lg:py-[6.944vw]" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
      <div class="mx-auto w-full max-w-[1240px]">
        <core-section-loader v-if="pending" :loading="true" />

        <div v-else-if="error || !blog" role="alert" class="text-center">
          <p>{{ $t('blog_detail.error') }}</p>
          <NuxtLink to="/blogs" class="mt-4 inline-block text-[var(--color-primary)] underline">{{ $t('blog_detail.back') }}</NuxtLink>
        </div>

        <article v-else class="flex w-full flex-col gap-8">
          <img
            :src="blog.avatar || blog.image"
            :alt="blog.title || ''"
            width="1448"
            height="1086"
            class="h-[260px] w-full rounded-3xl object-cover object-center sm:h-[360px] lg:h-[475px]"
          />

          <div class="article-copy w-full text-start">
            <h2 class="article-title">{{ blog.title }}</h2>
            <div class="article-body" v-html="blog.long_description" />
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { $http } = useNuxtApp();
const { locale, t } = useI18n();
const route = useRoute();
definePageMeta({
  middleware: [(to) => {
    if (['null', 'undefined'].includes(String(to.params.slug))) {
      return navigateTo('/blogs', { replace: true });
    }
  }],
});
const { data: blog, pending, error } = await useAsyncData(
  () => `blog-${locale.value}-${route.params.slug}`,
  () => $http.shared.blog(String(route.params.slug)),
  { transform: (response) => response.data, server: false },
);
useHead(() => ({
  title: blog.value?.title ? `${blog.value.title} - ${t('titles.blogs')}` : t('titles.blogs'),
  titleTemplate: `%s - ${t('app.title')}`,
  meta: [{ name: 'description', content: blog.value?.short_description || t('app.description') }],
}));
</script>

<style scoped>
.article-copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-wrap: anywhere;
}

.article-title,
.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  margin: 0 0 16px;
  color: #313131;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: -0.15px;
}

.article-body {
  color: #737373;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.18px;
}

.article-body :deep(p) { margin: 0 0 32px; }
.article-body :deep(p:last-child) { margin-bottom: 0; }
.article-body :deep(img) { max-width: 100%; height: auto; border-radius: 24px; }
.article-body :deep(a) { color: var(--color-primary); text-decoration: underline; }
.article-body :deep(ul) { list-style: disc; padding-inline-start: 24px; margin-bottom: 32px; }
.article-body :deep(ol) { list-style: decimal; padding-inline-start: 24px; margin-bottom: 32px; }

@media (max-width: 639px) {
  .article-title,
  .article-body :deep(h1),
  .article-body :deep(h2),
  .article-body :deep(h3),
  .article-body :deep(h4) {
    font-size: 21px;
    line-height: 28px;
  }
}
</style>
