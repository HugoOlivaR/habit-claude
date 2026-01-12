import { Sun, Moon } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";
import { useSettingsStore } from "../../stores/useSettingsStore";

export function Header() {
  const { user } = useUserStore();
  const { settings, setTheme } = useSettingsStore();

  const isDark =
    settings.theme === "dark" ||
    (settings.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="pt-12 px-5 pb-4 draggable">
      <div className="flex items-start justify-between no-drag">
        <div>
          <h1 className="text-xl font-semibold">
            Hey, {user?.name || "there"}
            <span className="ml-1">&#x1F44B;</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] italic text-sm mt-0.5">
            Let's make progress today!
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-[var(--color-border)]/30 hover:bg-[var(--color-border)]/10 transition-colors"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
