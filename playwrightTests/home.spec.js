const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('/');
  const entryContainer = page.getByTestId('entryContainer');
  // await page.screenshot({ path: 'screenshot.png' });
  expect(entryContainer).toBeAttached();
});