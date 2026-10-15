<template>
  <footer class="footer-content relative bg-white px-4 pb-10 pt-20 text-secondary sm:px-8 lg:px-[6.944vw]" dir="rtl">
    <div class="mx-auto w-full max-w-[1240px]">
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(360px,1fr)_180px_261px] lg:justify-between lg:gap-20">
        <section class="flex flex-col items-start gap-4 text-right">
          <core-lazy-image :src="state.settings?.image" alt="logo" class="footer-brand-logo !h-[52px] !w-[132px] object-contain" />
          <div class="editor-content max-w-[438px] text-base font-medium leading-6 text-[#757575]" v-html="state.settings?.footer"></div>
          <core-social :links="socialLinks" class="mt-1 justify-end [--light-filter:brightness(0)_invert(1)]" />
          <ul v-if="customPages.length" class="flex flex-wrap justify-end gap-4 text-hm text-[#757575]">
            <li v-for="item in customPages" :key="item.id"><nuxt-link :to="`/custom-pages/${item.slug}`" class="transition-colors hover:text-primary">{{ item.title }}</nuxt-link></li>
          </ul>
        </section>

        <section class="text-right">
          <h3 class="mb-4 text-xl font-semibold text-[#020115]">أقسام الموقع</h3>
          <ul class="flex flex-col items-start gap-4 text-base font-medium text-[#757575]">
            <li v-for="item in navItems" :key="item.value" v-show="item.active"><nuxt-link :to="item.value" class="transition-colors hover:text-primary">{{ item.label }}</nuxt-link></li>
          </ul>
        </section>

        <section class="text-right">
          <h3 class="mb-4 text-xl font-semibold text-[#020115]">التواصل</h3>
          <ul class="contact-links flex flex-col items-start gap-4 text-[#757575]">
            <li><NuxtLink class="flex items-center gap-4" :href="`tel:0${state.contactInfo?.unified_number}`" external target="_blank"><span class="link-icon"><img src="/imgs/contact/dark-phone.svg" alt=""></span><span dir="ltr">0{{ state.contactInfo?.unified_number }}</span></NuxtLink></li>
            <li><NuxtLink class="flex items-center gap-4" :to="`mailto:${state.contactInfo?.email}`" external target="_blank"><span class="link-icon"><img src="/imgs/contact/dark-email.svg" alt=""></span><span dir="ltr">{{ state.contactInfo?.email }}</span></NuxtLink></li>
            <li><NuxtLink class="flex items-center gap-4" :to="state.contactInfo?.location_link" external target="_blank"><span class="link-icon filled"><img src="/imgs/contact/dark-location.svg" alt=""></span><span>{{ state.contactInfo?.address_ar }}</span></NuxtLink></li>
          </ul>
        </section>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#d9d9d9] pt-4 text-sm font-medium text-[#757575] sm:flex-row" dir="ltr">
        <div class="flex items-center gap-2" dir="rtl"><span>صُنع في كيان</span><lazy-core-lazy-image src="/imgs/logo/cayan_logo.svg" placeholder-src="/imgs/logo/cayan_logo.svg" alt="Cayan" class="w-[80px]" /></div>
        <div dir="rtl">{{ $t("titles.all_rights_reserved") }} {{ $t("app.title") }} © {{ new Date().getFullYear() }}</div>
      </div>

      <div class="footer-actions fixed bottom-3 left-3 z-50 flex flex-col gap-3">
        <UButton v-if="state.contactInfo?.whatsApp_link" :href="`https://wa.me/${state.contactInfo?.whatsApp_link}`" target="_blank" class="whatsapp_btn action-button bg-[#4caf50] shadow-[0_10px_12.5px_rgba(76,175,80,.3)]" @click="handleSourceClicks('whatsapp')"><UIcon name="i-simple-icons-whatsapp" size="24" /></UButton>
        <UButton v-if="state.contactInfo?.unified_number" :href="`tel:0${state.contactInfo?.unified_number}`" class="call_btn action-button bg-[var(--color-primary)] shadow-lg" @click="handleSourceClicks('call')"><UIcon name="i-heroicons-phone" size="24" /></UButton>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useNavItems } from "../navbar/useNavItems";

const { state } = useAppStore();
const { items: navItems } = useNavItems();
const { $http } = useNuxtApp();
const route = useRoute();

