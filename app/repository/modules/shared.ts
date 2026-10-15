import type {
  IAbout,
  IBeforeAfter,
  IBlog,
  IBranch,
  ICategory,
  IContact,
  IDoctor,
  IMeta,
  IOffer,
  IService,
  ISource,
  ISetting,
  ITestimonial,
  IHeroSection,
  IActiveSiteModels,
  IHome,
  IFaq,
} from "~/types";
import { FetchFactory } from "../factory";
export class SharedRepository extends FetchFactory {
  home() {
    return this.$fetch<{ data: IHome }>("home");
  }
  messages() {
    return this.$fetch<{ data: any }>("messages");
  }
  visions() {
    return this.$fetch<{ data: any }>("visions");
  }
  heroSection() {
    return this.$fetch<{ data: IHeroSection }>("hero_section");
  }
  aboutUs() {
    return this.$fetch<{ data: IAbout }>("abouts");
  }

  categories() {
    return this.$fetch<{ data: ICategory[] }>("categories");
  }
  services(query?: Record<string, any>) {
    return this.$fetch<{ data: IService[]; meta: IMeta }>("services", {
      query,
    });
  }
  customPages(query?: Record<string, any>) {
    return this.$fetch<{ data: any[]; meta: IMeta }>("custom_pages", {
      query,
    });
  }
  customPage(slug: string) {
    return this.$fetch<{ data: any }>("custom_pages/" + slug);
  }
  projects(query?: Record<string, any>) {
    return this.$fetch<{ data: IBeforeAfter[]; meta: IMeta }>("projects", {
      query,
    });
  }
  offers(query?: Record<string, any>) {
    return this.$fetch<{ data: IOffer[]; meta: IMeta }>("offers", {
      query,
    });
  }

  testimonials(query?: Record<string, any>) {
    return this.$fetch<{ data: ITestimonial[]; meta: IMeta }>("testimonials", {
      query,
    });
  }
  doctors(query?: Record<string, any>) {
    return this.$fetch<{ data: IDoctor[]; meta: IMeta }>("doctors", {
      query,
    });
  }
  faqs(query?: Record<string, any>) {
    return this.$fetch<{ data: IFaq[]; meta: IMeta }>("faqs", {
      query,
    });
  }
  contactInfo() {
    return this.$fetch<{ data: IContact[] }>("contact_info");
  }
  settings() {
    return this.$fetch<{ data: ISetting }>("settings");
  }
  marketingTools() {
    return this.$fetch<{ data: any }>("marketing_tools");
  }
  activeSiteModels() {
    return this.$fetch<{ data: IActiveSiteModels }>("active_site_models");
  }
  branches(query?: Record<string, any>) {
    return this.$fetch<{ data: IBranch[]; meta: IMeta }>("branches", {
      query,
    });
  }
  blogs(query?: Record<string, any>) {
    return this.$fetch<{ data: IBlog[]; meta: IMeta }>("blogs", {
      query,
    });
  }
  blog(slug?: string) {
    return this.$fetch<{ data: IBlog }>("blogs/" + slug);
  } 
  product(id?: string) {
    return this.$fetch<{ data: any }>("products/" + id);
  }
  service(id: number) {
    return this.$fetch<{ data: IService }>("services/" + id);
  }
  sources() {
    return this.$fetch<{ data: ISource[] }>("sources");
  }
  fields() {
    return this.$fetch<{ data: any }>("fields");
  }
  productCategories() {
    return this.$fetch<{ data: any }>("product_categories");
  }
  productsByCatId(id: number, query?: Record<string, any>) {
    return this.$fetch<{ data: any[]; meta: IMeta }>("products/by-category/" + id, {
      query,
    });
  }
  products(query?: Record<string, any>) {
    return this.$fetch<{ data: any[]; meta: IMeta }>("products", {
      query,
    });
  }
  confirmReservation(data: Record<string, any>) {
    return this.$fetch("order", {
      method: "POST",
      body: data,
    });
  }
  handleSourceClick(data: Record<string, any>) {
    return this.$fetch("add_click", {
      method: "POST",
      body: data,
    });
  }
}
