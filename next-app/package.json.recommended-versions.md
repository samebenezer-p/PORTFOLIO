# Recommended Pinned Versions — NEXUS OS `next-app`

> **Purpose:** Documents the exact dependency versions to pin to in `package.json` once you decide to lock them down.
> Apply manually when ready. This file does **not** auto-update `package.json`.

---

## Production Dependencies

| Package | Current Range | Recommended Pin | Rationale |
|---|---|---|---|
| `next` | `16.2.10` | `16.2.10` | Already exact — keep pinned |
| `react` | `19.2.4` | `19.2.4` | Already exact — keep pinned |
| `react-dom` | `19.2.4` | `19.2.4` | Already exact — keep pinned |
| `framer-motion` | `^12.42.2` | `12.42.2` | Remove `^` — motion APIs can break between patch versions |
| `gsap` | `^3.15.0` | `3.15.0` | Remove `^` — GSAP 3→4 is a breaking change; lock to 3 series |
| `lenis` | `^1.3.25` | `1.3.25` | Remove `^` — scroll APIs drift; pin for stability |
| `lucide-react` | `^1.24.0` | `1.24.0` | Icon removals happen in minor versions; pin to avoid missing icons |
| `canvas-confetti` | `^1.9.4` | `1.9.4` | Stable; pin to avoid surprise API changes |
| `react-intersection-observer` | `^10.1.0` | `10.1.0` | Stable at 10.x; pin |

## Dev Dependencies

| Package | Current Range | Recommended Pin | Rationale |
|---|---|---|---|
| `typescript` | `^5` | `5.5.4` | Pin to a specific 5.x — TS minor releases can surface new errors |
| `tailwindcss` | `^4` | `4.0.0` | TW v4 is new; track `^4` carefully, or pin to avoid breakage |
| `@tailwindcss/postcss` | `^4` | `4.0.0` | Pin alongside tailwindcss |
| `eslint` | `^9` | `9.7.0` | ESLint 9 changed config format; pin to avoid breaking lint |
| `eslint-config-next` | `16.2.10` | `16.2.10` | Already exact — keep in sync with `next` |
| `@types/node` | `^20` | `20.14.11` | Pin to an LTS-aligned patch |
| `@types/react` | `^19` | `19.0.8` | Pin alongside `react` |
| `@types/react-dom` | `^19` | `19.0.3` | Pin alongside `react-dom` |

---

## How to Apply

Replace the `dependencies` and `devDependencies` ranges in `package.json` with exact versions above:

```diff
- "framer-motion": "^12.42.2",
+ "framer-motion": "12.42.2",

- "gsap": "^3.15.0",
+ "gsap": "3.15.0",
```

After editing, run:
```bash
npm install
npm run build
npx tsc --noEmit
```

---

*Generated: 2026-07-24. Review before applying — verify latest patch versions at [npmjs.com](https://www.npmjs.com).*