const { data: customPages, pending } = await useAsyncData(
  "customPages",
  () => $http.shared.customPages(),
  {
    transform: (data) => data.data,
    default: () => [],
  },
);

// Define the order and special icon mappings
const socialPlatforms = [
  { key: "linkedIn_link", iconName: "linkedin" },
  { key: "youtube_link", iconName: "youtube" },
  { key: "x_link", iconName: "x" }, // Twitter uses 'x' icon
  { key: "snapchat_link", iconName: "snapchat" },
  { key: "instagram_link", iconName: "instagram" },
  { key: "facebook_link", iconName: "facebook" },
  { key: "tiktok_link", iconName: "tiktok" },
  { key: "telegram_link", iconName: "telegram" },
  { key: "discord_link", iconName: "discord" },
  { key: "reddit_link", iconName: "reddit" },
  { key: "pinterest_link", iconName: "pinterest" },
  { key: "threads_link", iconName: "threads" },
  { key: "quora_link", iconName: "quora" },
];

// Dynamically create social links array
const socialLinks = computed(() => {
  if (!state.value.contactInfo) return [];

  return socialPlatforms
    .filter((platform) => {
      const link =
        state.value.contactInfo?.[
          platform.key as keyof typeof state.value.contactInfo
        ];
      return link && link !== null;
    })
    .map((platform) => {
      const link =
        state.value.contactInfo?.[
          platform.key as keyof typeof state.value.contactInfo
        ];
      return {
        name: platform.iconName,
        link: link as string,
        icon: `${platform.iconName}.svg`,
      };
    });
});
const handleSourceClicks = async (type: string) => {
  try {
    await $http.shared.handleSourceClick({
      identifier: route.query["_source"] || "website",
      type: type,
    });
  } catch (e) {
    console.error("tracking failed");
  }
};
</script>

<style>
.footer-content{position:relative;isolation:isolate}.footer-content .editor-content p{margin:0}.footer-content .social-media-links{gap:24px;justify-content:flex-start}.footer-content .contact-links .link-icon{display:flex;width:50px;height:50px;flex:none;align-items:center;justify-content:center;border:1px solid var(--color-primary);border-radius:50%}.footer-content .contact-links .link-icon.filled{background:var(--color-primary)}.footer-content .contact-links .link-icon img{width:24px;height:24px;filter:var(--primary-filter)!important}.footer-content .contact-links .filled img{filter:brightness(0) invert(1)!important}.footer-content .action-button{display:flex;width:50px;height:50px;align-items:center;justify-content:center;border-radius:50%;color:#fff;transition:transform .3s ease}.footer-content .action-button:hover{transform:translateY(-3px)}.footer-content img.footer-brand-logo,.footer-content .footer-brand-logo img,.footer-content .footer-brand-logo picture img{filter:var(--primary-filter)!important}.footer-content .action-button svg{color:#fff!important;fill:currentColor;stroke:currentColor;transition:transform .3s ease}.footer-content .action-button:hover svg{transform:scale(1.08)}.footer-content .social-media-links .social-link{border-color:var(--color-primary)!important;transition:background-color .3s ease,border-color .3s ease,transform .3s ease!important}.footer-content .social-media-links .social-link::after{background-color:var(--color-primary)!important}.footer-content .social-media-links .social-link img,.footer-content .contact-links .link-icon img{filter:var(--primary-filter)!important;transition:filter .3s ease,transform .3s ease!important}.footer-content .social-media-links .social-link:hover img,.footer-content .social-media-links .social-link:focus-visible img,.footer-content .contact-links a:hover .link-icon img,.footer-content .contact-links a:focus-visible .link-icon img{filter:brightness(0) invert(1)!important}.footer-content .contact-links .link-icon{border-color:var(--color-primary)!important;transition:background-color .3s ease,border-color .3s ease,transform .3s ease}.footer-content .contact-links a:hover .link-icon,.footer-content .contact-links a:focus-visible .link-icon{background:var(--color-primary);transform:translateY(-2px)}.footer-content .contact-links a:hover,.footer-content .contact-links a:focus-visible{color:var(--color-primary)}.footer-content .contact-links .filled{background:var(--color-primary)}.footer-content .contact-links .filled img{filter:brightness(0) invert(1)!important}@media(max-width:1023px){.footer-content .social-media-links{flex-wrap:wrap;gap:16px}}
</style>











