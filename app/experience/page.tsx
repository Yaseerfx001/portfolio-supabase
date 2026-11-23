import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export default async function ExperiencePage() {
  const { experience } = await getContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="Experience"
        description="Roles and internships I've held, most recent first."
      />

      <div className="space-y-8">
        {experience.map((item) => (
          <Reveal key={item.id}>
            <div className="hr-line border-b pb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg">{item.title}</h3>
                <span className="text-xs text-ink-light/50 dark:text-ink-dark/50">
                  {item.period}
                </span>
              </div>
              <p className="text-sm text-accent mt-1">{item.org}</p>
              <p className="mt-3 text-ink-light/80 dark:text-ink-dark/80">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded hr-line border text-ink-light/60 dark:text-ink-dark/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {experience.length === 0 && (
          <p className="text-sm text-ink-light/50">No experience added yet.</p>
        )}
      </div>
    </div>
  );
}
