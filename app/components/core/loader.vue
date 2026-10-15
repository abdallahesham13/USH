<template>
  <Transition name="medical-loader">
    <div
      v-if="loading"
      :class="[fullScreen ? 'fixed inset-0 z-[9999]' : 'absolute inset-0 z-50']"
      class="medical-loader-wrapper flex items-center justify-center overflow-hidden"
    >
      <!-- Background -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <!-- Primary glow -->
        <div
          class="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[var(--color-primary-light)] opacity-30 blur-[130px]"
        />

        <!-- Secondary glow -->
        <div
          class="absolute -bottom-48 -right-40 h-[550px] w-[550px] rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[150px]"
        />

        <!-- Decorative circles -->
        <div
          class="absolute right-[8%] top-[18%] h-28 w-28 rounded-full border border-[var(--color-primary)]/10"
        />

        <div
          class="absolute bottom-[15%] left-[7%] h-40 w-40 rounded-full border border-[var(--color-primary)]/10"
        />

        <div
          class="absolute left-[24%] top-[12%] h-3 w-3 rounded-full bg-[var(--color-primary)]/10"
        />

        <div
          class="absolute bottom-[22%] right-[23%] h-2 w-2 rounded-full bg-[var(--color-primary)]/15"
        />

        <!-- Grid -->
        <div class="medical-pattern absolute inset-0" />
      </div>

      <!-- Main -->
      <div
        class="relative z-10 flex w-full max-w-lg flex-col items-center px-6 text-center"
      >
        <!-- Brand -->
        <div class="mb-10">
          <h2
            class="text-[27px] font-bold tracking-tight text-[var(--color-secondary)] md:text-[32px]"
          >
            {{ title }}
          </h2>

          <p
            class="mt-2 text-sm font-medium text-[var(--color-secondary-gray)]"
          >
            {{ subtitle }}
          </p>
        </div>

        <!-- Loader -->
        <div
          class="relative mb-8 flex h-[120px] w-[120px] items-center justify-center"
        >
          <!-- Glow -->
          <div
            class="absolute h-[88px] w-[88px] rounded-full bg-[var(--color-primary)] opacity-[0.07] blur-xl"
          />

          <!-- Outer spinner -->
          <svg
            class="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <!-- Track -->
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="var(--color-primary-light)"
              stroke-width="3"
              opacity=".35"
            />

            <!-- Spinner -->
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="url(#loaderGradient)"
              stroke-width="4"
              stroke-linecap="round"
              stroke-dasharray="95 175"
              class="loader-circle"
            />

            <defs>
              <linearGradient id="loaderGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="var(--color-primary)" />

                <stop offset="100%" stop-color="var(--color-primary-light)" />
              </linearGradient>
            </defs>
          </svg>

          <!-- ECG -->
          <div
            class="ecg-container relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[var(--color-white)] shadow-[0_12px_40px_rgba(130,44,126,0.12)]"
          >
            <svg
              viewBox="0 0 70 42"
              fill="none"
              class="h-11 w-12 overflow-visible"
            >
              <path
                d="M3 22H16L20 14L26 30L32 7L38 27L43 17L48 22H67"
                stroke="var(--color-primary)"
                stroke-width="3.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ecg-path"
              />
            </svg>
          </div>

          <!-- Pulse -->
          <span
            class="pulse-ring absolute h-[78px] w-[78px] rounded-full border border-[var(--color-primary)]/30"
          />
        </div>

        <!-- Text -->
        <div class="mb-5 flex items-center gap-2">
          <span class="text-sm font-semibold text-[var(--color-dark-gray)]">
            {{ loadingText }}
          </span>

          <div class="flex items-center gap-1">
            <span class="loading-dot" />
            <span class="loading-dot delay-1" />
            <span class="loading-dot delay-2" />
          </div>
        </div>

        <!-- Progress -->
        <div
          class="h-[5px] w-full max-w-[280px] overflow-hidden rounded-full bg-[var(--color-primary-light)]/30"
        >
          <div class="progress-line h-full rounded-full" />
        </div>

        <!-- Small text -->
        <p class="mt-7 text-[12px] font-medium text-[var(--color-gray)]">
          {{ bottomText }}
        </p>
      </div>

      <!-- Bottom Decoration -->
      <div
        class="pointer-events-none absolute bottom-0 left-0 right-0 h-[110px] overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          class="h-full w-full"
        >
          <path
            d="
              M0 100
              C240 155 420 40 680 95
              C930 145 1120 55 1440 100
              V160
              H0Z
            "
            fill="var(--color-primary-light)"
            opacity=".18"
          />

          <path
            d="
              M0 130
              C260 75 470 155 730 110
              C970 65 1210 135 1440 90
              V160
              H0Z
            "
            fill="var(--color-primary)"
            opacity=".06"
          />
        </svg>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean;
  fullScreen?: boolean;
  title?: string;
  subtitle?: string;
  loadingText?: string;
  bottomText?: string;
}

