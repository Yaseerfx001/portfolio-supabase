import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import type { Profile } from "@/lib/types";
import Reveal from "./Reveal";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <Reveal>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 flex flex-col items-center text-center gap-6">
        {/* Photo comes straight from content.json's "heroPhoto" URL, so
            swapping the picture is just editing that one field (or using
            the admin page). */}
        <div className="w-28 h-28 rounded-full overflow-hidden hr-line border">
          <SafeImage
            src={profile.heroPhoto}
            alt={profile.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <p className="text-sm tracking-wide text-accent">{profile.role}</p>

        <h1 className="font-display text-4xl sm:text-5xl leading-tight max-w-2xl">
          Hi, I&apos;m {profile.name}
        </h1>

        <p className="max-w-prose text-ink-light/80 dark:text-ink-dark/80">
          {profile.shortIntro}
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-md bg-accent text-white text-sm hover:bg-accent-light transition-colors"
          >
            View Projects
          </Link>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-md hr-line border text-sm hover:bg-ink-light/5 dark:hover:bg-ink-dark/10 transition-colors"
          >
            View CV
          </a>
        </div>
      </section>
    </Reveal>
  );
}
