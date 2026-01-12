const FEATURES = [
  {
    icon: "🌅",
    title: "Organize by time",
    description:
      "Group your tasks into Morning, Workload, and Night categories. Create custom categories for your workflow.",
  },
  {
    icon: "🔁",
    title: "Build habits",
    description:
      "Create recurring habits - daily, weekly, or on specific days. Track your streaks and stay consistent.",
  },
  {
    icon: "🔔",
    title: "Stay on track",
    description:
      "Set reminders for your habits and never miss an important task. Native macOS notifications.",
  },
  {
    icon: "📊",
    title: "Track progress",
    description:
      "See your completion rate and day streaks. Insights help you understand your productivity patterns.",
  },
  {
    icon: "🌙",
    title: "Dark mode",
    description:
      "Beautiful in light or dark. Follows your system preference or set it manually.",
  },
  {
    icon: "🔒",
    title: "Privacy first",
    description:
      "All your data stays on your device. No accounts, no cloud, no tracking. Just you and your tasks.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Simple by design</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="card p-6">
              <div className="w-12 h-12 bg-[var(--color-background)] rounded-xl flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
