import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/frontend/);
});

test('Settings Manager heading is visible', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', { name: 'Settings Manager' });
    await expect(heading).toBeVisible();
});

test('Navigate to create page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Create New' }).click();
    await expect(page).toHaveURL(/\/create/);

    await expect(page.getByRole('button', { name: /Back/i })).toBeVisible();
});
