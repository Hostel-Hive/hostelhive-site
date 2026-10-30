# HostelHive site and docs

Public website and documentation for [HostelHive](https://github.com/Hostel-Hive), the open-source hostel management system.

The repository holds two independent [Astro](https://astro.build/) projects. Each one is deployed as its own Vercel project.

| Folder | What it is | Built with |
| --- | --- | --- |
| [`site/`](site) | Landing page | Astro |
| [`docs/`](docs) | Documentation | Astro + [Starlight](https://starlight.astro.build/) |

## Local development

Requires Node.js 22.12 or later.

```bash
cd site    # or: cd docs
npm install
npm run dev
```

`npm run build` writes static output to `dist/`.

Docs pages live in `docs/src/content/docs/`, and the sidebar is defined in `docs/astro.config.mjs`.

## Deploying to Vercel

Import this repository into Vercel **twice**, once per folder:

| Setting | Landing page project | Docs project |
| --- | --- | --- |
| Root Directory | `site` | `docs` |
| Framework Preset | Astro (auto-detected) | Astro (auto-detected) |
| Environment variable | `PUBLIC_DOCS_URL` = docs URL | `PUBLIC_SITE_URL` = landing page URL |

The two variables cross-link the projects. Set them once both have a URL, then redeploy. Until then, they fall back to `https://hostelhive-docs.vercel.app` and `https://hostelhive.vercel.app`.

To stop a docs-only change from rebuilding the landing page (and the other way round), set **Settings → Git → Ignored Build Step** in each project to:

```bash
git diff --quiet HEAD^ HEAD -- .
```
