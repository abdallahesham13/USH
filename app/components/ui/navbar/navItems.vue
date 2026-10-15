<template>
  <ul class="flex items-center gap-3" v-bind="$attrs">
    <li
      v-for="item in navItems"
      :key="item.value"
      class="relative py-2"
      v-show="item.active"
    >
    <!-- :to="{ path: item.value, query: { ...$route.query } }" -->
      <nuxt-link
        :to="item.value"
        :class="['router-link font-light text-secondary-gray text-lg flex items-center min-w-fit text-gray', item.class]"
      >
        <span>{{ item.label }}</span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useNavItems } from "./useNavItems";
const { items: navItems } = useNavItems();
</script>
<style scoped>
.router-link {
  transition: all 0.3s ease-in-out;
  position: relative;
  display: flex;
  gap: 8px;
}
/* li:first-child .router-link {
  padding-inline-start: 0;
}
li:first-child .router-link::before {
  display: none;
} */
.router-link::before {
}

.router-link.router-link-active {
  font-family: "The Year of Handicrafts", sans-serif;
}
.router-link.router-link-active,
.router-link:hover {
  color: var(--color-primary);
}

.router-link::before,
.router-link::after {
  content: "";
  width: 11px;
  height: 14px;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: all 0.3s ease-in-out;

}
.router-link::before {
  background-image: url("/imgs/logo/logo-arrow-right.svg");
}
.router-link::after {
  background-image: url("/imgs/logo/logo-arrow-left.svg");
}
.router-link.router-link-active::before,
.router-link.router-link-active::after {
  opacity: 1;
}
.furniture-link {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
}
</style>
