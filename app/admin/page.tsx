"use client";

import { useEffect, useState } from "react";
import { LogOut, ExternalLink, AlertTriangle } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { ObjectEditor } from "@/components/admin/fields";
import ListEditor from "@/components/admin/ListEditor";
import {
  PROFILE_FIELDS,
  STAT_FIELDS,
  SOCIAL_FIELDS,
  FOOTER_FIELDS,
  LIST_SECTIONS,
} from "@/components/admin/sections";

type AuthState = "checking" | "loggedOut" | "loggedIn";

// Tabs along the top of the editor
const TABS = [
  { id: "profile", label: "Home & About" },
  { id: "stats", label: "Stats" },
  { id: "footer", label: "Footer & Socials" },
  ...LIST_SECTIONS.map((s) => ({ id: s.key, label: s.label })),
];

export default function AdminPage() {
  const [auth, setAuth] = useState<AuthState>("checking");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(true);
  const [tab, setTab] = useState("profile");
  const [status, setStatus] = useState("");
  const [dirty, setDirty] = useState(false); // true when there are unsaved edits

  // Try to load the content. If we aren't logged in the server says 401.
  async function loadContent() {
    const res = await fetch("/api/admin/content");
    if (!res.ok) {
      setAuth("loggedOut");
      return;
    }
    const data = await res.json();
    setContent(data.content);
    setSupabaseReady(data.supabaseReady);
    setAuth("loggedIn");
  }

  useEffect(() => {
    loadContent();
  }, []);

  // Warn before closing the tab if there are unsaved changes
  useEffect(() => {
    function warn(e: BeforeUnloadEvent) {
      if (dirty) e.preventDefault();
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function change(next: SiteContent) {
    setContent(next);
    setDirty(true);
    setStatus("");
  }

  async function handleSave() {
    if (!content) return;
    setStatus("Saving…");

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (res.status === 401) {
      setAuth("loggedOut");
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setDirty(false);
      setStatus("Saved. Your site is updated.");
    } else {
      setStatus(`Could not save: ${data.error ?? "unknown error"}`);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setContent(null);
    setDirty(false);
    setAuth("loggedOut");
  }

  // ---------- Screens ----------
  if (auth === "checking") {
    return <div className="mx-auto max-w-3xl px-6 py-16 text-sm">Loading…</div>;
  }

  if (auth === "loggedOut") {
    return <LoginForm onSuccess={loadContent} />;
  }

  if (!content) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-3xl">Admin</h1>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-ink-light/15 dark:border-ink-dark/20 text-sm hover:border-accent transition-colors"
          >
            <ExternalLink size={14} /> View site
          </a>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-ink-light/15 dark:border-ink-dark/20 text-sm hover:border-accent transition-colors"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </div>

      {!supabaseReady && (
        <div className="flex gap-3 p-4 mb-6 rounded-md border border-amber-400/50 bg-amber-50 dark:bg-amber-950/30 text-sm">
          <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-600" />
          <p>
            Supabase isn&apos;t connected yet, so saving and uploading won&apos;t work. Add
            SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment variables
            (see the README), then restart.
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              tab === t.id
                ? "bg-accent text-white"
                : "border border-ink-light/15 dark:border-ink-dark/20 hover:border-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pb-28">
        {tab === "profile" && (
          <ObjectEditor
            value={content.profile as unknown as Record<string, any>}
            fields={PROFILE_FIELDS}
            onChange={(next) => change({ ...content, profile: next as SiteContent["profile"] })}
          />
        )}

        {tab === "stats" && (
          <ListEditor
            items={content.stats}
            fields={STAT_FIELDS}
            titleKey="label"
            idPrefix="stat"
            blankItem={{ label: "", value: 0 }}
            addLabel="Add stat"
            onChange={(next) => change({ ...content, stats: next as SiteContent["stats"] })}
          />
        )}

        {tab === "footer" && (
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-xl mb-4">Social icons</h2>
              <p className="text-sm mb-4 text-ink-light/60 dark:text-ink-dark/60">
                Leave a link empty to hide that icon from the footer.
              </p>
              <ObjectEditor
                value={content.social as unknown as Record<string, any>}
                fields={SOCIAL_FIELDS}
                onChange={(next) => change({ ...content, social: next as SiteContent["social"] })}
              />
            </section>
            <section>
              <h2 className="font-display text-xl mb-4">Footer text</h2>
              <ObjectEditor
                value={content.footer as unknown as Record<string, any>}
                fields={FOOTER_FIELDS}
                onChange={(next) => change({ ...content, footer: next as SiteContent["footer"] })}
              />
            </section>
          </div>
        )}

        {LIST_SECTIONS.map(
          (section) =>
            tab === section.key && (
              <ListEditor
                key={section.key}
                items={(content as any)[section.key]}
                fields={section.fields}
                titleKey={section.titleKey}
                idPrefix={section.idPrefix}
                blankItem={section.blankItem}
                addLabel={section.addLabel}
                onChange={(next) => change({ ...content, [section.key]: next } as SiteContent)}
              />
            )
        )}
      </div>

      {/* Save bar always visible at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-paper-light/95 dark:bg-paper-dark/95 backdrop-blur border-t border-ink-light/10 dark:border-ink-dark/10">
        <div className="mx-auto max-w-3xl px-6 py-3 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!dirty}
            className="px-5 py-2 rounded-md bg-accent text-white text-sm hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save changes
          </button>
          <span className="text-sm text-ink-light/70 dark:text-ink-dark/70">
            {status || (dirty ? "You have unsaved changes." : "All changes saved.")}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------- Login screen ----------
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (res.ok) {
      onSuccess();
    } else {
      setError(data.error ?? "Could not log in.");
    }
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="font-display text-3xl mb-2">Admin</h1>
      <p className="text-sm mb-6 text-ink-light/60 dark:text-ink-dark/60">
        Enter the password to edit your site.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-md border border-ink-light/15 dark:border-ink-dark/20 bg-transparent px-3 py-2 text-sm focus:border-accent outline-none"
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full px-5 py-2.5 rounded-md bg-accent text-white text-sm hover:bg-accent-light transition-colors disabled:opacity-50"
        >
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
