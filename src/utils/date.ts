export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getToday(): string {
  return formatDate(new Date());
}

export function getWeekDays(referenceDate: Date = new Date()): Date[] {
  const day = referenceDate.getDay();
  const diff = referenceDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(referenceDate);
  monday.setDate(diff);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
}

export function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function getDayNumber(date: Date): number {
  return date.getDate();
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === "string" ? date1 : formatDate(date1);
  const d2 = typeof date2 === "string" ? date2 : formatDate(date2);
  return d1 === d2;
}

export function isToday(date: Date | string): boolean {
  return isSameDay(date, new Date());
}

export function shouldShowHabitForDay(
  frequency: "daily" | "weekly" | "custom",
  customDays: number[] | undefined,
  date: Date
): boolean {
  if (frequency === "daily") return true;

  const dayOfWeek = date.getDay();

  if (frequency === "weekly") {
    return dayOfWeek === 1;
  }

  if (frequency === "custom" && customDays) {
    return customDays.includes(dayOfWeek);
  }

  return false;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
