"use client";

import { Tabs } from "@base-ui/react/tabs";
import { CalendarDays, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDisplayMenuDay } from "@/lib/menu-dates";
import type { DailyMenu, MonthMenus } from "@/lib/menu";
import { cn } from "@/lib/utils";

function MenuGrid({
  entries,
  menu,
  today,
}: {
  entries: DailyMenu[];
  menu: Pick<MonthMenus, "month" | "year">;
  today?: number;
}) {
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
            today === entry.day &&
              "border-primary/35 bg-primary/5 ring-2 ring-primary/18 dark:border-primary/50 dark:bg-primary/12 dark:ring-primary/28",
          )}
          key={entry.day}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 font-bold">
              <CalendarDays aria-hidden="true" className="size-4 text-primary" />
              {getDisplayMenuDay(menu, entry.day)}
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

const tabClassName =
  "h-10 cursor-pointer rounded-md px-4 text-sm font-bold text-muted-foreground outline-none transition-[background-color,color,box-shadow] duration-200 hover:bg-primary/10 hover:text-primary aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:shadow-sm focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-primary/15";

export function MenuTabs({
  menu,
  showSourcePdf = true,
  today,
}: {
  menu: MonthMenus;
  showSourcePdf?: boolean;
  today?: number;
}) {
  return (
    <Tabs.Root className="space-y-5" defaultValue="lunch">
      <Tabs.List className="inline-flex rounded-lg border bg-card p-1 shadow-sm">
        <Tabs.Tab className={tabClassName} value="lunch">
          Dinar
        </Tabs.Tab>
        <Tabs.Tab className={tabClassName} value="dinner">
          Sopar
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="lunch">
        <MenuGrid entries={menu.lunch} menu={menu} today={today} />
        {showSourcePdf && menu.sourcePdf?.lunch ? (
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
        <MenuGrid entries={menu.dinner} menu={menu} today={today} />
        {showSourcePdf && menu.sourcePdf?.dinner ? (
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
