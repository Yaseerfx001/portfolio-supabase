import PageHeader from "@/components/PageHeader";
import { getContent } from "@/lib/content";
import { Mail, Linkedin, Github } from "lucide-react";

export default async function ContactPage() {
  const { profile, social } = await getContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="Contact"
        description="The easiest ways to reach me are below."
      />

      <div className="space-y-3 max-w-md">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-3 p-4 hr-line border rounded-md hover:border-accent hover:-translate-y-0.5 transition-all"
        >
          <Mail size={18} className="text-accent" />
          <span>{profile.email}</span>
        </a>

        {social.linkedin && (
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 hr-line border rounded-md hover:border-accent hover:-translate-y-0.5 transition-all"
          >
            <Linkedin size={18} className="text-accent" />
            <span>LinkedIn</span>
          </a>
        )}

        {social.github && (
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 hr-line border rounded-md hover:border-accent hover:-translate-y-0.5 transition-all"
          >
            <Github size={18} className="text-accent" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
}
