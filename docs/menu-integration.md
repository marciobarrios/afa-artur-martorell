# Integració dels menús menjador

La web ja consumeix fitxers `content/menus/YYYY-MM.json` amb el mateix model bàsic de `marciobarrios/menu-guepards`:

```ts
type DailyMenu = {
  day: number;
  dishes: string[];
};

type MonthMenus = {
  year: number;
  month: number;
  sourcePdf?: {
    lunch?: string;
    dinner?: string;
  };
  lunch: DailyMenu[];
  dinner: DailyMenu[];
};
```

## V1

- Els JSON mensuals es guarden al repositori i es revisen en pull request.
- La pàgina `/menus-menjador` mostra dinar, sopar, dia d'avui i PDFs originals.
- Les dates d'avui es calculen amb la zona horària `Europe/Madrid`.

## V1.5

- Portar el parser de `menu-guepards` a una llibreria interna o paquet compartit.
- Afegir una ruta privada `api/cron/import-menus` protegida amb `CRON_SECRET`.
- Executar-la amb Vercel Cron els dies 1-10 de cada mes.
- Descarregar `ArturMartorell-Basal.pdf` i `ArturMartorell-Sopars.pdf`.
- Validar el resultat amb Zod abans d'obrir un canvi o fer commit amb un token de GitHub de permisos mínims.
- Notificar manualment si el PDF no es pot parsejar o si falten dies lectius.
