import { TaskGroup } from "./TaskGroup";
import { useTaskStore } from "../../stores/useTaskStore";
import { FilterTab, Task, Habit, Category } from "../../types";

interface TaskListProps {
  filter: FilterTab;
}

export function TaskList({ filter }: TaskListProps) {
  const {
    categories,
    selectedDate,
    getAllItemsForDate,
    getPendingItems,
    getCompletedItemsForDate,
    toggleTask,
    toggleHabit,
    deleteTask,
    deleteHabit,
  } = useTaskStore();

  const handleToggle = (id: string, isHabit?: boolean) => {
    if (isHabit) {
      toggleHabit(id, selectedDate);
    } else {
      toggleTask(id);
    }
  };

  const handleDelete = (id: string, isHabit?: boolean) => {
    if (isHabit) {
      deleteHabit(id);
    } else {
      deleteTask(id);
    }
  };

  const groupItemsByCategory = (
    tasks: Task[],
    habits: Array<Habit & { completed: boolean }>
  ) => {
    const grouped: Record<
      string,
      { category: Category; items: Array<{ id: string; title: string; completed: boolean; isHabit?: boolean }> }
    > = {};

    categories.forEach((category) => {
      grouped[category.id] = { category, items: [] };
    });

    tasks.forEach((task) => {
      if (grouped[task.categoryId]) {
        grouped[task.categoryId].items.push({
          id: task.id,
          title: task.title,
          completed: task.completed,
          isHabit: false,
        });
      }
    });

    habits.forEach((habit) => {
      if (grouped[habit.categoryId]) {
        grouped[habit.categoryId].items.push({
          id: habit.id,
          title: habit.title,
          completed: habit.completed,
          isHabit: true,
        });
      }
    });

    return Object.values(grouped)
      .filter((g) => g.items.length > 0)
      .sort((a, b) => a.category.order - b.category.order);
  };

  if (filter === "todo") {
    const { tasks, habits } = getAllItemsForDate(selectedDate);
    const grouped = groupItemsByCategory(tasks, habits);

    if (grouped.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-secondary)]">
          <p className="text-sm">No tasks for today</p>
          <p className="text-xs mt-1">Tap + to add a task or habit</p>
        </div>
      );
    }

    return (
      <div className="px-5 pb-24">
        {grouped.map(({ category, items }) => (
          <TaskGroup
            key={category.id}
            name={category.name}
            icon={category.icon}
            items={items}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );
  }

  if (filter === "completed") {
    const items = getCompletedItemsForDate(selectedDate);
    const tasks = items.filter((i): i is Task => "date" in i && "completedAt" in i);
    const habits = items.filter(
      (i): i is Habit & { completed: boolean } => !("date" in i) || !("completedAt" in i)
    );
    const grouped = groupItemsByCategory(tasks, habits as Array<Habit & { completed: boolean }>);

    if (grouped.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-secondary)]">
          <p className="text-sm">No completed tasks yet</p>
        </div>
      );
    }

    return (
      <div className="px-5 pb-24">
        {grouped.map(({ category, items }) => (
          <TaskGroup
            key={category.id}
            name={category.name}
            icon={category.icon}
            items={items}
            onToggle={handleToggle}
          />
        ))}
      </div>
    );
  }

  if (filter === "pending") {
    const pendingItems = getPendingItems();

    if (pendingItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-secondary)]">
          <p className="text-sm">No pending tasks</p>
          <p className="text-xs mt-1">Great job staying on top of things!</p>
        </div>
      );
    }

    const pendingTasks = pendingItems.filter((i): i is Task => "date" in i && "completedAt" in i || "createdAt" in i && !("frequency" in i));
    const pendingHabits = pendingItems.filter(
      (i): i is Habit & { date: string } => "frequency" in i
    );

    const grouped = groupItemsByCategory(
      pendingTasks,
      pendingHabits.map((h) => ({ ...h, completed: false }))
    );

    return (
      <div className="px-5 pb-24">
        {grouped.map(({ category, items }) => (
          <TaskGroup
            key={category.id}
            name={category.name}
            icon={category.icon}
            items={items}
            onToggle={handleToggle}
            isPending
          />
        ))}
      </div>
    );
  }

  return null;
}
