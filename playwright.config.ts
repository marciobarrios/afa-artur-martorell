import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:3000",
  },
  webServer: {
    command: "pnpm exec next dev -H 127.0.0.1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "chromium-320",
      use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 900 } },
    },
    {
      name: "chromium-375",
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 900 } },
    },
    {
      name: "chromium-414",
      use: { ...devices["Desktop Chrome"], viewport: { width: 414, height: 900 } },
    },
    {
      name: "chromium-tablet",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } },
    },
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } },
    },
  ],
});
