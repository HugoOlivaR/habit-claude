export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[var(--color-border)]/20">
      <div className="max-w-5xl mx-auto text-center text-sm text-[var(--color-text-secondary)]">
        <p>
          Made with care.{" "}
          <a
            href="https://github.com/yourusername/DailyHabit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-primary)] hover:underline"
          >
            View source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
