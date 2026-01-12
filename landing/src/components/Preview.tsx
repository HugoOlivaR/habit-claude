import { Check } from "lucide-react";

export function Preview() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-sm mx-auto animate-slide-up">
        <div className="card overflow-hidden shadow-xl">
          {/* Header */}
          <div className="p-5 border-b border-[var(--color-border)]/20">
            <h2 className="text-lg font-semibold">Hey, there!</h2>
            <p className="text-sm text-[var(--color-text-secondary)] italic">
              Let's make progress today!
            </p>
          </div>

          {/* Tabs */}
          <div className="p-4">
            <div className="flex gap-2 p-1 bg-[var(--color-background)] rounded-xl mb-4">
              <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-[var(--color-background)]">
                To do
              </button>
              <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-[var(--color-text-secondary)]">
                Completed
              </button>
              <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-[var(--color-text-secondary)]">
                Pending
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              <TaskGroup title="Morning">
                <TaskItem completed>Wake up on time</TaskItem>
                <TaskItem>Gym / workout</TaskItem>
              </TaskGroup>

              <TaskGroup title="Workload">
                <TaskItem>Polish UI / components</TaskItem>
                <TaskItem>Share updates with team</TaskItem>
              </TaskGroup>

              <TaskGroup title="Night">
                <TaskItem>Plan tomorrow's top task</TaskItem>
              </TaskGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TaskGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
        <span className="text-[var(--color-text-secondary)]">▼</span>
        {title}
      </h3>
      <div className="ml-4 pl-4 border-l-2 border-[var(--color-border)]/20 space-y-2">
        {children}
      </div>
    </div>
  );
}

function TaskItem({ completed, children }: { completed?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
          completed
            ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
            : "border-[var(--color-border)]"
        }`}
      >
        {completed && <Check size={12} className="text-[var(--color-background)]" strokeWidth={3} />}
      </div>
      <span
        className={`text-sm ${
          completed ? "line-through text-[var(--color-text-secondary)]" : ""
        }`}
      >
        {children}
      </span>
    </div>
  );
}
