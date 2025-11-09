import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Testing Configuration
 *
 * Production-ready setup with:
 * - CI/CD optimization (retries, parallelization)
 * - Screenshot/video on failure
 * - Multiple browser testing
 * - Trace on first retry
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // Run tests in parallel for faster execution
  fullyParallel: true,

  // Fail the build on CI if test.only is accidentally left in source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI only (not locally to avoid hiding flaky tests)
  retries: process.env.CI ? 2 : 0,

  // Limit workers on CI to avoid resource contention
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  // CI: 'dot' for minimal output, 'html' locally for detailed results
  reporter: process.env.CI ? 'dot' : 'html',

  // Shared settings for all tests
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    // Change port if your dev server runs on a different port
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying failed tests
    // Traces help debug flaky or failed tests
    trace: 'on-first-retry',

    // Screenshot on failure for debugging
    screenshot: 'only-on-failure',

    // Video recording on failure
    video: 'retain-on-failure',
  },

  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Uncomment to test on Firefox
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // Uncomment to test on WebKit (Safari)
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Uncomment to test on mobile viewports
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // Uncomment to test on branded browsers
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes to start dev server
  },
});
