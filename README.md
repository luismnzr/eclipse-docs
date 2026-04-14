# Eclipse Docs

Public documentation for [Eclipse](https://github.com/luismnzr/eclipse-v1) — a white-label studio management platform for boutique fitness businesses.

Published at **[docs.eclipsecms.com](https://docs.eclipsecms.com)**.

## What's inside

- **`manual/`** — Spanish user manual for studio owners, staff, and teachers
- **`guide/`** — English developer guide (architecture, setup, configuration)
- **`features/`** — English feature deep-dives (reservations, packages, subscriptions, etc.)

Built with [VitePress](https://vitepress.dev/).

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Build static site to .vitepress/dist/
npm run preview  # Preview the built site
```

## Deployment

Automatically deployed to Vercel on every push to `main`. Custom domain: `docs.eclipsecms.com`.

## Keeping docs in sync with Eclipse

When features are added or changed in [`eclipse-v1`](https://github.com/luismnzr/eclipse-v1), the relevant documentation in this repository should be updated in the same cycle. Use Claude Code to review recent `eclipse-v1` commits and propose updates to the manual and developer guide.

## Repository structure

- `manual/` — Spanish, for studio operators (`admin/` and `profesor/`)
- `guide/` and `features/` — English, for developers
- `.vitepress/` — site config and custom theme
- `index.md` — landing page
