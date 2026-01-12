import { useState } from "react";
import { Sparkles, CheckCircle2, Clock } from "lucide-react";
import { Header } from "../components/layout/Header";
import { BottomNav } from "../components/layout/BottomNav";
import { WeekView } from "../components/calendar/WeekView";
import { TaskList } from "../components/tasks/TaskList";
import { AddTaskModal } from "../components/tasks/AddTaskModal";
import { FilterTab } from "../types";

export function Home() {
  const [filter, setFilter] = useState<FilterTab>("todo");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const tabs: Array<{ value: FilterTab; label: string; icon: typeof Sparkles }> = [
    { value: "todo", label: "To do", icon: Sparkles },
    { value: "completed", label: "Completed", icon: CheckCircle2 },
    { value: "pending", label: "Pending", icon: Clock },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WeekView />

      <div className="px-5 py-3">
        <div className="flex gap-2 p-1 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = filter === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[var(--color-accent)] text-[var(--color-background)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <TaskList filter={filter} />
      </div>

      <BottomNav onAddClick={() => setIsAddModalOpen(true)} />
      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
