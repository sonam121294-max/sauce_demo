// import { test, expect } from '@playwright/test';

// test('authenticate', async ({ page }) => {

//     await page.goto('https://www.saucedemo.com/');

//     await page.locator('input[id="user-name"]').fill('standard_user');
//     await page.locator('input[id="password"]').fill('secret_sauce');
//     await page.locator('input[id="login-button"]').click();

//     await expect(page).toHaveURL(/inventory/);

//     // Save the current browser session
//     await page.context().storageState({
//         path: 'playwright/.auth/user.json'
//     });
// });