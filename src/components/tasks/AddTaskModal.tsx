import { useState } from "react";
import { Plus } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useTaskStore } from "../../stores/useTaskStore";
import { Habit } from "../../types";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TaskType = "task" | "habit";
type Frequency = Habit["frequency"];

const DAYS = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

const ICONS = [
  { value: "star", label: "\u2B50" },
  { value: "heart", label: "\u2764\uFE0F" },
  { value: "fire", label: "\u{1F525}" },
  { value: "book", label: "\u{1F4D6}" },
  { value: "gym", label: "\u{1F3CB}\uFE0F" },
  { value: "coffee", label: "\u2615" },
  { value: "laptop", label: "\u{1F4BB}" },
  { value: "music", label: "\u{1F3B5}" },
];

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const { categories, addTask, addHabit, addCategory } = useTaskStore();
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [taskType, setTaskType] = useState<TaskType>("task");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [customDays, setCustomDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [notificationTime, setNotificationTime] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("star");

  const handleSubmit = async () => {
    if (!title.trim() || !categoryId) return;

    if (taskType === "task") {
      await addTask(title.trim(), categoryId);
    } else {
      await addHabit(
        title.trim(),
        categoryId,
        frequency,
        frequency === "custom" ? customDays : undefined,
        notificationTime || undefined
      );
    }

    setTitle("");
    setCategoryId(categories[0]?.id || "");
    setTaskType("task");
    setFrequency("daily");
    setCustomDays([1, 2, 3, 4, 5]);
    setNotificationTime("");
    onClose();
  };

  const toggleDay = (day: number) => {
    setCustomDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    await addCategory(newCategoryName.trim(), newCategoryIcon);
    setNewCategoryName("");
    setNewCategoryIcon("star");
    setIsAddingCategory(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setTaskType("task")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              taskType === "task"
                ? "bg-[var(--color-accent)] text-[var(--color-background)]"
                : "bg-[var(--color-border)]/20 text-[var(--color-text-secondary)]"
            }`}
          >
            Task
          </button>
          <button
            onClick={() => setTaskType("habit")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              taskType === "habit"
                ? "bg-[var(--color-accent)] text-[var(--color-background)]"
                : "bg-[var(--color-border)]/20 text-[var(--color-text-secondary)]"
            }`}
          >
            Habit
          </button>
        </div>

        <Input
          placeholder={taskType === "task" ? "What do you need to do?" : "What habit to build?"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategoryId(category.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  categoryId === category.id
                    ? "bg-[var(--color-accent)] text-[var(--color-background)]"
                    : "bg-[var(--color-border)]/20 text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]/30"
                }`}
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setIsAddingCategory(true)}
              className="px-3 py-1.5 rounded-lg text-sm bg-[var(--color-border)]/20 text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]/30 transition-colors flex items-center gap-1"
            >
              <Plus size={14} />
              New
            </button>
          </div>

          {isAddingCategory && (
            <div className="mt-3 p-3 bg-[var(--color-border)]/10 rounded-lg space-y-3">
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                autoFocus
              />
              <div>
                <label className="block text-xs text-[var(--color-text-secondary)] mb-1.5">
                  Icon
                </label>
                <div className="flex gap-1">
                  {ICONS.map((icon) => (
                    <button
                      key={icon.value}
                      onClick={() => setNewCategoryIcon(icon.value)}
                      className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-colors ${
                        newCategoryIcon === icon.value
                          ? "bg-[var(--color-accent)] "
                          : "bg-[var(--color-surface)] hover:bg-[var(--color-border)]/30"
                      }`}
                    >
                      {icon.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddingCategory(false)}
                  className="flex-1 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex-1 py-2 text-sm bg-[var(--color-accent)] text-[var(--color-background)] rounded-lg disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {taskType === "habit" && (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Frequency
              </label>
              <div className="flex gap-2">
                {(["daily", "weekly", "custom"] as Frequency[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm capitalize transition-colors ${
                      frequency === f
                        ? "bg-[var(--color-accent)] text-[var(--color-background)]"
                        : "bg-[var(--color-border)]/20 text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {frequency === "custom" && (
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Select Days
                </label>
                <div className="flex gap-1">
                  {DAYS.map((day) => (
                    <button
                      key={day.value}
                      onClick={() => toggleDay(day.value)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                        customDays.includes(day.value)
                          ? "bg-[var(--color-accent)] text-[var(--color-background)]"
                          : "bg-[var(--color-border)]/20 text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Reminder (optional)
              </label>
              <input
                type="time"
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
                className="input"
              />
            </div>
          </>
        )}

        <Button fullWidth onClick={handleSubmit} disabled={!title.trim()}>
          {taskType === "task" ? "Add Task" : "Create Habit"}
        </Button>
      </div>
    </Modal>
  );
}
