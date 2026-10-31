# Handover Checklist

## Audit completed

- [x] Reviewed the React + TypeScript + Vite routes, shared layout, contact form, site config, portfolio data, public assets, project scripts, lockfile, Vercel rewrite, and environment templates.
- [x] Removed unconfirmed phone and social contact paths from application code and user-facing setup documentation.
- [x] Kept the supplied portfolio images and concept/affiliation disclosures; verified all four image paths and the favicon resolve.
- [x] Confirmed the site URL is intentionally blank, the business email matches the approved address, currency is INR, and the configured EmailJS service/template IDs match the supplied IDs. The public key was checked for presence only and is not included in this document.
- [x] Confirmed `.gitignore` excludes `.env` and `.env.*` while allowing `.env.example`; the example contains no credentials.
- [x] Inspected the Vercel SPA rewrite and confirmed the expected `dist` build output.

## Validation performed

Commands run:

```powershell
npm.cmd run build
npm.cmd run lint
npm.cmd ls --depth=0
npm.cmd run dev -- --host 127.0.0.1
```

The TypeScript project check and Vite production build passed. Lint passed, top-level dependencies resolved, and the Vite development server started at `http://127.0.0.1:5173/`. There is no separate test script.

Browser checks covered `/`, `/services`, `/portfolio`, `/contact`, an unknown route, and all four project detail routes. Page titles rendered, all checked images loaded, and no console/runtime errors occurred on normal route loads. Responsive checks at 390, 500, 760, 1024, and 1440 pixels found no horizontal overflow. The mobile menu opened, navigated to Contact, and closed. Empty form submission focused the name field and exposed accessible validation feedback.

EmailJS success and failure were tested with locally intercepted mock responses only. A mocked 400 response showed an error, preserved entered values, and offered the email-draft fallback without showing success. A mocked 200 response showed success and cleared the fields. Two rapid mocked submissions produced one request. No real enquiry was sent, so inbox delivery remains unverified.

## Owner actions before launch

- [ ] Confirm the supplied concept images and visible third-party marks are approved for public display; do not imply client commission or endorsement without permission.
- [ ] In EmailJS, verify the fixed recipient is `officialclipgenix@gmail.com`, template variables match the documented payload, Reply-To uses `{{reply_to}}`, local and production origins are allowed, and abuse controls are enabled.
- [ ] Send a real test enquiry and verify receipt, spam handling, and reply-to behavior before claiming delivery works.
- [ ] Set `VITE_SITE_URL` only after the actual production URL exists.
- [ ] Initialize/select a Git repository and confirm `.env.local` is not committed; no `.git` metadata exists in this workspace, so tracked-file status could not be checked here.
- [ ] Configure the deployment provider with approved environment values, then deploy and verify the assigned URL and direct route refreshes. No push or deployment was performed during this audit.
