import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(70000)
  await page.goto('https://levvani.github.io/countries/');
  await page.getByRole('button', { name: 'Fetch Data' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Fetch Data' }).click();
  await page.waitForSelector('.countryGrid');
  await page.getByRole('textbox', { name: 'Type to search' }).click();
  await page.getByRole('textbox', { name: 'Type to search' }).fill('Georgia');
  await page.getByRole('img', { name: 'Flag of Georgia' }).click();
});