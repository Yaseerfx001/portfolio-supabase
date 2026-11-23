import defaultContent from "@/data/content.json";
import { getSupabase } from "./supabase";
import type { SiteContent } from "./types";

// data/content.json is now just the STARTING content. Once you press Save in
// the admin page, everything is stored in the Supabase table "site_content"
// and that copy is what the website shows.
const defaults = defaultContent as unknown as SiteContent;

// Combine saved data with the defaults so a missing field (for example a new
// field added later) never crashes a page.
function mergeWithDefaults(saved: Partial<SiteContent>): SiteContent {
  return {
    ...defaults,
    ...saved,
    profile: { ...defaults.profile, ...saved.profile },
    social: { ...defaults.social, ...saved.social },
    footer: { ...defaults.footer, ...saved.footer },
  };
}

export async function getContent(): Promise<SiteContent> {
  const supabase = getSupabase();
  if (!supabase) return defaults; // Supabase not set up yet

  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Could not read content from Supabase:", error.message);
    return defaults;
  }
  if (!data) return defaults; // nothing saved yet

  return mergeWithDefaults(data.data as Partial<SiteContent>);
}

export async function saveContent(content: SiteContent): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (see README)."
    );
  }

  const { error } = await supabase
    .from("site_content")
    .upsert({ id: 1, data: content, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
}

// Basic check so a broken request can't wipe the site with garbage data.
// Returns an error message, or null if everything looks fine.
export function validateContent(input: unknown): string | null {
  if (typeof input !== "object" || input === null) return "Content must be an object.";
  const c = input as Record<string, unknown>;

  for (const key of ["profile", "social", "footer"]) {
    if (typeof c[key] !== "object" || c[key] === null) return `"${key}" is missing.`;
  }

  const listKeys = [
    "stats",
    "experience",
    "projects",
    "certifications",
    "blog",
    "research",
    "community",
    "talks",
    "honors",
  ];
  for (const key of listKeys) {
    if (!Array.isArray(c[key])) return `"${key}" must be a list.`;
  }

  if (JSON.stringify(input).length > 1_000_000) return "Content is too large.";
  return null;
}
