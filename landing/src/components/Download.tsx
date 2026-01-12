import { Download as DownloadIcon } from "lucide-react";

export function Download() {
  return (
    <section id="download" className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to build better habits?
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Download DailyHabit and start your journey today.
        </p>

        <a
          href="https://github.com/yourusername/DailyHabit/releases/latest/download/DailyHabit_0.1.0_aarch64.dmg"
          className="btn-primary text-lg"
        >
          <DownloadIcon size={20} />
          Download for macOS
        </a>

        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Version 0.1.0 · macOS 10.15+
        </p>
      </div>
    </section>
  );
}