withDefaults(defineProps<Props>(), {
  loading: true,
  fullScreen: false,

  title: "رعاية طبية منزلية في الرياض توصلك لباب بيتك",

  subtitle: "مع مبادر، توصلك رعاية طبية متكاملة في منزلك على مدار الساعة",

  loadingText: "جاري التحميل",

  bottomText: "خدمة متاحة 24/7",
});
</script>

<style scoped>
.medical-loader-wrapper {
  background:
    radial-gradient(
      circle at 50% 40%,
      rgba(216, 190, 215, 0.18),
      transparent 38%
    ),
    linear-gradient(
      135deg,
      var(--color-white) 0%,
      var(--color-light) 50%,
      var(--color-light-gray) 100%
    );
}

/* Background grid */

.medical-pattern {
  opacity: 0.45;

  background-image:
    linear-gradient(rgba(130, 44, 126, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(130, 44, 126, 0.025) 1px, transparent 1px);

  background-size: 48px 48px;

  mask-image: radial-gradient(circle at center, black, transparent 72%);
}

/* Spinner */

.loader-circle {
  transform-origin: center;

  animation: loaderRotate 1.55s linear infinite;

  filter: drop-shadow(0 2px 5px rgba(130, 44, 126, 0.18));
}

@keyframes loaderRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* ECG */

.ecg-container {
  animation: heartPulse 1.8s ease-in-out infinite;
}

@keyframes heartPulse {
  0%,
  100% {
    transform: scale(1);
  }

  15% {
    transform: scale(1.05);
  }

  30% {
    transform: scale(1);
  }

  45% {
    transform: scale(1.035);
  }

  60% {
    transform: scale(1);
  }
}

/* ECG drawing animation */

.ecg-path {
  stroke-dasharray: 110;
  stroke-dashoffset: 110;

  animation: ecgDraw 1.8s ease-in-out infinite;
}

@keyframes ecgDraw {
  0% {
    stroke-dashoffset: 110;
    opacity: 0.15;
  }

  35% {
    opacity: 1;
  }

  70% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: 0;
    opacity: 0.2;
  }
}

/* Pulse ring */

.pulse-ring {
  animation: pulseRing 1.8s ease-out infinite;
}

@keyframes pulseRing {
  0% {
    transform: scale(0.8);
    opacity: 0.65;
  }

  100% {
    transform: scale(1.65);
    opacity: 0;
  }
}

/* Loading dots */

.loading-dot {
  width: 4px;
  height: 4px;

  border-radius: 9999px;

  background: var(--color-primary);

  animation: loadingDot 1.2s ease-in-out infinite;
}

.loading-dot.delay-1 {
  animation-delay: 0.15s;
}

.loading-dot.delay-2 {
  animation-delay: 0.3s;
}

@keyframes loadingDot {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.25;
  }

  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

/* Progress */

.progress-line {
  width: 42%;

  background: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-primary-light)
  );

  box-shadow: 0 0 12px rgba(130, 44, 126, 0.18);

  animation: progressLoading 1.8s ease-in-out infinite;
}

@keyframes progressLoading {
  0% {
    transform: translateX(-140%);
  }

  50% {
    width: 63%;
  }

  100% {
    transform: translateX(275%);
  }
}

/* Page transition */

.medical-loader-enter-active,
.medical-loader-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.medical-loader-enter-from,
.medical-loader-leave-to {
  opacity: 0;
  transform: scale(1.01);
}
</style>
