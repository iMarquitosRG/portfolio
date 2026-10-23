# marcosrivera.design

Portfolio of Marcos Rivera, Product Designer. Built with **Astro 7** (static), **GSAP** for motion, and design tokens generated from the Figma file *Portfolio Website*.

## Run it

Requires Node **22.23.4+** (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Where things live

| What | File |
| --- | --- |
| All copy outside the case studies | `src/data/site.ts` |
| Case study content (one file per case) | `src/content/cases/*.yaml` |
| Case study screenshots | `src/assets/cases/` (then set `src:` on a media block) |
| Design tokens (themes, glass, type, spacing) | `src/styles/tokens.css` |
| Components | `src/components/` |
| Motion | `src/scripts/motion.ts` |
| Accessibility panel logic | `src/scripts/prefs.ts` |
| Resume PDF | `public/Marcos-Rivera-Product-Designer-Resume.pdf` |

Anything in `[brackets]` in the case files is pending content.

## Accessibility settings

The panel maps 1:1 to the Figma variable modes, as attributes on `<html>`:

- `data-theme` dark · light (System follows the OS)
- `data-material` glass · solid (Reduce transparency)
- `data-contrast` normal · more (Increase contrast)
- `data-motion` full · reduce (also turns off GSAP entirely)
- `data-text-size` base · lg · xl (100 / 115 / 130 %, everything in rem)

Defaults follow the OS settings (`prefers-reduced-motion`, `prefers-contrast`, `prefers-reduced-transparency`). Choices are saved in `localStorage` and applied before first paint.

## Performance

- Zero framework JS: about 3 KB of scripts on every page.
- GSAP (~48 KB gzipped) is loaded only when motion is on.
- Photos are converted to responsive WebP at build time.
- Page transitions use native cross-document View Transitions (no JS).

## Deploy (Cloudflare)

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick this repo.

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION` = `22.23.4`

`public/_headers` sets long caching for hashed assets and basic security headers.

## Spanish (v2)

Add `'es'` to `i18n.locales` in `astro.config.mjs`, copy `src/data/site.ts` to a Spanish version, and add the pages under `src/pages/es/`.
