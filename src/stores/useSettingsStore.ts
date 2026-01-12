import { create } from "zustand";
import { Settings, CategoryNotification } from "../types";
import { getValue, setValue } from "../utils/storage";

const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  notificationsEnabled: true,
  categoryNotifications: [
    { categoryId: "morning", time: "08:00", enabled: true },
    { categoryId: "workload", time: "09:00", enabled: true },
    { categoryId: "night", time: "21:00", enabled: true },
  ],
};

interface SettingsState {
  settings: Settings;
  isLoading: boolean;

  initialize: () => Promise<void>;
  setTheme: (theme: Settings["theme"]) => Promise<void>;
  toggleNotifications: () => Promise<void>;
  updateCategoryNotification: (notification: CategoryNotification) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isLoading: true,

  initialize: async () => {
    try {
      const settings = await getValue<Settings>("settings");
      set({ settings: settings || DEFAULT_SETTINGS, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  setTheme: async (theme: Settings["theme"]) => {
    const { settings } = get();
    const updatedSettings = { ...settings, theme };
    await setValue("settings", updatedSettings);
    set({ settings: updatedSettings });
  },

  toggleNotifications: async () => {
    const { settings } = get();
    const updatedSettings = {
      ...settings,
      notificationsEnabled: !settings.notificationsEnabled,
    };
    await setValue("settings", updatedSettings);
    set({ settings: updatedSettings });
  },

  updateCategoryNotification: async (notification: CategoryNotification) => {
    const { settings } = get();
    const existingIndex = settings.categoryNotifications.findIndex(
      (n) => n.categoryId === notification.categoryId
    );

    let updatedNotifications: CategoryNotification[];
    if (existingIndex >= 0) {
      updatedNotifications = [...settings.categoryNotifications];
      updatedNotifications[existingIndex] = notification;
    } else {
      updatedNotifications = [...settings.categoryNotifications, notification];
    }

    const updatedSettings = { ...settings, categoryNotifications: updatedNotifications };
    await setValue("settings", updatedSettings);
    set({ settings: updatedSettings });
  },
}));
