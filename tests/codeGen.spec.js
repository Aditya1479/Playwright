import { test, expect } from '@playwright/test';

test.only('test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('form input[name="name"]').click();
    await page.locator('form input[name="name"]').fill('Aditya');
    await expect(page.locator('form input[name="name"]')).toHaveValue('Aditya');
});