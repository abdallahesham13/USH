import type { VNode } from "vue";

export interface IHome {
  hero_section: any;
  abouts: any;
  services: any[];
  testimonials: any[];
  values: any;
  doctors: any[];
  partners: any[];
  faqs: any[];
}
export interface IListingItem {
  title: string;
  icon?: string;
  value?: string | VNode | number | boolean;
  class?: string;
  valueClass?: string;
}

export interface IHeroSection {
  title: string;
  image: string;
  description: string;
}
export interface IMeta {
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
}

export interface IAbout {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
}
export interface IService {
  id: number;
  name: string;
  image: string;
  category?: ICategory | string;
  category_name?: string;
  full_description: string;
  description: string;
  index?: number;
}

export interface IBeforeAfter {
  id: number;
  image: string;
  image_after: string;
}

export interface IOffer {
  id: number;
  image: string;
  name: string;
  description: string;
  discount_percentage: number;
  full_description: string;
  is_block: boolean;
  price: number;
  price_after_discount: number;
  translations: { [key: string]: { name: string; description: string } };
  url: string;
}

export interface IDoctor {
  about_me: string;
  name: string;
  image: string;
  id: number;
}

export interface ITestimonial {
  id: number;
  name?: string;
  user_name: string;
  job: string;
  title?: string;
  comment: string;
  description?: string;
  image: string;
  rating?: number;
}

export interface IContact {
  address_ar: string;
  address_en: string;
  discord_link: string | null;
  email: string;
  facebook_link: string | null;
  id: number;
  instagram_link: string | null;
  linkedIn_link: string | null;
  location_link: string;
  pinterest_link: string | null;
  quora_link: string | null;
  reddit_link: string | null;
  snapchat_link: string | null;
  telegram_link: string | null;
  threads_link: string | null;
  tiktok_link: string | null;
  twitter_link: string | null;
  youtube_link: string | null;
  unified_number: number | null;
  whatsApp_link: number | null;
  whatsapp_link: string | null;
}

export interface IBranch {
  address: string;
  city: string;
  full_description: string;
  id: number;
  image: string;
  is_block: boolean;
  map: string;
  name: string;
  telephone: string;
  translations: {
    [key: string]: {
      city: string;
      address: string;
      name: string;
      telephone: string;
    };
  };
  whatsapp: string;
}

export interface IBlog {
  id: number;
  slug_ar: string;
  slug: string;
  avatar: string;
  short_description: string;
  long_description: string;
  title?: string;
  image?: string;
  date?: string;
}

export interface ISource {
  id: number;
  name: string;
  identifier: string;
}

export interface IReservation {
  name: string;
  email: string;
  phone: string;
  category_id: number;
  branch_id: number;
  source_id: number;
}
export interface ISetting {
  id: number;
  image?: string;
  footer: string;
}
export interface IActiveSiteModels {
  id: number;
  image?: string;
  footer: string;
}
export interface IFaq {
  id: number;
  question: string;
  answer: string;
}
