import { load, Store } from "@tauri-apps/plugin-store";

let store: Store | null = null;
let useLocalStorage = false;

async function initStore(): Promise<Store | null> {
  try {
    const s = await load("DailyHabit-data.json");
    return s;
  } catch (error) {
    console.warn("Tauri store not available, falling back to localStorage:", error);
    useLocalStorage = true;
    return null;
  }
}

export async function getStore(): Promise<Store | null> {
  if (useLocalStorage) return null;
  if (!store) {
    store = await initStore();
  }
  return store;
}

export async function getValue<T>(key: string): Promise<T | null> {
  try {
    const s = await getStore();
    if (s) {
      const value = await s.get<T>(key);
      return value ?? null;
    }
    // Fallback to localStorage
    const stored = localStorage.getItem(`DailyHabit_${key}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error getting value:", key, error);
    // Try localStorage as fallback
    try {
      const stored = localStorage.getItem(`DailyHabit_${key}`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}

export async function setValue<T>(key: string, value: T): Promise<void> {
  try {
    const s = await getStore();
    if (s) {
      await s.set(key, value);
      await s.save();
    } else {
      // Fallback to localStorage
      localStorage.setItem(`DailyHabit_${key}`, JSON.stringify(value));
    }
  } catch (error) {
    console.error("Error setting value:", key, error);
    // Try localStorage as fallback
    try {
      localStorage.setItem(`DailyHabit_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error("localStorage fallback also failed:", e);
    }
  }
}

export async function deleteValue(key: string): Promise<void> {
  try {
    const s = await getStore();
    if (s) {
      await s.delete(key);
      await s.save();
    } else {
      localStorage.removeItem(`DailyHabit_${key}`);
    }
  } catch (error) {
    console.error("Error deleting value:", key, error);
    localStorage.removeItem(`DailyHabit_${key}`);
  }
}
