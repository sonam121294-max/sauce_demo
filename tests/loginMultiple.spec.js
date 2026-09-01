// @ts-check
import { test, expect } from '@playwright/test';
import * as testData from '../resources/testData.json';

test('PWC-001 | Verify SauceDemo page title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('PWC-002 | Verify login page elements', async ({ page }) => {

  // test.slow();
  await page.goto('https://www.saucedemo.com/');

  await expect(page.locator('input[id="user-name"]')).toBeVisible();
  await expect(page.locator('input[id="password"]')).toBeVisible();
  await expect(page.locator('input[id="login-button"]')).toBeVisible();
  
});

test('PWC-003 | Login with valid credentials', { tag : '@smoke'}, async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('input[id="user-name"]').fill(testData.standard_user.user_name);
  await page.locator('input[id="password"]').fill(testData.standard_user.password);
  await page;
  await page.locator('input[id="login-button"]').click();

  await expect(page.locator('div[id="shopping_cart_container"]')).toBeVisible();

});

test.fixme('PWC-004 | Login with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('input[id="user-name"]').fill('standard_user');
    await page.locator('input[id="password"]').fill('secret_sauc');
    await page.locator('input[id="login-button"]').click();
  
    await expect(page.locator('h3[data-test="error"]')).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
    );
  
  });

  test('PWC-005 | Login with locked-out user  ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('input[id="user-name"]').fill(testData.locked_out_user.user_name);
    await page.locator('input[id="password"]').fill(testData.locked_out_user.password);
    await page.locator('input[id="login-button"]').click();
  
    await expect(page.locator('h3[data-test="error"]')).toHaveText(
        "Epic sadface: Sorry, this user has been locked out."
    );
  
  });

  test('PWC-008 | Locate login fields ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    
  });

  test('PWC-011 | Locate product using XPath  ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await expect(page.locator('//input[@id="login-button"]')).toBeVisible();
    
  });

  test('PWC-012 | Filter a specific product card   ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await page.locator('input[id="user-name"]').fill('standard_user');
    await page.locator('input[id="password"]').fill('secret_sauce');
    await page.locator('input[id="login-button"]').click();

    await expect(page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
  
    
  });

  test('PWC-013 | Use `first()`, `last()`, `nth()`  ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await page.locator('input[id="user-name"]').fill('standard_user');
    await page.locator('input[id="password"]').fill('secret_sauce');
    await page.locator('input[id="login-button"]').click();

    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(2)).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(page.locator('.inventory_item_name').last()).toHaveText('Test.allTheThings() T-Shirt (Red)');

    
  });

  

 

