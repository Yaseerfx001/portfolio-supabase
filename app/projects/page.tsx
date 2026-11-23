import SafeImage from "@/components/SafeImage";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export default async function ProjectsPage() {
  const { projects } = await getContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="Projects"
        description="Things I've built, from hackathon prototypes to full pipelines."
      />

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Reveal key={project.id}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group hr-line border rounded-md overflow-hidden hover:border-accent hover:-translate-y-0.5 transition-all block h-full"
            >
              <div className="aspect-video overflow-hidden">
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm mt-1 text-ink-light/70 dark:text-ink-dark/70">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded hr-line border text-ink-light/60 dark:text-ink-dark/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}

        {projects.length === 0 && (
          <p className="text-sm text-ink-light/50">No projects added yet.</p>
        )}
      </div>
    </div>
  );
}
