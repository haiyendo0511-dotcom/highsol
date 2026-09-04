# Highsol

Premium one-page website concept for a Vietnam-based architectural parasol brand and OEM / ODM manufacturer.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Configure environment

Copy `.env.example` to `.env.local` and configure as needed:

```text
# Domain and SEO indexing
NEXT_PUBLIC_SITE_URL=https://highsol.pages.dev
NEXT_PUBLIC_SITE_INDEXABLE=false

# Inquiries
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
NEXT_PUBLIC_HIGHSOL_EMAIL=your_business_email
NEXT_PUBLIC_HIGHSOL_WHATSAPP=your_international_number
```

- When `NEXT_PUBLIC_SITE_INDEXABLE` is `false` (default for staging/previews), all pages emit `noindex, nofollow` and `robots.txt` disallows all crawlers.
- For production launch on the verified domain, set `NEXT_PUBLIC_SITE_URL` to the official domain and `NEXT_PUBLIC_SITE_INDEXABLE=true` to enable search engine & AI crawler indexing (`OAI-SearchBot`, `PerplexityBot`) and sitemap advertisement.
- Without a Formspree ID, the RFQ form intentionally runs in preview mode.

## Before publication

Read `docs/launch-replacement-checklist.md`. The generated imagery is for design review and must not be represented as proof of Highsol products, projects, or facilities.
