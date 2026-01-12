import { Download } from "lucide-react";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-background)] border-b border-[var(--color-border)]/20">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 font-semibold text-lg">
          <Logo size={32} />
          DailyHabit
        </a>
        <a
          href="#download"
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-[var(--color-background)] rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Download size={16} />
          Download
        </a>
      </div>
    </header>
  );
}
