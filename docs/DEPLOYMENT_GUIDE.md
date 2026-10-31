# Vercel Deployment Guide

This guide explains how to deploy the Clipgenix Production website to Vercel after it is ready for launch.

## What deployment means

Deployment means uploading the project to a hosting service so that it can be viewed in a browser using a public URL.

In simple terms:

- source code = the project files in your local computer or GitHub repo
- hosting = the server that runs the website online
- domain = the public URL assigned by Vercel or a custom domain selected by the owner

This repository is ready to be deployed, but it has not yet been deployed in this workspace.

## Difference between a repo and a live website

A GitHub repository stores the code. Vercel reads that code and builds a live website from it.

You do not need a custom domain to get started. The first deployment can use a Vercel-generated URL.

## Create or use a GitHub account

If you do not already have GitHub:

1. Open https://github.com
2. Sign up for a free account
3. Confirm the email address
4. Create a username and password

If the owner already has a GitHub account, use that account instead.

## Create a repository

In GitHub:

1. Click New repository
2. Choose a public or private repository as needed
3. Give it a clear name such as `clipgenix-production`
4. Do not add any secret environment values to the repo
5. Upload the project files or connect GitHub to the project folder

The project should be pushed as a regular code project, not as a zipped archive.

## Important files not to upload

Do not upload anything that contains real secrets, especially:

- `.env`
- `.env.local`
- `.env.production`
- private API keys or secret credentials

The repo already has a `.gitignore` that excludes `.env` files and places the example configuration in `.env.example` only.

## Connect the repository to Vercel

1. Open https://vercel.com
2. Sign in using the GitHub account
3. Click Add New Project
4. Import the repository from GitHub
5. Select the correct repo
6. Use the project settings shown below

### Vercel settings for this project

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

This matches the actual project configuration.

## Add environment variables

Use Vercel Project Settings → Environment Variables.

Add any values needed from `.env.example`, such as:

```env
VITE_SITE_URL=
VITE_CONTACT_EMAIL=
VITE_BUDGET_CURRENCY=INR
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

`VITE_CONTACT_EMAIL` may be left blank to use the confirmed business email. Set `VITE_SITE_URL` only to the actual assigned deployment URL, then redeploy so canonical and Open Graph URLs are absolute. Verify EmailJS's fixed recipient, template parameters, Reply-To, allowed origins, and abuse protections in its dashboard before relying on automatic delivery.

All `VITE_*` values are exposed in browser JavaScript. Never add email passwords, private API keys, or other secrets. The EmailJS public key is intended for browser use, but still requires provider-side domain restrictions and abuse controls. See `docs/CONTACT_AND_BRAND_SETTINGS.md` for exact template variables and owner setup steps.

## Deploy the site

After the repo and environment variables are configured:

1. Click Deploy
2. Wait for Vercel to build the project
3. Review the logs for errors
4. If successful, Vercel gives a live preview URL

Vercel assigns the actual URL and displays it in the project dashboard. Use only that verified URL; do not guess a Vercel or custom domain.

## Get the live URL

After a successful deployment, Vercel shows the assigned URL in the project dashboard. Do not report the site as live until the deployment succeeds and the URL has been checked.

## Add a custom domain later

Once the site is live, you can:

1. Open the Vercel project dashboard
2. Choose Domains
3. Add the custom domain
4. Update DNS settings with the domain provider
5. Wait for the SSL certificate to finish

This is optional and not required for the first deployment.

## Update the live website after editing

After code changes are committed to the GitHub repo:

1. Vercel automatically detects the update
2. It runs a new build
3. It redeploys the site automatically

If the repo is connected to Vercel correctly, this is usually automatic.

## Common deployment issues

### Build fails
Likely causes:
- missing dependency installation
- TypeScript errors
- incorrect project settings

Fix:
- run `npm install`
- run `npm run build` locally first
- confirm `dist` is the output directory

### Route problems on refresh
This project includes `vercel.json` to handle SPA routing, so the route fallback is already configured.

### Missing environment variables
If the app relies on contact or EmailJS values and they are missing, the forms may behave differently in production than in local development.

Fix:
- add the correct values to Vercel environment variables
- redeploy

### Domain not loading
Likely causes:
- DNS not yet propagated
- Vercel deployment still processing
- domain has not been added correctly

Fix:
- wait a few minutes
- check the Vercel dashboard
- confirm DNS records are correct

## Final reminder

This project is ready for deployment in principle, but it has not been deployed in the current workspace. The deploy step should happen only after the content is reviewed, real business details have been confirmed, and the final production URL is ready to share.
