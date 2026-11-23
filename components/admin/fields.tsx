"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

// Describes one editable field. The admin page uses a list of these to build
// each form, so adding a new field = adding one line to the list.
export interface FieldDef {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "tags" | "image" | "pdf";
  rows?: number; // for textarea
  help?: string; // small hint under the field
}

const inputClass =
  "w-full rounded-md border border-ink-light/15 dark:border-ink-dark/20 bg-transparent px-3 py-2 text-sm focus:border-accent outline-none";
const labelClass =
  "block text-xs uppercase tracking-wide text-ink-light/60 dark:text-ink-dark/60 mb-1";

// ---------- Edits one object (e.g. the profile, or one project) ----------
export function ObjectEditor({
  value,
  fields,
  onChange,
}: {
  value: Record<string, any>;
  fields: FieldDef[];
  onChange: (next: Record<string, any>) => void;
}) {
  return (
    <div className="space-y-4">
      {fields.map((def) => (
        <FieldInput
          key={def.key}
          def={def}
          value={value[def.key]}
          onChange={(v) => onChange({ ...value, [def.key]: v })}
        />
      ))}
    </div>
  );
}

// ---------- Picks the right input for a field type ----------
function FieldInput({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: any;
  onChange: (v: any) => void;
}) {
  const type = def.type ?? "text";

  return (
    <div>
      <label className={labelClass}>{def.label}</label>

      {type === "text" && (
        <input
          className={inputClass}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {type === "textarea" && (
        <textarea
          className={inputClass}
          rows={def.rows ?? 4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {type === "number" && (
        <input
          type="number"
          className={inputClass}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}

      {type === "tags" && <TagsInput value={value ?? []} onChange={onChange} />}

      {(type === "image" || type === "pdf") && (
        <UploadInput kind={type} value={value ?? ""} onChange={onChange} />
      )}

      {def.help && (
        <p className="text-xs mt-1 text-ink-light/50 dark:text-ink-dark/50">{def.help}</p>
      )}
    </div>
  );
}

// ---------- Tags: typed as "Python, SQL, Pandas", stored as a list ----------
function TagsInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  // Keep the raw text locally so typing commas and spaces feels normal
  const [text, setText] = useState(value.join(", "));

  return (
    <input
      className={inputClass}
      value={text}
      placeholder="Python, SQL, Pandas"
      onChange={(e) => {
        setText(e.target.value);
        onChange(
          e.target.value
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        );
      }}
    />
  );
}

// ---------- Big phone photos are shrunk before upload ----------
// Vercel only accepts uploads up to ~4.5 MB, so anything over 3 MB gets
// resized (max 1800px) and saved as a JPG first.
async function shrinkImage(file: File): Promise<File> {
  if (file.size <= 3 * 1024 * 1024) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.85)
  );
  if (!blob) throw new Error("Could not resize the image.");
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}

// ---------- Upload button + URL box + preview ----------
function UploadInput({
  kind,
  value,
  onChange,
}: {
  kind: "image" | "pdf";
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    e.target.value = ""; // lets you pick the same file again later
    if (!picked) return;

    setError("");
    setUploading(true);
    try {
      const file = kind === "image" ? await shrinkImage(picked) : picked;
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Upload failed.");

      onChange(data.url); // the new public link goes straight into the field
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {kind === "image" && value && (
        // Plain <img> is fine inside the admin page
        <img
          src={value}
          alt="Preview"
          className="h-28 w-auto rounded-md border border-ink-light/15 dark:border-ink-dark/20 object-cover"
        />
      )}

      <div className="flex gap-2">
        <input
          className={inputClass}
          value={value}
          placeholder={kind === "image" ? "Upload below, or paste an image link" : "Upload a PDF below, or paste a link"}
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-ink-light/15 dark:border-ink-dark/20 text-sm cursor-pointer hover:border-accent transition-colors">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Uploading…" : "Upload"}
          <input
            type="file"
            className="hidden"
            accept={kind === "image" ? "image/jpeg,image/png,image/webp,image/gif" : "application/pdf"}
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>

      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
