<template>
  <section id="faqs" class="py-12 lg:py-20" :dir="faqDirection">
    <UContainer class="!max-w-[1440px] !px-4 sm:!px-6 lg:!px-[88px]">
      <h2 class="mb-12 text-start text-3xl font-bold leading-tight text-secondary sm:text-4xl lg:mb-16 lg:text-[40px] lg:leading-[1.4]">
        {{ $t("nav.faqs") }}
      </h2>

      <div class="faq-list" data-aos="fade-up">
        <div
          v-for="(item, index) in visibleFaqs"
          :key="item.id ?? index"
          class="faq-item border-t border-primary/40 last:border-b"
        >
          <button
            type="button"
            class="faq-trigger relative flex min-h-[104px] w-full cursor-pointer items-center gap-6 py-6 pe-0 ps-12 text-start text-secondary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:min-h-[104px] lg:py-7"
            :aria-expanded="activeIndex === index"
            :aria-controls="`faq-answer-${item.id ?? index}`"
            @click="toggleFaq(index)"
          >
            <span class="faq-plus absolute left-0 top-1/2 size-5 -translate-y-1/2" aria-hidden="true">
              <span class="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-secondary"></span>
              <span
                class="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-secondary transition-transform duration-300 ease-out"
                :class="activeIndex === index ? 'scale-y-0' : 'scale-y-100'"
              ></span>
            </span>
            <span class="w-full text-xl font-medium leading-8 sm:text-2xl lg:text-[24px] lg:leading-9">
              {{ item.question }}
            </span>
          </button>

          <Transition name="faq-expand">
            <div
              v-if="activeIndex === index"
              :id="`faq-answer-${item.id ?? index}`"
              class="faq-answer overflow-hidden pb-7 pe-11 text-start text-base leading-8 text-secondary-gray sm:text-lg lg:text-xl"
              v-html="item.answer"
            ></div>
          </Transition>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { IFaq } from '~/types';

const props = defineProps<{ faqs?: IFaq[] }>();
const { locale } = useI18n();
const activeIndex = ref(0);
const visibleFaqs = computed(() => props.faqs?.slice(0, 6) ?? []);
const faqDirection = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'));

function toggleFaq(index: number) {
  activeIndex.value = activeIndex.value === index ? -1 : index;
}
</script>

<style scoped>
.faq-expand-enter-active,
.faq-expand-leave-active {
  max-height: 320px;
  opacity: 1;
  transform: translateY(0);
  transition: max-height 350ms ease, opacity 250ms ease, transform 350ms ease;
}

.faq-expand-enter-from,
.faq-expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
