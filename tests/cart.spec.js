import { test, expect } from '@playwright/test';

test.describe('Cart', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');

        // await page.locator('input[id="user-name"]').fill('standard_user');
        // await page.locator('input[id="password"]').fill('secret_sauce');
        // await page.locator('input[id="login-button"]').click();

        let count = await page.locator('.inventory_item_name').count();

        for(let i=0; i <= (count-1); i++){
            await page.locator('.inventory_item_name').nth(i).click();
            await page.locator('#add-to-cart').click();
            await page.locator('#back-to-products').click();
        }
        
    });

    test(' PW-026 | Open cart ', async({page}) => {
        await page.locator('.shopping_cart_link').click();
        expect(page).toHaveURL(/cart/);
    })

    test(' PW-027 | Verify product in cart ', async({page}) => {
        const product_name = (await page.locator('.inventory_item_name').allTextContents()).sort((a,b) => a - b);

        await page.locator('.shopping_cart_link').click();
        const cart_name = (await page.locator('.inventory_item_name').allTextContents()).sort((a,b) => a - b);;
 
        expect(product_name).toEqual(cart_name);
    })

    test(' PW-028 | Verify product price in cart ', async({page}) => {
        const product_price = (await page.locator('.inventory_item_price').allTextContents()).sort((a,b) => a - b);

        await page.locator('.shopping_cart_link').click();
        const cart_price = (await page.locator('.inventory_item_price').allTextContents()).sort((a,b) => a - b);;
 
        expect(product_price).toEqual(cart_price);
    })

    test(' PW-029 | Remove product from cart  ', async({page}) => {

        let remove_count = await page.locator('#remove-sauce-labs-bike-light').count();

        await page.locator('.shopping_cart_link').click();
        await page.locator('#remove-sauce-labs-bike-light').first().click();
        await page.locator('#continue-shopping').click();
        
        expect( await page.locator('#remove-sauce-labs-bike-light')).toHaveCount(remove_count-1);
        

    })

    test(' PW-032 | Verify cart badge after removal  ', async({page}) => {

        let initial_cart_count = parseInt(await page.locator('.shopping_cart_badge').textContent());

        await page.locator('.shopping_cart_link').click();
        await page.locator('#remove-sauce-labs-bike-light').first().click();

        let final_cart_count = parseInt(await page.locator('.shopping_cart_badge').textContent());
        
        expect(final_cart_count).toEqual(initial_cart_count-1);

    })

    test(' PW-033 | Continue shopping from cart  ', async({page}) => {

        await page.locator('.shopping_cart_link').click();
        await page.locator('#remove-sauce-labs-bike-light').first().click();
        await page.locator('#continue-shopping').click();
        
        expect( await page).toHaveURL(/inventory/);
        

    })

})