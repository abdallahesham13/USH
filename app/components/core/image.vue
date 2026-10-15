<template>
  <div ref="container" class="relative w-full h-full overflow-hidden">
    <!-- Loading Skeleton -->
    <transition name="fade">
      <USkeleton v-if="isLoading && !hasError" class="absolute inset-0 w-full h-full" />
    </transition>

    <!-- Error Placeholder -->
    <transition name="fade">
      <div
        v-if="hasError"
        class="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
      >
        <div class="text-center">
          <svg
            class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p class="text-sm text-gray-500 dark:text-gray-400">فشل تحميل الصورة</p>
        </div>
      </div>
    </transition>

    <!-- Actual Image with Intersection Observer -->
    <transition name="fade-blur">
      <img
        v-if="inView"
        :src="src"
        :alt="alt"
        class="w-full h-full object-cover"
        :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading && !hasError }"
        @load="onLoad"
        @error="onError"
        loading="lazy"
        v-bind="$attrs"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string;
  alt?: string;
  loading?: boolean;
  rootMargin?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Image',
  loading: true,
  rootMargin: '50px',
});

const container = ref<HTMLElement | null>(null);
const isLoading = ref(props.loading);
const hasError = ref(false);
const inView = ref(false);

const onLoad = () => {
  isLoading.value = false;
  hasError.value = false;
};

const onError = () => {
  isLoading.value = false;
  hasError.value = true;
};

// Intersection Observer for lazy loading
onMounted(() => {
  if ('IntersectionObserver' in window && container.value) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            inView.value = true;
            observer.disconnect();
          }
        });
      },
      { rootMargin: props.rootMargin }
    );
    observer.observe(container.value);
  } else {
    // Fallback for browsers without IntersectionObserver
    inView.value = true;
  }
});
</script>

<style scoped>
/* Fade transition for skeleton and error */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Fade with blur transition for image */
.fade-blur-enter-active {
  transition: opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease;
}

.fade-blur-enter-from {
  opacity: 0;
  filter: blur(20px);
  transform: scale(0.95);
}

.fade-blur-enter-to {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}
</style>
