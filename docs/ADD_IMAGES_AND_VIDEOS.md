# Portfolio Images and Videos

Portfolio entries are managed in `src/data/projects.ts`. The four supplied portfolio images are used with their original file formats and current filenames.

## Current portfolio image mapping

| Project | Actual file in `public/images/portfolio/` | Category |
|---|---|---|
| Jenny Rose — Rose Is Gold | `watermark-removed-1000027519.png` | Product Photography |
| LUVU — Lip Gloss Berry Kiss | `Luvu.png` | Product Photography |
| Denim Icons — Fashion Campaign | `Woman_striding_past_denim_bag_2K_202609052231.jpeg` | Ad Creatives |
| Natural Haircare — Shampoo & Balm | `Woman_holding_hair_care_bottles_2K_20261009225643.jpg.jpeg` | Product Photography |

All four images are 1792 × 2400 pixels. Keep exact case and extensions when referencing the files. In particular, `.jpg.jpeg` is the haircare file's actual name and must not be changed by renaming its extension.

## Add or replace an image

1. Put the approved image in `public/images/portfolio/`.
2. Confirm its actual filename, format, and dimensions in File Explorer.
3. Update the matching `coverImage` in `src/data/projects.ts` to a public URL beginning with `/images/portfolio/` (do not include `public`).
4. Update the corresponding `alt`, `title`, `description`, `objective`, `approach`, and `deliverables` to match the supplied image and owner-confirmed facts.
5. Keep `concept: true` unless the owner confirms the work was commissioned and approves the use of any associated names and marks.
6. Run `npm run build`, then check the portfolio card and detail page locally.

For example, the LUVU record uses:

```ts
coverImage: '/images/portfolio/Luvu.png',
```

Do not silently substitute stock or generated images for a missing owner-supplied asset. Do not invent a client, endorsement, project result, sales figure, or testimonial.

## Update project copy and routes

Each project in `src/data/projects.ts` includes:

- `slug`: unique route segment used by `/portfolio/:slug`
- `title` and `category`: visible card and detail-page labels
- `coverImage` and `alt`: public image path and meaningful alternative text
- `description`, `objective`, and `approach`: truthful project context
- `deliverables`: concept elements, not a claim that work was commissioned or delivered
- `featured`: whether the item appears on the homepage
- `concept`: whether the item is concept work rather than a confirmed commission

When changing a slug, verify the new detail route directly. Keep each slug unique.

## Image behavior

Grid images are lazy-loaded and displayed in a portrait 3:4 frame to preserve the supplied compositions. Project detail images load eagerly and fit the same portrait frame without cropping. A visible fallback is shown if an image cannot load. The two supplied PNGs were losslessly optimized with their pixels and metadata preserved. Further optimization should be visually checked, and an extension must never be changed without actually converting the file format.

## Videos

There is no `public/videos/` folder or video project currently. To add an approved video, create `public/videos/`, add a supported video file, and set `mediaType: 'video'` and `videoSrc` in the matching project record. Keep a working cover image in `coverImage` as the poster and fallback.

## Concept and brand disclosure

The supplied images are presented as campaign concepts, not confirmed commissions. Brand names or marks visible in the artwork do not establish client status, affiliation, or endorsement. Keep this disclosure unless the owner verifies the relationship and approves the relevant brand use.
