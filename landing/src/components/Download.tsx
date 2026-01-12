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
          href="https://github.com/HugoOlivaR/habit-claude/releases/download/v0.2.0/DailyHabit_0.1.0_aarch64.dmg"
          className="btn-primary text-lg"
        >
          <DownloadIcon size={20} />
          Download for macOS
        </a>

        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Version 0.2.0 · macOS 10.15+
        </p>

        <div className="mt-10 p-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] text-left">
          <h3 className="font-semibold mb-3 text-center">Installation Instructions</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Since this app is not signed with an Apple Developer account, macOS will block it by default.
            After installing, open Terminal and run this command to allow it:
          </p>
          <code className="block bg-[var(--color-bg)] p-3 rounded-lg text-sm font-mono break-all">
            xattr -cr /Applications/DailyHabit.app
          </code>
          <p className="text-xs text-[var(--color-text-secondary)] mt-3">
            This removes the quarantine attribute that macOS adds to downloaded apps.
          </p>
        </div>
      </div>
    </section>
  );
}
