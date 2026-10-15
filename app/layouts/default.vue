<template>
  <div class="app-page-content">
    <ui-navbar v-if="$route.path !== '/'" />
    <div class="slot-content">
      <slot />
    </div>
    <lazy-sections-reservation
      v-if="!['/reservation', '/contact'].includes($route.path)"
      :class="{ '!bg-white': ['/services', '/products'].includes($route.path) || $route.path.startsWith('/blogs') }"
    />
    <ui-footer />
  </div>
</template>
