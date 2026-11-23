import SafeImage from "@/components/SafeImage";
import { MapPin, GraduationCap, Target, Mail } from "lucide-react";
import type { Profile } from "@/lib/types";

export default function AboutSection({ profile }: { profile: Profile }) {
  const chips = [
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: GraduationCap, label: "Education", value: profile.education },
    { icon: Target, label: "Focus Areas", value: profile.focusAreas },
    { icon: Mail, label: "Contact", value: profile.email },
  ];

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-display text-2xl mb-6 text-center">About Me</h2>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">
        <div className="space-y-4">
          <div className="w-full aspect-[4/5] rounded-md overflow-hidden hr-line border">
            <SafeImage
              src={profile.aboutPhoto}
              alt={`${profile.name} portrait`}
              width={500}
              height={625}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-sm text-ink-light/80 dark:text-ink-dark/80">
            {profile.shortAbout}
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-ink-light/90 dark:text-ink-dark/90 leading-relaxed">
            {profile.longAbout}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {chips.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-3 rounded-md hr-line border"
              >
                <Icon size={18} className="mt-0.5 text-accent shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-ink-light/50 dark:text-ink-dark/50">
                    {label}
                  </div>
                  <div className="text-sm">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
