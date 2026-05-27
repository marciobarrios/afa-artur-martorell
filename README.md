# AFA Artur Martorell

Nova web en català per a l'Associació de Famílies de l'Escola Artur Martorell.

## Desenvolupament

```bash
pnpm install
pnpm dev
```

## Contingut

El contingut editable viu a `content/`:

- `content/pages`: pàgines estàtiques.
- `content/commissions`: fitxes de comissions.
- `content/menus`: menús mensuals en JSON.
- `content/site.json`: metadades globals.

Els fitxers es validen amb Zod durant el build.

## Comprovacions

```bash
pnpm fmt:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Menús menjador

La V1 consumeix JSON revisats. La proposta d'importació automàtica dels PDFs basada en `menu-guepards` està documentada a `docs/menu-integration.md`.
