# Project File Guide

This guide explains the real structure of the Clipgenix Production project as it exists in this workspace.

## Project summary

- Framework: React 19
- Language: TypeScript
- Build tool: Vite
- Routing: React Router
- Animation: Motion for React (`motion` package)
- Styling: CSS, not Tailwind
- Deployment target: Vercel

Important audit result: Tailwind CSS is not configured in this project. There is no `tailwind.config.*` file and no Tailwind dependency in `package.json`.

## Top-level project structure

```text
ClipGenix Production/
├── .env.example
├── .gitignore
├── .oxlintrc.json
├── README.md
├── dist/
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── public/
├── src/
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
└── docs/
```

## Important files and folders

### `package.json`
- Purpose: Defines the project scripts, dependencies, and build tools.
- What it controls: `npm install`, `npm run dev`, `npm run build`, `npm run lint`, and `npm run preview`.
- When to edit: Only when adding or removing dependencies, scripts, or package versions.
- What not to change casually: The existing scripts and dependency versions unless you are intentionally updating the stack.

Current scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "oxlint",
  "preview": "vite preview"
}
```

### `.env.example`
- Purpose: Template for local environment variables.
- What it controls: confirmed business email, INR currency, site URL, and EmailJS configuration.
- When to edit: When confirmed contact, deployment, or EmailJS configuration changes.
- What not to change casually: Do not add real secrets or production credentials to this file.

The file contains placeholders only.

### `vercel.json`
- Purpose: Vercel rewrite settings for single-page app routes.
- What it controls: route fallback so pages such as `/portfolio` and `/portfolio/jenny-rose-rose-is-gold` work when opened directly.
- When to edit: Only if the deployment routing needs to be changed.
- Do not change casually: This is important for SPA routing on deployed builds.

### `vite.config.ts`
- Purpose: Standard Vite config with React plugin.
- What it controls: development server and React support.
- When to edit: Only if the build or plugin setup changes.

### `index.html`
- Purpose: Root HTML file used by Vite.
- What it controls: favicon, Google Fonts import, page title, social preview metadata, and the root `#root` application mount.
- When to edit: Only if the favicon, title, or base metadata need to change.
- Important: The page metadata is also updated dynamically in React for per-page titles and descriptions.

## `src/` directory

### `src/App.tsx`
- Purpose: Main route setup for the app.
- What it controls: BrowserRouter, route definitions, page lazy loading, scroll-to-top behavior.
- Important routes:
  - `/`
  - `/portfolio`
  - `/portfolio/:slug`
  - `/services`
  - `/contact`
  - `*` for 404

### `src/components/`
This folder holds reusable UI building blocks.

#### `src/components/SiteLayout.tsx`
- Purpose: Global layout for header, navigation, main content area, footer.
- Controls: navigation links, mobile menu, wordmark, footer links, and confirmed business email.
- Edit when: You need to update the header, footer, menu labels, or business contact display.

#### `src/components/Meta.tsx`
- Purpose: Updates page title, meta description, OG tags, and canonical link.
- Controls: SEO metadata per page.
- Edit when: You need to adjust metadata logic.

#### `src/components/ProjectCard.tsx`
- Purpose: Portfolio card for each project.
- Controls: card layout, image fallback, concept badge, hover effect.

#### `src/components/ProjectGrid.tsx`
- Purpose: Portfolio filter and data-driven grid.
- Controls: category filter buttons and project list rendering.

#### `src/components/Reveal.tsx`
- Purpose: Animated reveal wrapper for sections.
- Controls: motion-based section entrance animations.

#### `src/components/SectionHeading.tsx`
- Purpose: Reusable heading component used across pages.
- Controls: section heading styles and spacing.

### `src/config/site.ts`
- Purpose: Central site configuration.
- What it controls: brand name, tagline, confirmed email, site URL, INR currency, and EmailJS values.
- When to edit: For brand settings and contact URLs.
- Important: Reads values from environment variables first, then falls back to the confirmed Clipgenix business defaults.

### `src/data/content.ts`
- Purpose: Non-portfolio copy used across the site.
- What it controls:
  - services list
  - deliverables
  - process steps
  - FAQ content
- When to edit: When you want to change business messaging, service copy, or FAQs.

### `src/data/projects.ts`
- Purpose: All portfolio content is managed here.
- What it controls:
  - project slug
  - title
  - category
  - cover image path
  - media type
  - alt text
  - description
  - objective
  - approach
  - deliverables
  - featured flag
  - concept flag
- When to edit: To add or remove portfolio items.
- Important: This is the main file for portfolio management. Avoid editing multiple components just to add one project.

### `src/pages/`
This folder contains the main routes.

#### `src/pages/HomePage.tsx`
- Purpose: Homepage.
- Controls: hero, intro, featured portfolio, services, process, why choose us, FAQ, final CTA.
- Edit when: Homepage wording or structure changes.

#### `src/pages/PortfolioPage.tsx`
- Purpose: Portfolio gallery page.
- Controls: portfolio heading, campaign-concept and non-affiliation notice, project filter grid.

#### `src/pages/ProjectPage.tsx`
- Purpose: Individual project detail page.
- Controls: project concept objective, approach, study elements, media, disclosure, and related projects.
- Edit when: You want to change a single-project detail template.

#### `src/pages/ServicesPage.tsx`
- Purpose: Services overview page.
- Controls: service detail cards and process explanation.

#### `src/pages/ContactPage.tsx`
- Purpose: Contact and enquiry form.
- Controls: form validation, EmailJS/mailto behavior, and success/error messaging.
- Important: It submits through EmailJS if configured; otherwise it opens a mail draft. A failed request preserves the entered form and offers a mailto fallback.

#### `src/pages/NotFoundPage.tsx`
- Purpose: 404 page.

### `src/index.css`
- Purpose: Global CSS variables and base theme.
- Controls: fonts, brand colors, spacing tokens, body sizing, focus styles.
- Edit when: You need to change the global design system.

### `src/App.css`
- Purpose: Main stylesheet for page layout and all component styles.
- Controls: the large majority of visual styling, layout, cards, hero, footer, form, and responsiveness.
- Edit when: You need to change layout, spacing, or visual styling.

## `public/` directory

### `public/brand-icon.svg`
- Purpose: Default site icon / favicon.
- Edit when: You want to replace the wordmark favicon.

### `public/social-preview.png`
- Purpose: Social preview image used in metadata.
- Edit when: You want a branded social share image.

### `public/social-preview.svg`
- Purpose: Editable vector source for the preview artwork.

### `public/images/portfolio/`
- Purpose: Portfolio artwork folder.
- Contains the four supplied campaign-concept images: two PNGs and two JPEGs, all 1792 × 2400 pixels.
- Use this folder for image-based project artwork.

### `public/images/` and `public/videos/`
- There is currently no `public/videos/` directory in the project.
- If real video project work is added later, create a `public/videos/` folder and reference it in `src/data/projects.ts`.

## Asset ownership reminder

The current portfolio files are supplied concept studies, not confirmed commissions. Brand names or marks visible in the images do not establish client status, affiliation, or endorsement.

## Public-facing configuration notes

- Main homepage text is spread across `src/pages/HomePage.tsx` and data files.
- SEO titles and descriptions are set in page components using the `Meta` component.
- The final website has not been deployed yet; there is no live domain configured in the project.
