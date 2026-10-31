# Clipgenix Production — Handover Guide

This project is a responsive React + TypeScript website for Clipgenix Production. It is designed to present the studio, explain its services, showcase portfolio concept work, and collect client enquiries.

## What is included

- Single-page app built with React, Vite, and TypeScript
- Routing for home, portfolio, portfolio detail, services, contact, and 404 pages
- Reusable layout, animated reveals, and section components
- Centralized brand, contact, and portfolio content data
- Public asset folder for images and other static files
- Vercel configuration for client-side routing

Important note: this project does not currently use Tailwind CSS. The styling is handled in `src/App.css` and `src/index.css` using plain CSS.

## Minimum requirements

Before you start, install:

- Node.js 20.19+ or 22.12+ (current LTS recommended; required by the Vite version in this project)
- VS Code
- Git (helpful for deployment later, but not required to run locally)

## Install Node.js LTS

1. Open https://nodejs.org in your browser.
2. Download the current LTS version.
3. Run the installer and follow the prompts.
4. After installation, reopen the terminal and check:

```powershell
node -v
npm -v
```

If both commands print versions, the installation worked.

## Install VS Code

1. Open https://code.visualstudio.com
2. Download the installer for Windows.
3. Run it and complete the setup.

## Extract the project ZIP

1. Download the project ZIP file.
2. Right-click the ZIP and choose Extract All.
3. Pick a folder such as:

```text
C:\Users\YourName\Documents\ClipGenix Production
```

Do not keep the project inside a OneDrive folder if you want the simplest setup; either location works, but a normal local folder is easiest.

## Open the project in VS Code

1. Open VS Code.
2. Click File → Open Folder.
3. Choose the extracted project folder.
4. Wait a moment for the editor to load the files.

## Open the integrated terminal

In VS Code:

- Press Ctrl + `
- Or go to Terminal → New Terminal

The terminal opens in the project root folder.

## Install dependencies

From the project folder, run:

```powershell
npm.cmd install
```

This installs the dependencies from `package.json` and creates `node_modules` for local development.

## Run the website locally

Use the existing project command:

```powershell
npm.cmd run dev
```

This starts the Vite development server.

When it starts, Vite usually prints a URL such as:

```text
http://localhost:5173/
```

Open that URL in your browser. If port 5173 is busy, Vite may choose another port and show the new address in the terminal.

## Stop the development server

In the terminal, press:

```text
Ctrl + C
```

That stops the local dev server.

## Common beginner problems

### 1. `node` or `npm` is not recognized
Cause: Node.js is not installed or the terminal was opened before installation.

Fix:
- Install Node.js LTS.
- Close and reopen the terminal.
- Run `node -v` again.

### 2. `npm install` fails
Possible causes:
- No internet connection
- Proxy or company firewall rule
- Older Node version

Fix:
- Check internet access
- Use a supported Node.js LTS version
- Re-run `npm install`

### 3. The app opens, but the page is blank
Possible causes:
- A missing image path
- A broken route
- Environment variables are missing
- Build or syntax issue

Fix:
- Check the browser console for errors
- Confirm the app started from `npm run dev`
- Run `npm run build` to check for production-level errors

### 4. The browser says the page is not found
This project uses client-side routing. On a local dev server this is usually fine in the browser. In production, Vercel is configured to redirect unknown paths to the SPA entry using `vercel.json`.

### 5. Changes do not appear immediately
Try:
- Refresh the browser
- Confirm the dev server is still running
- Stop and restart with `npm run dev`

## Run build and lint checks

Run the production build and TypeScript checks:

```powershell
npm run build
```

This creates a production bundle in the `dist` folder.

Run the linter:

```powershell
npm run lint
```

These are the available project checks; there is no separate `npm test` script.

## Preview the production build locally

After building, run:

```powershell
npm run preview
```

This starts a local preview of the production bundle. Use it to verify the build behaves like the deployed version.

## Deploy to Vercel

This project is not deployed yet. To publish it later:

1. Create a GitHub account if needed.
2. Upload the project to a GitHub repository.
3. Open Vercel.
4. Import the repository.
5. Use these settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: `dist`
6. Add environment variables from `.env.example` if the project needs them.
7. Deploy.

That process is described in more detail in `docs/DEPLOYMENT_GUIDE.md`.

## Safe content updates

The website is designed to keep content in a few central places instead of scattering it across many components.

Most updates can be made here:

- `src/config/site.ts` — contact and brand configuration
- `src/data/content.ts` — services, FAQs, process steps
- `src/data/projects.ts` — portfolio records
- `src/pages/HomePage.tsx` — main homepage text and layout
- `src/components/SiteLayout.tsx` — navigation and footer

Do not change files casually if you are unsure. If you are replacing real client media, check the file paths and ensure the project still loads before publishing.

## Important project notes

- The four supplied portfolio images are presented as campaign concepts, not confirmed client commissions. Visible third-party names or marks do not imply affiliation or endorsement.
- The only confirmed public contact detail is `officialclipgenix@gmail.com`. Currency defaults to INR.
- The contact form uses EmailJS only when all three required EmailJS values are set.
- If EmailJS is not configured, the page opens a mail draft. A failed EmailJS request shows an error, preserves the enquiry, and offers a mail draft; copying the enquiry does not send it.
- All `VITE_*` values are included in browser code. Never put passwords, private API keys, or other secrets in them. The EmailJS public key is intended for browser use and must be protected with provider-side origin and abuse controls.
- No production domain is configured in this project yet.

## Configure EmailJS

Automatic sending requires all three values below in the local environment and in Vercel:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

In the EmailJS dashboard, connect the owner's approved email service, create a template whose recipient is fixed to `officialclipgenix@gmail.com`, and add these template variables exactly:

- `from_name`
- `reply_to`
- `business_name`
- `service`
- `budget`
- `deadline`
- `message`

In EmailJS, confirm the template recipient is fixed to the business mailbox, set Reply-To to `{{reply_to}}`, match all payload variables, and allow the local and eventual production origins. Review the provider's abuse protections, then send a real test enquiry and verify receipt and reply-to behavior. A resolved SDK request alone does not confirm inbox delivery. See [docs/CONTACT_AND_BRAND_SETTINGS.md](./docs/CONTACT_AND_BRAND_SETTINGS.md) for exact checks and fallback behavior.

## Project documentation

This handover includes additional guides:

- `docs/FILE_GUIDE.md` — explains the project structure and major files
- `docs/ADD_IMAGES_AND_VIDEOS.md` — how to add or replace project media
- `docs/CONTACT_AND_BRAND_SETTINGS.md` — how to change contact and brand details
- `docs/DEPLOYMENT_GUIDE.md` — how to publish on Vercel
- `docs/TROUBLESHOOTING.md` — beginner troubleshooting
- `docs/HANDOVER_CHECKLIST.md` — final delivery checklist

## Prepare a handover ZIP

When packaging the project for a non-technical owner, include the project source code, `package.json`, `package-lock.json`, `vercel.json`, `.env.example`, `public/`, `src/`, `README.md`, and the full `docs/` folder.

Exclude:

- `node_modules/`
- any real `.env` files
- any local secrets or personal credentials
- generated build output that is not needed for editing

This keeps the package portable and safe to share.

## Final reminder

This website is ready to run locally and is not deployed. Before publishing, the owner should review the supplied concept artwork and any visible brand marks, confirm whether any work is an authorized commission, configure EmailJS if automatic delivery is wanted, and follow the Vercel deployment guide.
