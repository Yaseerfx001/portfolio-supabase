# Yaseer Maruf — Portfolio

Next.js 14 (App Router) + Tailwind CSS, with a **Supabase** database and a
password-protected **/admin** page that edits everything on the site.

## How it works

- All site content (about text, stats, socials, footer, projects, blog...) lives in
  one row of a Supabase table called `site_content`.
- Uploaded photos and your CV are stored in a Supabase Storage bucket called
  `portfolio-images`.
- `data/content.json` is only the **starting content**. It is used until you press
  Save in the admin page for the first time. After that, the database is the source.
- `/admin` asks for a password. The password is checked on the **server** against
  the `ADMIN_PASSWORD` environment variable, so it never appears in the website's code.

## Setup (one time)

### 1. Create the Supabase project
1. Go to https://supabase.com, sign in, click **New project**.
2. When it is ready, open **SQL Editor -> New query**, paste everything from
   `supabase/schema.sql`, and click **Run**. This creates the table and the image bucket.
3. Open **Project Settings -> API** and copy:
   - the **Project URL**
   - the **service_role** key (keep this one secret: never share it or put it on GitHub)

### 2. Add environment variables
Copy `.env.local.example` to `.env.local` and fill it in:

```
SUPABASE_URL=...            (Project URL)
SUPABASE_SERVICE_ROLE_KEY=... (service_role key)
ADMIN_PASSWORD=...          (the password you will type on /admin)
SESSION_SECRET=...          (any long random text)
```

Run `npm install` then `npm run dev`, open http://localhost:3000/admin and log in.

### 3. On Vercel
In your Vercel project go to **Settings -> Environment Variables**, add the same four
variables, then **redeploy** (Deployments -> ... -> Redeploy). Admin edits made on the
live site are saved to Supabase, so they stay.

## Using the admin page

- **Home & About**: name, role, intro, both photos, about text, info chips, CV upload.
- **Stats**: the four counters (add or remove stats too).
- **Footer & Socials**: social links and the copyright text. Empty link = icon hidden.
- **Experience / Projects / Certifications / Blog / Research / Community / Talks / Honors**:
  add, edit, reorder and delete items.
- Click **Upload** next to any image field to upload a photo. Large photos are shrunk
  automatically. Files must be JPG, PNG, WebP or GIF (CV: PDF), max 4 MB after shrinking.
- Press **Save changes**. The site updates straight away, no redeploy needed.

## Security notes

- Pick a strong `ADMIN_PASSWORD`. A short or guessable one can be broken by repeated tries.
- Never commit `.env.local` (it is already in `.gitignore`).
- Anyone with an uploaded image's link can view that image, because the bucket is public.
  Only you (logged in) can upload or delete.
- Logging in lasts 8 hours, then you are asked for the password again.

## Project structure

```
app/                       pages (home, experience, projects, blog, ...)
app/admin/page.tsx         login + editor
app/api/admin/             login, logout, content (save), upload
components/admin/          form fields, list editor, section settings
lib/content.ts             read/save content (Supabase)
lib/auth.ts                password check + signed cookie
lib/supabase.ts            Supabase server client
supabase/schema.sql        run once in Supabase
data/content.json          starting content (used until first save)
```
