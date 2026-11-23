import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export default async function CommunityPage() {
  const { community } = await getContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader title="Community" description="Ways I stay involved outside of coursework." />

      <div className="space-y-6">
        {community.map((item) => (
          <Reveal key={item.id}>
            <div className="hr-line border-b pb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg">{item.title}</h3>
                <span className="text-xs text-ink-light/50 dark:text-ink-dark/50">
                  {item.period}
                </span>
              </div>
              <p className="mt-2 text-ink-light/80 dark:text-ink-dark/80">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}

        {community.length === 0 && (
          <p className="text-sm text-ink-light/50">Nothing added yet.</p>
        )}
      </div>
    </div>
  );
}
