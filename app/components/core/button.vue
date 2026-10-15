<template>
  <UButton class="core-button" :class="btnClass" v-bind="$attrs">
    <slot />
  </UButton>
</template>

<script setup lang="ts">
defineProps<{
  btnClass?: string;
}>();
</script>

<style>
.core-button {
  min-width: 180px;
  border: 1px solid transparent;
  font-size: 18px;
  color: var(--color-light);
  transition: all 0.3s ease-in-out;
  padding: 0px 20px;
  background-color: transparent;
  position: relative;
  isolation: isolate;
  height: 55px;
  font-family: "The Year of Handicrafts", sans-serif;
}

.core-button.core-button-animation::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--color-primary);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: -1;
  transform: translateX(0);
  border-radius: 30px;
  isolation: auto;
}
.core-button.core-button-animation:hover::after {
  transform: translateX(100%);
}
.core-button.core-button-animation:hover img {
  filter: var(--primary-filter) !important;
  animation: move-arrow 1.5s infinite ease-in-out;
}
.core-button.core-button-animation:hover{
  border-color: var(--color-primary) !important;
}

.core-button.core-button-animation-light {
  border: 1px solid transparent;
  color: var(--color-primary);
}
.core-button.core-button-animation-light::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--color-light);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: -1;
  transform: translateX(0);
  border-radius: 30px;
  isolation: auto;
}
.core-button.core-button-animation-light:hover {
  color: var(--color-light);
  border-color: var(--color-light) !important;
}
.core-button.core-button-animation-light:hover::after {
  transform: translateX(100%);
}
.core-button.core-button-animation-light:hover img {
  filter: var(--light-filter) !important;
  animation: move-arrow 1.5s infinite ease-in-out;
}

.core-button.core-button-animation-light-reverse {
  border: 1px solid var(--color-light);
  color: var(--color-light);
}
.core-button.core-button-animation-light-reverse::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--color-light);
  transition: transform 0.3s ease;
  z-index: -1;
  transform: translateX(100%);
  border-radius: 30px;
  isolation: auto;
}
.core-button.core-button-animation-light-reverse:hover {
  color: var(--color-primary);
  border-color: transparent !important;
}
.core-button.core-button-animation-light-reverse:hover::after {
  transform: translateX(0);
}
.core-button.core-button-animation-light-reverse:hover img {
  filter: var(--light-filter) !important;
  animation: move-arrow 1.5s infinite ease-in-out;
}

@keyframes move-arrow {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2.5px);
  }
  100% {
    transform: translateX(0);
  }
}
.core-button.btn-outline {
}
.core-button.btn-outline {
  min-width: 180px;
  width: auto;
  border: 1px solid var(--color-light);
  color: var(--color-light);
  background-color: transparent;
}

.core-button.btn-outline::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--color-primary);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: -1;
  transform: translateX(-100%);
  border-radius: 30px;
  isolation: auto;
}
.core-button.btn-outline:hover::after {
  transform: translateX(0);
}
.core-button.btn-outline:hover {
  border-color: var(--color-primary) !important;
  color: var(--color-light) !important;
}
.core-button::before {
  display: none !important;
}
.core-button:hover {
  background-color: transparent;
  color: var(--color-primary);
}
.core-button.btn-link {
  background-color: transparent;
  color: var(--color-light);
  border: none;
  box-shadow: none !important;
  padding: 0px;
  min-width: auto;
  max-width: auto;
  width: auto;
  text-decoration: underline;
  font-size: 18px;
  font-weight: 200;
  color: var(--color-primary);
}
.core-button.btn-link:hover {
  background-color: transparent;
  color: var(--color-secondary);
}
.custom-navbar.navbar-scrolling .core-button.btn-link {
  color: var(--color-secondary);
}
.custom-navbar.navbar-scrolling .core-button.btn-link:hover {
  color: var(--color-primary);
}
.core-button.btn-link:hover .icon-image,
.fake-btn:hover img {
  filter: var(--primary-filter) !important;
  animation: move-arrow 1.5s infinite ease-in-out;
}
@keyframes move-arrow {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
