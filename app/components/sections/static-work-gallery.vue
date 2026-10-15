<template>
  <section class="bg-white px-4 py-16 sm:px-8 lg:px-[6.944vw] lg:py-16" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-10 lg:gap-14">
      <header class="flex w-full flex-col items-center gap-3 text-center lg:gap-5">
        <p class="m-0 font-['The_Year_of_Handicrafts',sans-serif] text-base font-medium leading-6 text-[var(--color-primary)] lg:text-xl">
          {{ $t('static_gallery.label') }}
        </p>
        <h2 class="m-0 font-['The_Year_of_Handicrafts',sans-serif] text-[30px] font-bold leading-[1.35] tracking-[-0.3px] text-[#313131] sm:text-4xl lg:text-[40px] lg:leading-[48px]">
          {{ $t('static_gallery.title') }}
        </h2>
      </header>

      <div class="gallery-layout w-full" dir="ltr">
        <div class="gallery-left">
          <figure class="gallery-tile gallery-wide">
            <img src="/imgs/work-gallery/hair-wide.png" alt="" width="1536" height="1024" loading="lazy" class="object-[50%_30%]" />
          </figure>
          <div class="gallery-left-bottom">
            <div class="gallery-stack">
              <figure class="gallery-tile"><img src="/imgs/work-gallery/lashes.png" alt="" width="1024" height="1024" loading="lazy" /></figure>
              <figure class="gallery-tile"><img src="/imgs/work-gallery/massage.png" alt="" width="1024" height="1024" loading="lazy" /></figure>
            </div>
            <div class="gallery-stack">
              <figure class="gallery-tile"><img src="/imgs/work-gallery/makeup.png" alt="" width="1024" height="1024" loading="lazy" /></figure>
              <figure class="gallery-tile"><img src="/imgs/work-gallery/lips.png" alt="" width="1024" height="1024" loading="lazy" /></figure>
            </div>
          </div>
        </div>

        <div class="gallery-right">
          <figure class="gallery-tile gallery-portrait"><img src="/imgs/work-gallery/portrait.png" alt="" width="1024" height="1024" loading="lazy" class="object-[center_28%]" /></figure>
          <figure class="gallery-tile gallery-nails"><img src="/imgs/work-gallery/nails.png" alt="" width="1024" height="1024" loading="lazy" /></figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n();
</script>

<style scoped>
.gallery-layout {
  display: flex;
  gap: 24px;
}

.gallery-left {
  display: flex;
  min-width: 0;
  flex: 777 1 0;
  flex-direction: column;
  gap: 24px;
}

.gallery-right {
  display: flex;
  min-width: 0;
  flex: 437 1 0;
  flex-direction: column;
  gap: 24px;
}

.gallery-left-bottom {
  display: flex;
  gap: 21px;
}

.gallery-stack {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 24px;
}

.gallery-tile {
  position: relative;
  margin: 0;
  height: 190px;
  overflow: hidden;
  border-radius: 24px;
  background: #d9d9d9;
}

.gallery-wide {
  height: 247px;
}

.gallery-portrait {
  height: 249px;
}

.gallery-nails {
  height: 404px;
}

.gallery-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: scale 900ms cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-tile:hover img {
  scale: 1.035;
}

@media (max-width: 767px) {
  .gallery-layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .gallery-left,
  .gallery-right,
  .gallery-left-bottom,
  .gallery-stack {
    display: contents;
  }

  .gallery-tile,
  .gallery-wide,
  .gallery-portrait,
  .gallery-nails {
    height: auto;
    aspect-ratio: 1 / 1;
    border-radius: 16px;
  }

  .gallery-wide {
    grid-column: 1 / -1;
    aspect-ratio: 16 / 8;
  }

  .gallery-nails {
    grid-row: span 2;
    aspect-ratio: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-tile img {
    transition: none;
  }
}
</style>

