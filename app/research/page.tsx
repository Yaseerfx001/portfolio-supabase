import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export default async function ResearchPage() {
  const { research } = await getContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader title="Research" description="Papers, projects, and write-ups." />

      <div className="space-y-6">
        {research.map((item) => (
          <Reveal key={item.id}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block hr-line border-b pb-6 group"
            >
              <h3 className="font-display text-lg group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-accent mt-1">{item.venue}</p>
              <p className="mt-2 text-ink-light/80 dark:text-ink-dark/80">
                {item.description}
              </p>
            </a>
          </Reveal>
        ))}

        {research.length === 0 && (
          <p className="text-sm text-ink-light/50">No research listed yet.</p>
        )}
      </div>
    </div>
  );
}
