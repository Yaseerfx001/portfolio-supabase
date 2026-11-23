import type { FieldDef } from "./fields";

// Everything the admin page can edit is described here.
// To add a new field to the site later, add one line to the matching list.

export const PROFILE_FIELDS: FieldDef[] = [
  { key: "name", label: "Name (navbar and hero)" },
  { key: "role", label: "Role (shown above the name)" },
  { key: "heroPhoto", label: "Hero photo (top of home page)", type: "image" },
  { key: "shortIntro", label: "Hero intro (text under the name)", type: "textarea", rows: 3 },
  { key: "aboutPhoto", label: "About photo", type: "image" },
  { key: "shortAbout", label: "Short about (under the about photo)", type: "textarea", rows: 3 },
  { key: "longAbout", label: "Long about (main about text)", type: "textarea", rows: 8, help: "Shown in the About Me section." },
  { key: "location", label: "Location" },
  { key: "education", label: "Education" },
  { key: "focusAreas", label: "Focus areas" },
  { key: "email", label: "Contact email" },
  { key: "cvUrl", label: "CV (the View CV button)", type: "pdf" },
];

export const STAT_FIELDS: FieldDef[] = [
  { key: "label", label: "Label" },
  { key: "value", label: "Number", type: "number" },
];

export const SOCIAL_FIELDS: FieldDef[] = [
  { key: "linkedin", label: "LinkedIn link" },
  { key: "github", label: "GitHub link" },
  { key: "twitter", label: "Twitter / X link" },
  { key: "instagram", label: "Instagram link" },
  { key: "email", label: "Email address", help: "Just the address, e.g. name@gmail.com" },
  { key: "linktree", label: "Linktree link" },
];

export const FOOTER_FIELDS: FieldDef[] = [
  { key: "copyright", label: "Copyright text" },
];

// One entry per list section (each one is a tab in the admin page)
export interface ListSection {
  key: string; // the key inside the content object
  label: string; // tab name
  titleKey: string;
  idPrefix: string;
  addLabel: string;
  fields: FieldDef[];
  blankItem: Record<string, any>;
}

export const LIST_SECTIONS: ListSection[] = [
  {
    key: "experience",
    label: "Experience",
    titleKey: "title",
    idPrefix: "exp",
    addLabel: "Add experience",
    fields: [
      { key: "title", label: "Role / title" },
      { key: "org", label: "Organisation" },
      { key: "period", label: "Period", help: "e.g. Jun 2025 — Aug 2025" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tags", label: "Tags", type: "tags", help: "Separate with commas" },
    ],
    blankItem: { title: "", org: "", period: "", description: "", tags: [] },
  },
  {
    key: "projects",
    label: "Projects",
    titleKey: "title",
    idPrefix: "project",
    addLabel: "Add project",
    fields: [
      { key: "title", label: "Title" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Image", type: "image" },
      { key: "tags", label: "Tags", type: "tags", help: "Separate with commas" },
      { key: "link", label: "Project link (GitHub, live demo...)" },
    ],
    blankItem: { title: "", description: "", image: "", tags: [], link: "" },
  },
  {
    key: "certifications",
    label: "Certifications",
    titleKey: "title",
    idPrefix: "cert",
    addLabel: "Add certification",
    fields: [
      { key: "title", label: "Title" },
      { key: "issuer", label: "Issuer" },
      { key: "date", label: "Date / year" },
      { key: "credentialUrl", label: "Credential link" },
    ],
    blankItem: { title: "", issuer: "", date: "", credentialUrl: "" },
  },
  {
    key: "blog",
    label: "Blog",
    titleKey: "title",
    idPrefix: "post",
    addLabel: "Add blog post",
    fields: [
      { key: "title", label: "Title" },
      { key: "date", label: "Date", help: "Use YYYY-MM-DD, e.g. 2026-03-14 (used to sort posts)" },
      { key: "coverImage", label: "Cover image", type: "image" },
      { key: "excerpt", label: "Short excerpt", type: "textarea", rows: 2 },
      { key: "content", label: "Full post", type: "textarea", rows: 12, help: "Leave a blank line between paragraphs." },
    ],
    blankItem: {
      title: "",
      date: new Date().toISOString().slice(0, 10),
      coverImage: "",
      excerpt: "",
      content: "",
    },
  },
  {
    key: "research",
    label: "Research",
    titleKey: "title",
    idPrefix: "research",
    addLabel: "Add research",
    fields: [
      { key: "title", label: "Title" },
      { key: "venue", label: "Venue / publication" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link" },
    ],
    blankItem: { title: "", venue: "", description: "", link: "" },
  },
  {
    key: "community",
    label: "Community",
    titleKey: "title",
    idPrefix: "community",
    addLabel: "Add community role",
    fields: [
      { key: "title", label: "Title" },
      { key: "period", label: "Period" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    blankItem: { title: "", period: "", description: "" },
  },
  {
    key: "talks",
    label: "Talks",
    titleKey: "title",
    idPrefix: "talk",
    addLabel: "Add talk",
    fields: [
      { key: "title", label: "Title" },
      { key: "event", label: "Event" },
      { key: "date", label: "Date" },
      { key: "link", label: "Link" },
    ],
    blankItem: { title: "", event: "", date: "", link: "" },
  },
  {
    key: "honors",
    label: "Honors",
    titleKey: "title",
    idPrefix: "honor",
    addLabel: "Add honor",
    fields: [
      { key: "title", label: "Title" },
      { key: "date", label: "Date / year" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    blankItem: { title: "", date: "", description: "" },
  },
];
