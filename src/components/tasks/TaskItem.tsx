import { Trash2 } from "lucide-react";
import { Checkbox } from "../ui/Checkbox";

interface TaskItemProps {
  id: string;
  title: string;
  icon?: string;
  completed: boolean;
  onToggle: () => void;
  onDelete?: () => void;
  isPending?: boolean;
}

const CATEGORY_ICONS: Record<string, string> = {
  sunrise: "\u{1F305}",
  briefcase: "\u{1F4BC}",
  moon: "\u{1F319}",
  star: "\u2B50",
  heart: "\u2764\uFE0F",
  fire: "\u{1F525}",
  book: "\u{1F4D6}",
  gym: "\u{1F3CB}\uFE0F",
};

export function TaskItem({
  title,
  icon,
  completed,
  onToggle,
  onDelete,
  isPending,
}: TaskItemProps) {
  return (
    <div
      className={`group flex items-center gap-3 py-2.5 px-1 ${
        isPending ? "opacity-70" : ""
      }`}
    >
      <Checkbox checked={completed} onChange={onToggle} />

      {icon && (
        <span className="text-base">{CATEGORY_ICONS[icon] || icon}</span>
      )}

      <span
        className={`flex-1 text-sm transition-all duration-200 ${
          completed ? "task-completed" : ""
        }`}
      >
        {title}
      </span>

      {onDelete && (
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--color-border)]/20 transition-all text-[var(--color-text-secondary)] hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
