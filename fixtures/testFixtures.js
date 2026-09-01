import { test as base, expect } from '@playwright/test';

export const test = base.extend({
    loggedInPage: async({ page }, use) => {

        await page.goto('https://www.saucedemo.com/');

        await page.locator('input[id="user-name"]').fill('standard_user');
        await page.locator('input[id="password"]').fill('secret_sauce');
        await page.locator('input[id="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);

        // Give the logged-in page to the test
        await use(page);

    }
});

export { expect };