import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { Award } from "lucide-react";

export default async function CertificationsPage() {
  const { certifications } = await getContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader title="Certifications" description="Courses and credentials I've earned." />

      <div className="grid sm:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <Reveal key={cert.id}>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 hr-line border rounded-md hover:border-accent hover:-translate-y-0.5 transition-all"
            >
              <Award size={18} className="mt-1 text-accent shrink-0" />
              <div>
                <h3 className="font-display">{cert.title}</h3>
                <p className="text-sm text-ink-light/70 dark:text-ink-dark/70">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </a>
          </Reveal>
        ))}

        {certifications.length === 0 && (
          <p className="text-sm text-ink-light/50">No certifications added yet.</p>
        )}
      </div>
    </div>
  );
}
