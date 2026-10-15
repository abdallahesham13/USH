import type { IContact, ISetting } from "~/types";

interface AppState {
  contactInfo: IContact | null;
  settings: ISetting | null;
  activeSiteModels: any | null;
  marketingTools: any | null;
}
export const useAppStore = () => {
  const state = useState<AppState>("app-store", () => ({
    contactInfo: null,
    settings: null,
    activeSiteModels: null,
    marketingTools: null,
  }));
  const setContactInfo = (data: IContact) => {
    state.value.contactInfo = data;
  };
  const setSettings = (data: any) => {
    state.value.settings = data;
  };
  const setActiveSiteModels = (data: any) => {
    state.value.activeSiteModels = data;
  };
  const setMarketingTools = (data: any) => {
    state.value.marketingTools = data;
  };
  return { state, setContactInfo, setSettings, setActiveSiteModels, setMarketingTools };
};
