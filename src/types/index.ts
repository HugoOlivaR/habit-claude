export interface User {
  id: string;
  name: string;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  isDefault: boolean;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  categoryId: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  date: string;
}

export interface Habit {
  id: string;
  title: string;
  categoryId: string;
  frequency: "daily" | "weekly" | "custom";
  customDays?: number[];
  notificationTime?: string;
  notificationEnabled: boolean;
  createdAt: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string;
  completedAt: string;
}

export interface CategoryNotification {
  categoryId: string;
  time: string;
  enabled: boolean;
}

export interface Settings {
  theme: "light" | "dark" | "system";
  notificationsEnabled: boolean;
  categoryNotifications: CategoryNotification[];
}

export type FilterTab = "todo" | "completed" | "pending";
