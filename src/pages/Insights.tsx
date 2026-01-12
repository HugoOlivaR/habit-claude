import { useMemo } from "react";
import { TrendingUp, Flame, Target, CheckCircle2 } from "lucide-react";
import { Header } from "../components/layout/Header";
import { BottomNav } from "../components/layout/BottomNav";
import { Card } from "../components/ui/Card";
import { useTaskStore } from "../stores/useTaskStore";
import { formatDate, getToday } from "../utils/date";

export function Insights() {
  const { tasks, habits, habitCompletions, categories } = useTaskStore();

  const stats = useMemo(() => {
    const today = getToday();

    const todayTasks = tasks.filter((t) => t.date === today);
    const completedToday = todayTasks.filter((t) => t.completed).length;
    const totalToday = todayTasks.length + habits.length;
    const habitsCompletedToday = habitCompletions.filter((c) => c.date === today).length;
    const totalCompletedToday = completedToday + habitsCompletedToday;

    const completionRate = totalToday > 0 ? Math.round((totalCompletedToday / totalToday) * 100) : 0;

    let streak = 0;
    const todayDate = new Date(today);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(todayDate);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = formatDate(checkDate);

      const dayTasks = tasks.filter((t) => t.date === dateStr);
      const dayHabitCompletions = habitCompletions.filter((c) => c.date === dateStr);

      const hasAnyActivity = dayTasks.some((t) => t.completed) || dayHabitCompletions.length > 0;

      if (hasAnyActivity || i === 0) {
        if (hasAnyActivity) streak++;
      } else {
        break;
      }
    }

    const categoryStats = categories.map((category) => {
      const categoryTasks = tasks.filter((t) => t.categoryId === category.id);
      const categoryHabits = habits.filter((h) => h.categoryId === category.id);
      const completed = categoryTasks.filter((t) => t.completed).length;
      const total = categoryTasks.length;

      return {
        ...category,
        completed,
        total,
        habitsCount: categoryHabits.length,
      };
    });

    const totalTasks = tasks.length;
    const totalCompleted = tasks.filter((t) => t.completed).length;

    return {
      completionRate,
      streak,
      categoryStats,
      totalTasks,
      totalCompleted,
      totalHabits: habits.length,
    };
  }, [tasks, habits, habitCompletions, categories]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-24">
        <h2 className="text-lg font-semibold mb-4">Your Progress</h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="flex flex-col items-center justify-center py-6">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
              <Target size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold">{stats.completionRate}%</span>
            <span className="text-xs text-[var(--color-text-secondary)]">Today's progress</span>
          </Card>

          <Card className="flex flex-col items-center justify-center py-6">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
              <Flame size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-2xl font-bold">{stats.streak}</span>
            <span className="text-xs text-[var(--color-text-secondary)]">Day streak</span>
          </Card>
        </div>

        <Card className="mb-6">
          <h3 className="text-sm font-semibold mb-3">Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--color-text-secondary)]" />
                <span className="text-sm">Total Tasks</span>
              </div>
              <span className="text-sm font-medium">
                {stats.totalCompleted}/{stats.totalTasks}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[var(--color-text-secondary)]" />
                <span className="text-sm">Active Habits</span>
              </div>
              <span className="text-sm font-medium">{stats.totalHabits}</span>
            </div>
          </div>
        </Card>

        <h3 className="text-sm font-semibold mb-3">By Category</h3>
        <div className="space-y-2">
          {stats.categoryStats.map((category) => (
            <Card key={category.id} padding="sm" className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">{category.name}</span>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {category.habitsCount} habits
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">
                  {category.completed}/{category.total}
                </span>
                <p className="text-xs text-[var(--color-text-secondary)]">tasks</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav onAddClick={() => {}} />
    </div>
  );
}
