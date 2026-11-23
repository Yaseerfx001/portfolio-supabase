import { Linkedin, Github, Twitter, Instagram, Mail, Link2 } from "lucide-react";
import type { SocialLinks } from "@/lib/types";

export default function Footer({
  social,
  copyright,
}: {
  social: SocialLinks;
  copyright: string;
}) {
  // Each entry maps a social key from content.json to its icon + href.
  // Add/remove one here to change what shows in the footer.
  const icons = [
    { key: "linkedin", Icon: Linkedin, href: social.linkedin, label: "LinkedIn" },
    { key: "github", Icon: Github, href: social.github, label: "GitHub" },
    { key: "twitter", Icon: Twitter, href: social.twitter, label: "Twitter / X" },
    { key: "instagram", Icon: Instagram, href: social.instagram, label: "Instagram" },
    { key: "email", Icon: Mail, href: social.email ? `mailto:${social.email}` : "", label: "Email" },
    { key: "linktree", Icon: Link2, href: social.linktree, label: "Linktree" },
  ];

  return (
    <footer className="hr-line border-t mt-16">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-ink-light/60 dark:text-ink-dark/60">
          {copyright}
        </p>

        <div className="flex items-center gap-3">
          {icons
            .filter((item) => item.href) // skip any social link left blank
            .map(({ key, Icon, href, label }) => (
              <a
                key={key}
                href={href}
                target={key === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-full hover:bg-accent/10 hover:text-accent transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
