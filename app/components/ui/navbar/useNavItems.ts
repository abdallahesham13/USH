import type { NavigationMenuItem } from "@nuxt/ui";

export const useNavItems = () => {
  const { t } = useI18n();

  const items = computed<NavigationMenuItem[]>(() => [
    { label: t("nav.home"), value: "/", active: true },
    { label: t("nav.about_us"), value: "/about-us", active: true },
    { label: t("nav.services"), value: "/services", active: true },
    { label: t("nav.gallery"), value: "/gallery", active: true },
    { label: t("nav.testimonials"), value: "/testimonials", active: true },
    { label: t("nav.blogs"), value: "/blogs", active: true },
    { label: t("nav.furniture"), value: "/#reservation", active: true, class: "furniture-link" },
    { label: t("nav.contact_us"), value: "/contact", active: true },
  ]);

  return { items };
};
