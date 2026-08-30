import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {

    test.beforeEach(async({page}) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('input[id="user-name"]').fill('standard_user');
        await page.locator('input[id="password"]').fill('secret_sauce');
        await page.locator('input[id="login-button"]').click();

        let count = await page.locator('.inventory_item_name').count();

        for(let i=0; i <= (count-1); i++){
            await page.locator('.inventory_item_name').nth(i).click();
            await page.locator('#add-to-cart').click();
            await page.locator('#back-to-products').click();
        }

        await page.locator('.shopping_cart_link').click();
        await page.locator('#checkout').click();
    })

    test('PW-034 | Navigate to checkout', async({page}) => {
        expect( await page).toHaveURL(/checkout/);
    })

    test('PW-035 | Checkout with valid detail', async({page}) => {
        await page.getByPlaceholder('First Name').fill('Mira');
        await page.getByPlaceholder('Last Name').fill('Niar');
        await page.getByPlaceholder('Zip/Postal Code').fill('856624');

        await page.locator('#continue').click();

        expect( await page.locator('.title')).toHaveText('Checkout: Overview');
    })

    test('PW-036 | Checkout with blank first name ', async({page}) => {
        await page.getByPlaceholder('Last Name').fill('Niar');
        await page.getByPlaceholder('Zip/Postal Code').fill('856624');

        await page.locator('#continue').click();

        expect( await page.locator('h3[data-test="error"]')).toHaveText('Error: First Name is required');
    })

    test('PW-037 | Checkout with blank last name', async({page}) => {
        await page.getByPlaceholder('First Name').fill('Mira');
        await page.getByPlaceholder('Zip/Postal Code').fill('856624');

        await page.locator('#continue').click();

        expect( await page.locator('h3[data-test="error"]')).toHaveText('Error: Last Name is required');
    })

    test('PW-038 | Checkout with blank postal code ', async({page}) => {
        await page.getByPlaceholder('First Name').fill('Mira');
        await page.getByPlaceholder('Last Name').fill('Niar');

        await page.locator('#continue').click();

        expect( await page.locator('h3[data-test="error"]')).toHaveText('Error: Postal Code is required');
    })


})