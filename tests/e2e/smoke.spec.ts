import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/que-fem",
  "/com-ho-fem",
  "/quotes-i-us",
  "/comissions",
  "/menus-menjador",
  "/contacte",
];

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toContainText("AFA");
    await expect(page).toHaveTitle(/AFA|Què|Com|Quotes|Comissions|Menús|Contacte/);
  });
}
