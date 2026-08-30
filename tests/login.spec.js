// @ts-check
import { test, expect } from '@playwright/test';

test('PW-001 | Verify SauceDemo page title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('PW-002 | Verify login page elements', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page.locator('input[id="user-name"]')).toBeVisible();
  await expect(page.locator('input[id="password"]')).toBeVisible();
  await expect(page.locator('input[id="login-button"]')).toBeVisible();
  
});

test('PW-003 | Login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('input[id="user-name"]').fill('standard_user');
  await page.locator('input[id="password"]').fill('secret_sauce');
  await page.locator('input[id="login-button"]').click();

  await expect(page.locator('div[id="shopping_cart_container"]')).toBeVisible();

});

test('PW-004 | Login with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('input[id="user-name"]').fill('standard_user');
    await page.locator('input[id="password"]').fill('secret_sauc');
    await page.locator('input[id="login-button"]').click();
  
    await expect(page.locator('h3[data-test="error"]')).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
    );
  
  });

  test('PW-005 | Login with locked-out user  ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('input[id="user-name"]').fill('locked_out_user');
    await page.locator('input[id="password"]').fill('secret_sauce');
    await page.locator('input[id="login-button"]').click();
  
    await expect(page.locator('h3[data-test="error"]')).toHaveText(
        "Epic sadface: Sorry, this user has been locked out."
    );
  
  });

  test('PW-008 | Locate login fields ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    
  });

  test('PW-011 | Locate product using XPath  ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await expect(page.locator('//input[@id="login-button"]')).toBeVisible();
    
  });

  test('PW-012 | Filter a specific product card   ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await page.locator('input[id="user-name"]').fill('standard_user');
    await page.locator('input[id="password"]').fill('secret_sauce');
    await page.locator('input[id="login-button"]').click();

    await expect(page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
  
    
  });

  test('PW-013 | Use `first()`, `last()`, `nth()`  ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    await page.locator('input[id="user-name"]').fill('standard_user');
    await page.locator('input[id="password"]').fill('secret_sauce');
    await page.locator('input[id="login-button"]').click();

    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(2)).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(page.locator('.inventory_item_name').last()).toHaveText('Test.allTheThings() T-Shirt (Red)');

    
  });

  

 

