import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Name of the storage bucket that holds uploaded images / CV (created in supabase/schema.sql)
export const IMAGE_BUCKET = "portfolio-images";

let client: SupabaseClient | null = null;

// This only ever runs on the server (pages, API routes), so the service role
// key is never sent to the browser. If the env vars are missing we return null
// and the site falls back to data/content.json, so it still runs before Supabase
// is set up.
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false },
      global: {
        // Next.js caches fetch() calls by default. We turn that off so edits
        // made in the admin page show up on the site right away.
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });
  }
  return client;
}
