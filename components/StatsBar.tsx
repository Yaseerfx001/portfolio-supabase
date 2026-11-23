import type { Stat } from "@/lib/types";

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="hr-line border-y">
      <div className="mx-auto max-w-5xl px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-3xl">{stat.value}+</div>
            <div className="text-xs uppercase tracking-wide text-ink-light/60 dark:text-ink-dark/60 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
