# Reclosed

Reclosed marketing site built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Motion. Pages: `/`, `/contact`, `/privacy-policy`, and `/terms-of-service`.

## Run locally

Use Node.js 20.9 or later and npm. From the project root:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The environment variable is optional for local development.

## Check and build

```sh
npm run typecheck && npm run lint && npm run build
npm start
```

`npm start` serves the production build.

## Contact webhook

Set `CONTACT_WEBHOOK_URL` in `.env.local` or the hosting environment to a Make/Zapier webhook URL. This is a server-only variable; do not prefix it with `NEXT_PUBLIC_`. Restart the server after changing it.

The contact form and footer audit form POST to `/api/contact`. The route validates the email and forwards `{ name, email, message, source, receivedAt }`, with `source: "reclosed.io"` and an ISO timestamp. `name` is optional and omitted for audit requests.

Responses: `200 { "ok": true }` on a successful webhook response, `400 { "error": "invalid_email" }` for invalid email or malformed JSON, `503 { "error": "not_configured" }` when the variable is empty, and `502 { "error": "upstream" }` on webhook or network failure. Failed submissions show the email fallback at nathan@reclosed.io.

## Open items before launch

- Supply Instagram, LinkedIn, and YouTube URLs in `data/site.ts`.
- Configure `CONTACT_WEBHOOK_URL` for the contact form and audit box.
- Replace the privacy policy and terms of service placeholder text with the owner's legal text.

## Reference material

The design spec is `docs/superpowers/specs/2026-09-05-reclosed-notus-clone-design.md`. The gitignored `reference/` directory contains the Notus DOM outlines, HTML, JavaScript chunks, styles, and screenshots under `reference/notus/`, existing Reclosed assets under `reference/old-site/`, and source copy under `reference/copy/`. Reference files are local implementation guides and are not shipped assets.
