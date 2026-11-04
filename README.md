# Personal portfolio

A bilingual (English and Portuguese) personal portfolio built with Next.js App Router and TypeScript. It is a static export for GitHub Pages, with a dark-only token theme and an ATS-friendly PDF CV generated from the same validated content as the website.

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm test             # locale selection and locale-content parity
npm run build         # generates CVs, validates content, then exports to out/
```

## Edit content

Entity files in `src/content/` contain their types, type-checked shared data and explicit translation keys. Locale JSON files contain UI copy and translated portfolio fields; project technologies and skill names are keyed by their shared IDs. `src/content/translations.ts` validates common fields, project detail modules validate their own payloads, and `src/content/portfolio.ts` checks matching keys and assembles the final model.

To add a project, create its detail component and strict translation schema, then add its shared data, parser adapter, technologies, and `translationKey` in `src/content/project.tsx`. Add the matching project text and keyed technology translations to every locale JSON file. Build-time validation stops the build if a key is missing, unused, or malformed.

## Add a locale

1. Add the locale code to `src/i18n/routing.ts`.
2. Add a JSON dictionary in `src/translations/` with every required translation key.

The content loader discovers translation files automatically and rejects a missing configured locale or a file for an undeclared locale. The translation boundary validates every locale during the build.

## Theme

`src/styles/tokens.css` is the sole palette/scale source. Re-skin by changing its color, typography, spacing, radius, or shadow token values; components use the token names rather than color literals. The document is intentionally dark-only. PDF styling is separate in `src/pdf/cv-document.tsx` so the CV always remains black text on white paper.

## Deploy to GitHub Pages

1. Push this repository to GitHub and enable **Settings → Pages → GitHub Actions**.
2. Ensure the default branch is `main`, or update `.github/workflows/deploy.yml`.
3. Push to `main`; the workflow runs tests, exports `out/`, then deploys it.

The static export is configured for a GitHub Pages user site at the root URL. Local and deployed builds use the same root path. The workflow supplies the deployed URL for canonical and `hreflang` metadata. For a custom domain, set `NEXT_PUBLIC_SITE_URL` to that URL in the build environment and configure the domain in GitHub Pages.
