import { create } from "zustand";
import { Task, Habit, HabitCompletion, Category } from "../types";
import { getValue, setValue } from "../utils/storage";
import { generateId, getToday, formatDate, shouldShowHabitForDay } from "../utils/date";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "morning", name: "Morning", icon: "sunrise", isDefault: true, order: 0 },
  { id: "workload", name: "Workload", icon: "briefcase", isDefault: true, order: 1 },
  { id: "night", name: "Night", icon: "moon", isDefault: true, order: 2 },
];

interface TaskState {
  tasks: Task[];
  habits: Habit[];
  habitCompletions: HabitCompletion[];
  categories: Category[];
  selectedDate: string;
  isLoading: boolean;

  initialize: () => Promise<void>;
  setSelectedDate: (date: string) => void;

  addTask: (title: string, categoryId: string) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;

  addHabit: (
    title: string,
    categoryId: string,
    frequency: Habit["frequency"],
    customDays?: number[],
    notificationTime?: string
  ) => Promise<void>;
  toggleHabit: (habitId: string, date: string) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;

  addCategory: (name: string, icon: string) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  reorderCategories: (categories: Category[]) => Promise<void>;

  getTasksForDate: (date: string) => Task[];
  getAllItemsForDate: (date: string) => { tasks: Task[]; habits: Array<Habit & { completed: boolean }> };
  getHabitsForDate: (date: string) => Array<Habit & { completed: boolean }>;
  getPendingItems: () => Array<Task | (Habit & { date: string })>;
  getCompletedItemsForDate: (date: string) => Array<Task | (Habit & { completed: boolean })>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  habits: [],
  habitCompletions: [],
  categories: DEFAULT_CATEGORIES,
  selectedDate: getToday(),
  isLoading: true,

