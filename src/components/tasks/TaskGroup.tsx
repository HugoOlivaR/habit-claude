import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TaskItem } from "./TaskItem";

interface TaskGroupItem {
  id: string;
  title: string;
  completed: boolean;
  isHabit?: boolean;
}

interface TaskGroupProps {
  name: string;
  icon: string;
  items: TaskGroupItem[];
  onToggle: (id: string, isHabit?: boolean) => void;
  onDelete?: (id: string, isHabit?: boolean) => void;
  isPending?: boolean;
}

export function TaskGroup({
  name,
  icon,
  items,
  onToggle,
  onDelete,
  isPending,
}: TaskGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (items.length === 0) return null;

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 mb-2 w-full text-left"
      >
        {isExpanded ? (
          <ChevronDown size={16} className="text-[var(--color-text-secondary)]" />
        ) : (
          <ChevronRight size={16} className="text-[var(--color-text-secondary)]" />
        )}
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-xs text-[var(--color-text-secondary)]">
          ({items.length})
        </span>
      </button>

      {isExpanded && (
        <div className="ml-1 border-l-2 border-[var(--color-border)]/20 pl-4">
          {items.map((item) => (
            <TaskItem
              key={item.id}
              id={item.id}
              title={item.title}
              icon={icon}
              completed={item.completed}
              onToggle={() => onToggle(item.id, item.isHabit)}
              onDelete={onDelete ? () => onDelete(item.id, item.isHabit) : undefined}
              isPending={isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
