import { describe, expect, it } from "vitest";
import { findDailyMenu, getDisplayMonth, getMadridDateParts } from "../src/lib/menu";

describe("menu helpers", () => {
  it("formats Catalan month names", () => {
    expect(getDisplayMonth({ year: 2026, month: 5 })).toBe("maig 2026");
  });

  it("uses Europe/Madrid for the current day", () => {
    const madrid = getMadridDateParts(new Date("2026-05-24T22:30:00.000Z"));

    expect(madrid).toEqual({ year: 2026, month: 5, day: 25 });
  });

  it("finds a daily menu by type and day", () => {
    const menu = {
      year: 2026,
      month: 5,
      lunch: [{ day: 25, dishes: ["Plat"] }],
      dinner: [],
    };

    expect(findDailyMenu(menu, "lunch", 25)?.dishes).toEqual(["Plat"]);
    expect(findDailyMenu(menu, "dinner", 25)).toBeNull();
  });
});
