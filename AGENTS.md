# AGENTS.md

## Cursor Cloud specific instructions

This is a VitePress documentation/knowledge base site. No external services, databases, or secrets are required.

### Services

| Service | Command | Notes |
|---|---|---|
| Dev server | `pnpm docs:dev` | Serves at `http://localhost:5173/kb/` (note the `/kb/` base path) |
| Build | `pnpm docs:build` | Output in `docs/.vitepress/dist/` |
| Preview | `pnpm docs:preview` | Preview production build locally |

### Key caveats

- **Base path**: The site is configured with `base: '/kb/'`, so the dev server URL is `http://localhost:5173/kb/`, not just `http://localhost:5173/`.
- **No linter configured**: This project has no ESLint or other linting tools — only VitePress as a devDependency.
- **No automated tests**: There are no test frameworks or test scripts in the project.
- **pnpm is the package manager**: Use `pnpm install` (lockfile is `pnpm-lock.yaml`). The CI uses Node.js 22 and pnpm 9.
- **esbuild build scripts warning**: `pnpm install` may warn about ignored build scripts for esbuild. This is safe to ignore — esbuild still works correctly via its WASM fallback.
