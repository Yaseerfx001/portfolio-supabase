import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { Trophy } from "lucide-react";

export default async function HonorsPage() {
  const { honors } = await getContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader title="Honors" description="Awards and recognitions." />

      <div className="space-y-4">
        {honors.map((honor) => (
          <Reveal key={honor.id}>
            <div className="flex items-start gap-3 p-4 hr-line border rounded-md">
              <Trophy size={18} className="mt-1 text-accent shrink-0" />
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display">{honor.title}</h3>
                  <span className="text-xs text-ink-light/50 dark:text-ink-dark/50">
                    {honor.date}
                  </span>
                </div>
                <p className="text-sm mt-1 text-ink-light/70 dark:text-ink-dark/70">
                  {honor.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}

        {honors.length === 0 && (
          <p className="text-sm text-ink-light/50">No honors added yet.</p>
        )}
      </div>
    </div>
  );
}
