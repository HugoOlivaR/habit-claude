import { Download, Github } from "lucide-react";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-3xl mx-auto text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 bg-[var(--color-accent)] rounded-2xl flex items-center justify-center shadow-lg">
          <Logo size={44} className="text-[var(--color-background)]" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight mb-4">DailyHabit</h1>

        <p className="text-xl text-[var(--color-text-secondary)] max-w-md mx-auto mb-8">
          A simple, joyful way to take control of your time and routines
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#download" className="btn-primary">
            <Download size={18} />
            Download for macOS
          </a>
          <a
            href="https://github.com/yourusername/DailyHabit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </div>

        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Requires macOS 10.15 or later
        </p>
      </div>
    </section>
  );
}
