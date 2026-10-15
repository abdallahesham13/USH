<template>
  <section id="why-vilon" class="px-4 py-12 sm:px-6 lg:px-11">
    <div class="relative isolate mx-auto max-w-[1352px] overflow-hidden rounded-[34px] bg-surface text-secondary">
      <div aria-hidden="true" class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden lg:w-[51.77%]">
        <img
          src="/imgs/about/consultation-process.png"
          alt=""
          width="734"
          height="955"
          loading="lazy"
          class="absolute -top-[10.28%] -left-[5%] h-[110.28%] w-[105%] max-w-none -scale-x-100 object-cover"
        />
        <div class="absolute inset-0 bg-secondary/[.32]"></div>
        <div class="absolute inset-0 bg-surface/70 lg:hidden"></div>
      </div>

      <div class="px-5 py-10 sm:px-8 sm:py-14 lg:px-[4.73%] lg:py-[120px]">
        <div class="me-auto flex flex-col gap-8 lg:w-[78.68%] lg:gap-14">
          <h2 class="py-2 text-start font-bold text-3xl leading-snug lg:text-[40px] lg:leading-[56px]">
            {{ $t('consultation_process.title') }}
          </h2>

          <ol class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li
              v-for="(step, index) in steps"
              :key="step"
              class="flex min-w-0 flex-col gap-6 rounded-2xl border border-light/50 bg-light/[.16] p-6 text-start backdrop-blur-[24px] transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[10px] motion-reduce:translate-none motion-reduce:transition-none lg:min-h-[232px] lg:px-9 lg:py-12"
            >
              <h3 class="flex items-center gap-[13px] font-medium text-2xl leading-7">
                <span dir="ltr">{{ String(index + 1).padStart(2, '0') }}</span>
                <span>{{ $t(`consultation_process.steps.${step}.title`) }}</span>
              </h3>
              <p class="font-normal text-lg leading-7 lg:text-xl">
                {{ $t(`consultation_process.steps.${step}.description`) }}
              </p>
            </li>
            <li class="flex items-center justify-center py-3 sm:py-0">
              <button
                type="button"
                class="flex size-[180px] cursor-pointer shrink-0 flex-col items-center justify-center gap-4 rounded-full border border-light p-1.5 text-light transition-colors hover:bg-light/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light"
                @click="handleReservation"
              >
                <span class="w-[140px] text-center font-bold text-base leading-6">{{ $t('consultation_process.book') }}</span>
                <img src="/imgs/about/consultation-arrow.svg" alt="" width="39" height="24" class="h-6 w-[39px] object-contain ltr:rotate-180" />
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = ['consultation', 'assessment', 'options', 'plan', 'follow_up'] as const;
</script>