  initialize: async () => {
    try {
      const [tasks, habits, habitCompletions, categories] = await Promise.all([
        getValue<Task[]>("tasks"),
        getValue<Habit[]>("habits"),
        getValue<HabitCompletion[]>("habitCompletions"),
        getValue<Category[]>("categories"),
      ]);

      set({
        tasks: tasks || [],
        habits: habits || [],
        habitCompletions: habitCompletions || [],
        categories: categories || DEFAULT_CATEGORIES,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  setSelectedDate: (date: string) => set({ selectedDate: date }),

  addTask: async (title: string, categoryId: string) => {
    const { tasks, selectedDate } = get();
    const newTask: Task = {
      id: generateId(),
      title,
      categoryId,
      completed: false,
      createdAt: new Date().toISOString(),
      date: selectedDate,
    };
    const updatedTasks = [...tasks, newTask];
    await setValue("tasks", updatedTasks);
    set({ tasks: updatedTasks });
  },

  toggleTask: async (taskId: string) => {
    const { tasks } = get();
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : undefined,
          }
        : task
    );
    await setValue("tasks", updatedTasks);
    set({ tasks: updatedTasks });
  },

  deleteTask: async (taskId: string) => {
    const { tasks } = get();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    await setValue("tasks", updatedTasks);
    set({ tasks: updatedTasks });
  },

  addHabit: async (title, categoryId, frequency, customDays, notificationTime) => {
    const { habits } = get();
    const newHabit: Habit = {
      id: generateId(),
      title,
      categoryId,
      frequency,
      customDays,
      notificationTime,
      notificationEnabled: !!notificationTime,
      createdAt: new Date().toISOString(),
    };
    const updatedHabits = [...habits, newHabit];
    await setValue("habits", updatedHabits);
    set({ habits: updatedHabits });
  },

  toggleHabit: async (habitId: string, date: string) => {
    const { habitCompletions } = get();
    const existingCompletion = habitCompletions.find(
      (c) => c.habitId === habitId && c.date === date
    );

    let updatedCompletions: HabitCompletion[];
    if (existingCompletion) {
      updatedCompletions = habitCompletions.filter((c) => c.id !== existingCompletion.id);
    } else {
      const newCompletion: HabitCompletion = {
        id: generateId(),
        habitId,
        date,
        completedAt: new Date().toISOString(),
      };
      updatedCompletions = [...habitCompletions, newCompletion];
    }

    await setValue("habitCompletions", updatedCompletions);
    set({ habitCompletions: updatedCompletions });
  },

  deleteHabit: async (habitId: string) => {
    const { habits, habitCompletions } = get();
    const updatedHabits = habits.filter((h) => h.id !== habitId);
    const updatedCompletions = habitCompletions.filter((c) => c.habitId !== habitId);
    await Promise.all([
      setValue("habits", updatedHabits),
      setValue("habitCompletions", updatedCompletions),
    ]);
    set({ habits: updatedHabits, habitCompletions: updatedCompletions });
  },

  addCategory: async (name: string, icon: string) => {
    const { categories } = get();
    const newCategory: Category = {
      id: generateId(),
      name,
      icon,
      isDefault: false,
      order: categories.length,
    };
    const updatedCategories = [...categories, newCategory];
    await setValue("categories", updatedCategories);
    set({ categories: updatedCategories });
  },

  deleteCategory: async (categoryId: string) => {
    const { categories, tasks, habits } = get();
    const category = categories.find((c) => c.id === categoryId);
    if (category?.isDefault) return;

    const updatedCategories = categories.filter((c) => c.id !== categoryId);
    const updatedTasks = tasks.filter((t) => t.categoryId !== categoryId);
    const updatedHabits = habits.filter((h) => h.categoryId !== categoryId);

    await Promise.all([
      setValue("categories", updatedCategories),
      setValue("tasks", updatedTasks),
      setValue("habits", updatedHabits),
    ]);
    set({ categories: updatedCategories, tasks: updatedTasks, habits: updatedHabits });
  },

  reorderCategories: async (categories: Category[]) => {
    const reorderedCategories = categories.map((c, i) => ({ ...c, order: i }));
    await setValue("categories", reorderedCategories);
    set({ categories: reorderedCategories });
  },

  getTasksForDate: (date: string) => {
    const { tasks } = get();
    return tasks.filter((task) => task.date === date);
  },

  getAllItemsForDate: (date: string) => {
    const { tasks, habits, habitCompletions } = get();
    const dateObj = new Date(date);

    const dateTasks = tasks.filter((task) => task.date === date);
    const dateHabits = habits
      .filter((habit) => shouldShowHabitForDay(habit.frequency, habit.customDays, dateObj))
      .map((habit) => ({
        ...habit,
        completed: habitCompletions.some((c) => c.habitId === habit.id && c.date === date),
      }));

    return { tasks: dateTasks, habits: dateHabits };
  },

  getHabitsForDate: (date: string) => {
    const { habits, habitCompletions } = get();
    const dateObj = new Date(date);

    return habits
      .filter((habit) => shouldShowHabitForDay(habit.frequency, habit.customDays, dateObj))
      .map((habit) => ({
        ...habit,
        completed: habitCompletions.some((c) => c.habitId === habit.id && c.date === date),
      }));
  },

  getPendingItems: () => {
    const { tasks, habits, habitCompletions } = get();
    const today = getToday();
    const todayDate = new Date(today);

    const pendingTasks = tasks.filter((task) => task.date < today && !task.completed);

    const pendingHabits: Array<Habit & { date: string }> = [];
    const sevenDaysAgo = new Date(todayDate);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    habits.forEach((habit) => {
      for (let d = new Date(sevenDaysAgo); d < todayDate; d.setDate(d.getDate() + 1)) {
        const dateStr = formatDate(d);
        if (shouldShowHabitForDay(habit.frequency, habit.customDays, d)) {
          const isCompleted = habitCompletions.some(
            (c) => c.habitId === habit.id && c.date === dateStr
          );
          if (!isCompleted) {
            pendingHabits.push({ ...habit, date: dateStr });
          }
        }
      }
    });

    return [...pendingTasks, ...pendingHabits];
  },

  getCompletedItemsForDate: (date: string) => {
    const { tasks, habits, habitCompletions } = get();
    const dateObj = new Date(date);

    const completedTasks = tasks.filter((task) => task.date === date && task.completed);

    const completedHabits = habits
      .filter((habit) => shouldShowHabitForDay(habit.frequency, habit.customDays, dateObj))
      .filter((habit) => habitCompletions.some((c) => c.habitId === habit.id && c.date === date))
      .map((habit) => ({ ...habit, completed: true }));

    return [...completedTasks, ...completedHabits];
  },
}));
