"use client";

import { Tabs } from "@base-ui/react/tabs";
import { CalendarDays, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { DailyMenu, MonthMenus } from "@/lib/menu";
import { cn } from "@/lib/utils";

function MenuGrid({ entries, today }: { entries: DailyMenu[]; today?: number }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Encara no hi ha menús publicats per aquest mes.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {entries.map((entry) => (
        <article
          className={cn(
            "rounded-lg border bg-card p-4 shadow-sm",
            today === entry.day && "border-primary bg-primary/5 ring-2 ring-primary/15",
          )}
          key={entry.day}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 font-bold">
              <CalendarDays aria-hidden="true" className="size-4 text-primary" />
              Dia {entry.day}
            </div>
            {today === entry.day ? <Badge>Avui</Badge> : null}
          </div>
          <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
            {entry.dishes.map((dish) => (
              <li key={dish}>{dish}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function MenuTabs({ menu, today }: { menu: MonthMenus; today?: number }) {
  return (
    <Tabs.Root className="space-y-5" defaultValue="lunch">
      <Tabs.List className="inline-flex rounded-lg border bg-card p-1 shadow-sm">
        <Tabs.Tab
          className="cursor-pointer rounded-md px-4 py-2 text-sm font-bold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground data-selected:bg-primary data-selected:text-primary-foreground data-selected:shadow-sm focus-visible:ring-2 focus-visible:ring-ring"
          value="lunch"
        >
          Dinar
        </Tabs.Tab>
        <Tabs.Tab
          className="cursor-pointer rounded-md px-4 py-2 text-sm font-bold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground data-selected:bg-primary data-selected:text-primary-foreground data-selected:shadow-sm focus-visible:ring-2 focus-visible:ring-ring"
          value="dinner"
        >
          Sopar
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="lunch">
        <MenuGrid entries={menu.lunch} today={today} />
        {menu.sourcePdf?.lunch ? (
          <a
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            href={menu.sourcePdf.lunch}
            rel="noreferrer"
            target="_blank"
          >
            PDF original dinar <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        ) : null}
      </Tabs.Panel>
      <Tabs.Panel value="dinner">
        <MenuGrid entries={menu.dinner} today={today} />
        {menu.sourcePdf?.dinner ? (
          <a
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            href={menu.sourcePdf.dinner}
            rel="noreferrer"
            target="_blank"
          >
            PDF original sopars <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        ) : null}
      </Tabs.Panel>
    </Tabs.Root>
  );
}
