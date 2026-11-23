import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { Mic } from "lucide-react";

export default async function TalksPage() {
  const { talks } = await getContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader title="Talks" description="Places I've spoken or presented." />

      <div className="space-y-4">
        {talks.map((talk) => (
          <Reveal key={talk.id}>
            <a
              href={talk.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 hr-line border rounded-md hover:border-accent hover:-translate-y-0.5 transition-all"
            >
              <Mic size={18} className="mt-1 text-accent shrink-0" />
              <div>
                <h3 className="font-display">{talk.title}</h3>
                <p className="text-sm text-ink-light/70 dark:text-ink-dark/70">
                  {talk.event} · {talk.date}
                </p>
              </div>
            </a>
          </Reveal>
        ))}

        {talks.length === 0 && (
          <p className="text-sm text-ink-light/50">No talks added yet.</p>
        )}
      </div>
    </div>
  );
}
