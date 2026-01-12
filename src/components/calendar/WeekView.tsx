import { getWeekDays, getDayName, getDayNumber, formatDate, isToday } from "../../utils/date";
import { useTaskStore } from "../../stores/useTaskStore";

export function WeekView() {
  const { selectedDate, setSelectedDate } = useTaskStore();
  const weekDays = getWeekDays(new Date(selectedDate));

  return (
    <div className="px-5 py-3">
      <div className="flex justify-between gap-1">
        {weekDays.map((date) => {
          const dateStr = formatDate(date);
          const isSelected = dateStr === selectedDate;
          const isTodayDate = isToday(date);

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all ${
                isSelected
                  ? "bg-[var(--color-surface)] border border-[var(--color-border)]/30 shadow-sm"
                  : "hover:bg-[var(--color-surface)]/50"
              }`}
            >
              <span
                className={`text-xs mb-1 ${
                  isSelected
                    ? "text-[var(--color-text-primary)] font-medium"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                {getDayName(date)}
              </span>
              <span
                className={`text-sm font-semibold ${
                  isSelected
                    ? "text-[var(--color-text-primary)]"
                    : isTodayDate
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {getDayNumber(date)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
