# Troubleshooting Guide

This guide covers common beginner issues when setting up and running the Clipgenix Production site.

## 1. Node.js or npm is not recognized

### Likely cause
Node.js is not installed or the terminal was opened before installation.

### What to do
```powershell
node -v
npm -v
```

If this fails:
- install Node.js LTS
- close and reopen the VS Code terminal
- try again

### Corrective action
Install the current Node.js LTS version from https://nodejs.org and restart the terminal.

## 2. `npm install` fails

### Likely causes
- no internet connection
- outdated Node version
- corporate firewall or proxy
- folder path too long or permission issue

### Safe diagnostic steps
- confirm the internet is working
- confirm `node -v` prints a current version
- try again in a simpler path such as:

```text
C:\Users\YourName\Documents\ClipGenix Production
```

### Corrective action
Use a supported Node.js LTS version and rerun:

```powershell
npm install
```

## 3. Port already in use

### Likely cause
Another app is already using the default Vite port.

### Safe diagnostic steps
Look at the terminal output after running:

```powershell
npm run dev
```

Vite usually tells you the port it selected.

### Corrective action
Open the new local URL shown in the terminal, or stop the other app if you do not need it.

## 4. The website does not open in the browser

### Likely causes
- dev server not running
- wrong URL used
- browser blocked local access

### Safe diagnostic steps
Check that the terminal shows a URL such as:

```text
http://localhost:5173/
```

### Corrective action
Run:

```powershell
npm run dev
```

Then open the URL shown in the terminal.

## 5. Blank page after starting the app

### Likely causes
- missing image or broken asset path
- JavaScript error in the browser
- not enough time for the app to compile

### Safe diagnostic steps
- refresh the page
- check the browser console
- run `npm run build` to reveal compile-time errors

### Corrective action
Fix the broken asset path, reduce console errors, and rerun the app.

## 6. Missing images

### Likely cause
The file path in `src/data/projects.ts` does not match the actual file name or folder.

### Safe diagnostic steps
Open the file and confirm the path is spelled correctly.

Example:

```ts
coverImage: '/images/portfolio/Luvu.png'
```

Then check the actual file exists in:

```text
public/images/portfolio/
```

### Corrective action
Update the path or add the missing file.

## 7. Missing videos

### Likely cause
The video file was not added to `public/videos/` or the `videoSrc` path is incorrect.

### Safe diagnostic steps
Check the project object in `src/data/projects.ts` for:

```ts
mediaType: 'video',
videoSrc: '/videos/your-file.mp4'
```

Then confirm the file exists in the folder.

### Corrective action
Create the folder and file if needed, and update the path.

## 8. Changes do not appear

### Likely cause
The browser is still showing stale cached content or the dev server has not restarted.

### Safe diagnostic steps
- refresh the browser
- stop and restart `npm run dev`
- confirm the code file you edited is the one the app is reading

### Corrective action
Restart the dev server and reload the browser.

## 9. Build fails

### Likely causes
- TypeScript error
- asset path error
- invalid config

### Safe diagnostic steps
Run the actual project build command:

```powershell
npm run build
```

This is the best way to catch a real production problem.

### Corrective action
Fix the error reported in the terminal and rerun the build.

## 10. Vercel deployment fails

### Likely causes
- wrong build settings
- missing environment variables
- repo not imported correctly
- too many large files or unsupported config

### Safe diagnostic steps
Check Vercel build logs and confirm:

- install command is `npm install`
- build command is `npm run build`
- output directory is `dist`

### Corrective action
Use the settings from `docs/DEPLOYMENT_GUIDE.md` and redeploy.

## 11. Contact links do not work

### Likely causes
- email value missing
- mailto link not supported by the user device

### Safe diagnostic steps
Check `src/config/site.ts` and the `.env.example` values.

### Corrective action
Confirm the business email in `src/config/site.ts` or `VITE_CONTACT_EMAIL`, and confirm the device has a mail application configured for `mailto:` links.

## 12. Environment variables are missing

### Likely cause
The project relies on `VITE_*` variables that were not set.

### Safe diagnostic steps
Check:

- `.env.example`
- `.env.local` if created locally
- Vercel environment variables if deployed

### Corrective action
Add the correct values and restart the local Vite server.

## 13. Browser route shows a 404 after deployment

### Likely cause
The server is not configured to rewrite unknown routes to the app entry point.

### Corrective action
Ensure `vercel.json` is included and its rewrite is present.

## 14. Site is not yet deployed

This is not an error. It is the current state of the project.

The workspace is ready for handover, but deployment is still a manual step after the owner reviews concept disclosures, confirms contact details, and completes any required EmailJS setup.

## 15. EmailJS does not send an enquiry

Automatic sending works only after all three EmailJS values are configured:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Check the browser console and EmailJS dashboard, confirm the template variables listed in `docs/CONTACT_AND_BRAND_SETTINGS.md`, verify that the recipient is the business mailbox, and confirm the local or production origin is allowed. A failed request should display an error and offer an email draft; do not treat a failed request as a sent enquiry.

If EmailJS has not been configured, the form opens a `mailto:` draft. The visitor still needs to send it from their mail application.

Remember that all `VITE_*` settings are public in the browser bundle. Do not put an email password, private API key, or other secret in them.

## General advice

- Keep changes small and test them immediately.
- Use the project documentation instead of guessing.
- Do not add real secrets to the project or GitHub repo.
- When in doubt, use the real project files as the source of truth:
  - `src/config/site.ts`
  - `src/data/projects.ts`
  - `src/data/content.ts`
  - `vercel.json`
  - `.env.example`
