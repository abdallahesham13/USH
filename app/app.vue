<template>
  <UApp :locale="appLocale" :toaster="toaster" class="overflow-x-hidden">
    <NuxtLayout>
      <NuxtLoadingIndicator color="#73AB35" />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// import * as locales from "@nuxt/ui/locale";
// import type { IActiveSiteModels, IContact, ISetting } from "./types";
// const { $http } = useNuxtApp();
// const { locale } = useI18n();
// const { t } = useI18n();
// const appLocale = computed(() => locales[locale.value as keyof typeof locales]);
// const lang = computed(() => appLocale.value?.code);
// const dir = computed(() => appLocale.value?.dir);
// const toaster = { position: "top-right" as const };
// const { state } = useAppStore();
// const gtmId = computed(() => state.value?.marketingTools?.gtm);

import * as locales from "@nuxt/ui/locale";
import type { IActiveSiteModels, IContact, ISetting } from "./types";
const { $http } = useNuxtApp();
const { locale } = useI18n();
const { t } = useI18n();
const appLocale = computed(() => locales[locale.value as keyof typeof locales]);
const dir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));
const toaster = { position: "top-right" as const };
const route = useRoute();

// useHead(() => {
//   const head: any = {
//     title: `${t("titles.home")}`,
//     titleTemplate: `%s - ${t("app.title")}`,

//     htmlAttrs: {
//       lang: locale.value,
//       dir: t("app.dir"),
//     },

//     bodyAttrs: {
//       class: `${t("app.dir")} font-body`,
//     },

//     meta: [
//       { charset: "utf-8" },
//       {
//         name: "viewport",
//         content:
//           "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
//       },

//       {
//         name: "description",
//         content: t("app.description"),
//       },
//       { name: "google", content: "notranslate" },
//       {
//         name: "google-site-verification",
//         content: "zrE_gj5JNvjT5not0cJyO0yrbjUdb58Jrvusyfnvxw8",
//       },
//     ],

//     link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
//   };

//   if (gtmId.value) {
//     head.script = [
//       {
//         hid: "script-gtm",
//         type: "text/javascript",
//         innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//         new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//         'https://www.googletagmanager.com/gtm.js?id='+i+dl;
//         f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId.value}');`,
//       },
//     ];

//     head.noscript = [
//       {
//         hid: "gtm-noscript",
//         innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId.value}"
//           height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
//         body: true,
//       },
//     ];

//     head.__dangerouslyDisableSanitizersByTagID = {
//       "script-gtm": ["innerHTML"],
//       "gtm-noscript": ["innerHTML"],
//     };
//   }

//   return head;
// });

useHead(() => {
  const cleanPath = route.path.replace(/\/+$/, "");

  return {
    title: t("titles.home"),
    titleTemplate: `${$t("app.title")} - %s`,
    htmlAttrs: {
      lang: locale.value,
      dir: dir.value,
    },
    bodyAttrs: {
      class: `${t("app.dir")} font-body`,
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content: t("app.description"),
      },
      { name: "google", content: "notranslate" },
    ],

    link: [
      { rel: "icon", type: "image/png", href: "/icon.png" },

      {
        rel: "canonical",
        href: `https://goweb.sa${cleanPath || "/"}`,
      },
    ],
  };
});
const { setContactInfo, setMarketingTools, setSettings, setActiveSiteModels } =
  useAppStore();

const { data: contactInfo } = useLazyAsyncData(
  "contactInfo",
  () => $http.shared.contactInfo(),
  {
    transform: (data: any) => data.data,
    server: false,
  },
);
const { data: marketingTools } = useLazyAsyncData(
  "marketingTools",
  () => $http.shared.marketingTools(),
  {
    transform: (data: any) => data.data,
    server: false,
  },
);
const { data: settings } = useLazyAsyncData(
  "settings",
  () => $http.shared.settings(),
  {
    transform: (data: any) => data.data,
    server: false,
  },
);
const { data: activeSiteModels } = useLazyAsyncData(
  "activeSiteModels",
  () => $http.shared.activeSiteModels(),
  {
    transform: (data: any) => data.data,
    server: false,
  },
);

// Sync fetched data into store once available
watch(
  contactInfo,
  (val) => {
    if (val) setContactInfo(val as unknown as IContact);
  },
  { immediate: true },
);
watch(
  marketingTools,
  (val) => {
    if (val) setMarketingTools(val as unknown as any);
  },
  { immediate: true },
);
watch(
  settings,
  (val) => {
    if (val) setSettings(val as unknown as ISetting);
  },
  { immediate: true },
);
watch(
  activeSiteModels,
  (val) => {
    if (val) setActiveSiteModels(val as unknown as IActiveSiteModels);
  },
  { immediate: true },
);
</script>
