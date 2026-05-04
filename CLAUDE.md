# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
ng serve                              # Dev server at http://localhost:4200
ng build                              # Build (dev)
ng build --configuration production   # Production build
npm run serve:prod                    # Run SSR server after prod build

# Testing
ng test                               # Run all tests (Vitest)

# Deployment
ng deploy                             # Deploy to GitHub Pages via angular-cli-ghpages
```

## Architecture

**Single-page Angular 21 portfolio** with SSR (Express), anchor-based scroll navigation, and bilingual support (ES/EN).

### Navigation model
There is **no router-based navigation** — `app.routes.ts` is intentionally empty. Navigation works via hash anchors (`#hero`, `#about`, etc.) controlled by `ScrollService`, which intercepts wheel/keyboard events and scrolls one section at a time with an 800ms cooldown lock.

### Component structure
All components are standalone with OnPush change detection. They live in `src/app/components/` and map 1:1 to scroll sections: `hero`, `about`, `experience`, `skills`, `education`, `certifications`, `contact`. Overlay components (`nav-dots`, `lang-toggle`, `cv-download`) are not sections.

### Data flow
Static portfolio content lives in `src/app/data/portfolio.data.ts` as typed constants (models in `src/app/models/portfolio.model.ts`). All user-visible strings are translation keys passed through `TranslatePipe` — the actual text is in `src/assets/i18n/es.json` and `src/assets/i18n/en.json`. The inline `TranslateLoader` (`src/app/services/translate-loader.ts`) imports these JSON files at build time — no HTTP calls at runtime.

### Key services
- **`ScrollService`** — Browser-only (initialized in `afterNextRender()`). Exposes Angular signals: `currentIndex`, `isLocked`, `currentSectionId`. Handles `prefers-reduced-motion`, touchpad noise filtering, and skips keyboard nav when focus is inside form fields.
- **`LanguageService`** — Persists selection to `localStorage` key `'lang'`, auto-detects from `navigator.language`, sets `<html lang>` attribute.

### SSR considerations
`ScrollService.initialize()` and any browser-only APIs must only run inside `afterNextRender()` or be guarded with `isPlatformBrowser`. The SSR entry is `src/main.server.ts` + `src/server.ts` (Express 5).

## Skills

Use these skills (via `/skill-name`) for common tasks in this project:

- **`angular-skill`** — When creating or modifying components, services, pipes, or any Angular-specific code.
- **`pr-description`** — When creating a pull request; generates the PR description from the diff.
- **`simplify`** — After implementing a feature or fix, to review changed code for quality and redundancy.
- **`security-review`** — Before merging changes that touch services, SSR config, or external data handling.
- **`update-config`** — To add hooks, permissions, or environment variables to Claude Code settings.
- **`init`** — To regenerate or update this CLAUDE.md if the architecture changes significantly.

## Conventions

- TypeScript strict mode is on — no implicit `any`, no nullability shortcuts.
- SCSS per component; global tokens in `src/styles.scss`.
- Prettier enforced on pre-commit (Husky): 100-char line width, single quotes, Angular HTML parser.
- All new components should follow the existing pattern: standalone, OnPush, `TranslatePipe` for text.
