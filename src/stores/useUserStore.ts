import { create } from "zustand";
import { User } from "../types";
import { getValue, setValue } from "../utils/storage";
import { generateId } from "../utils/date";

interface UserState {
  user: User | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  setUser: (name: string) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  updateName: (name: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: true,

  initialize: async () => {
    try {
      const user = await getValue<User>("user");
      set({ user, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  setUser: async (name: string) => {
    const user: User = {
      id: generateId(),
      name,
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    };
    await setValue("user", user);
    set({ user });
  },

  completeOnboarding: async () => {
    const { user } = get();
    if (!user) return;

    const updatedUser = { ...user, onboardingComplete: true };
    await setValue("user", updatedUser);
    set({ user: updatedUser });
  },

  updateName: async (name: string) => {
    const { user } = get();
    if (!user) return;

    const updatedUser = { ...user, name };
    await setValue("user", updatedUser);
    set({ user: updatedUser });
  },
}));
