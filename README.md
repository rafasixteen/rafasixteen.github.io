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

Each entity file in `src/content/` owns its shared data, schema, inferred types, and explicit translation keys. Locale JSON files contain only the fields that vary by language, keyed by those translation keys.

To add a project, add its shared URL, technologies, and `translationKey` in `src/content/project.ts`, then add matching translated `summary` and `impact` entries to both locale JSON files. Build-time validation stops the build if a key is missing, unused, or malformed.

## Add a locale

1. Add the locale code to `src/i18n/routing.ts`.
2. Add a JSON dictionary in `src/translations/` with every required translation key.

The content loader discovers translation files automatically and rejects a missing configured locale or a file for an undeclared locale. The portfolio schema validates every locale during the build.

## Theme

`src/styles/tokens.css` is the sole palette/scale source. Re-skin by changing its color, typography, spacing, radius, or shadow token values; components use the token names rather than color literals. The document is intentionally dark-only. PDF styling is separate in `src/pdf/cv-document.tsx` so the CV always remains black text on white paper.

## Deploy to GitHub Pages

1. Push this repository to GitHub and enable **Settings → Pages → GitHub Actions**.
2. Ensure the default branch is `master`, or update `.github/workflows/deploy.yml`.
3. Push to `master`; the workflow runs tests, exports `out/`, then deploys it.

The Next config detects GitHub Actions’ `GITHUB_REPOSITORY`. It uses a `/repository-name` prefix for project Pages and no prefix for a `<owner>.github.io` root Pages repository. The workflow also supplies the deployed URL for canonical and `hreflang` metadata. For a custom domain, set `NEXT_PUBLIC_SITE_URL` to that URL in the build environment and configure the domain in GitHub Pages.
