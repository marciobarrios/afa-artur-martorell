import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";

const menuRoot = path.join(process.cwd(), "content", "menus");

const dailyMenuSchema = z.object({
  day: z.number().int().min(1).max(31),
  dishes: z.array(z.string().min(2)),
});

const monthMenuSchema = z.object({
  year: z.number().int().min(2020),
  month: z.number().int().min(1).max(12),
  sourcePdf: z
    .object({
      lunch: z.url().optional(),
      dinner: z.url().optional(),
    })
    .optional(),
  lunch: z.array(dailyMenuSchema),
  dinner: z.array(dailyMenuSchema),
});

export type DailyMenu = z.infer<typeof dailyMenuSchema>;
export type MonthMenus = z.infer<typeof monthMenuSchema>;

export const catalanMonths = [
  "gener",
  "febrer",
  "març",
  "abril",
  "maig",
  "juny",
  "juliol",
  "agost",
  "setembre",
  "octubre",
  "novembre",
  "desembre",
] as const;

export function getMadridDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
  };
}

function readMonthMenu(filePath: string) {
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const menu = monthMenuSchema.parse(parsed);
  const seenDays = new Set<number>();

  for (const menuType of ["lunch", "dinner"] as const) {
    seenDays.clear();

    for (const dayMenu of menu[menuType]) {
      if (seenDays.has(dayMenu.day)) {
        throw new Error(`Duplicate ${menuType} menu day ${dayMenu.day} in ${filePath}`);
      }

      seenDays.add(dayMenu.day);
    }
  }

  return menu;
}

export const getAvailableMenus = cache(() => {
  const files = fs
    .readdirSync(menuRoot)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join(menuRoot, file));

  return files.map(readMonthMenu).toSorted((a, b) => b.year - a.year || b.month - a.month);
});

export const getMenuForMonth = cache((year: number, month: number) => {
  return getAvailableMenus().find((menu) => menu.year === year && menu.month === month) ?? null;
});

export function getDisplayMonth(menu: Pick<MonthMenus, "month" | "year">) {
  const month = catalanMonths[menu.month - 1];

  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${menu.year}`;
}

export function findDailyMenu(menu: MonthMenus, type: "lunch" | "dinner", day: number) {
  return menu[type].find((entry) => entry.day === day) ?? null;
}
