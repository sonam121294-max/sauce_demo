import { test, expect } from '@playwright/test';

test.describe(' Products', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('input[id="user-name"]').fill('standard_user');
        await page.locator('input[id="password"]').fill('secret_sauce');
        await page.locator('input[id="login-button"]').click();
    });

    test('PW-014 | Verify product list is display', async ({ page }) => {

        await expect(page.locator('.inventory_container')).toBeVisible();
    });

    test('PW-015 | Verify number of products ', async ({ page }) => {

        await expect(page.locator('.inventory_item')).toHaveCount(6);
    });

    test('PW-016 | Sort products A → Z  ', async ({ page }) => {

        await page.locator('.product_sort_container').selectOption('az');

        const names = await page.locator('.inventory_item_name').allTextContents();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);

    });

    test('PW-017 | Sort products Z → A  ', async ({ page }) => {

        await page.locator('.product_sort_container').selectOption('za');
        const names = await page.locator('.inventory_item_name').allTextContents();
        const rev_sorted = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).toEqual(rev_sorted);
    });

    test('PW-018 | Sort products low → high  ', async ({ page }) => {

        await page.locator('.product_sort_container').selectOption('lohi');
        const priceTexts = await page.locator('.inventory_item_price').allTextContents();
        const prices = priceTexts.map(p => parseFloat(p.trim().replace('$', '')));
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    test('PW-019 | Sort products high → low  ', async ({ page }) => {

        await page.locator('.product_sort_container').selectOption('hilo');
        const priceTexts = await page.locator('.inventory_item_price').allTextContents();
        const prices = priceTexts.map(p => parseFloat(p.trim().replace('$', '')));
        const rev_sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(rev_sorted);
    });

    test('PW-020 | Open product details ', async ({ page }) => {
        await page.locator('.inventory_item_name').first().click();
        expect(page).toHaveURL(/inventory-item/);
    });

    test('PW-021 | Verify product name/details ', async ({ page }) => {
        await page.locator('.inventory_item_name').first().click();
        expect(await page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');

        expect(await page.locator('.inventory_details_desc')).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');

    });

    test('PW-022 | Verify product price ', async ({ page }) => {
        await page.locator('.inventory_item_name').first().click();
        expect(await page.locator('.inventory_details_price')).toContainText('29.99');
    });

    test('PW-023 | Add one product to cart  ', async ({ page }) => {
        await page.locator('.inventory_item_name').first().click();
        await page.locator('#add-to-cart').click();
        expect(await page.locator('#remove')).toBeVisible();
    })

    test('PW-024 | Add multiple products  ', async ({ page }) => {

        for(let i=1; i <= (await page.locator('.inventory_item_name').count()-1); i++){
            await page.locator('.inventory_item_name').nth(i).click();
            await page.locator('#add-to-cart').click();
            expect(await page.locator('#remove')).toBeVisible();
            await page.locator('#back-to-products').click();

        }
    })

    test('PW-025 | Verify cart badge count   ', async ({ page }) => {

        let count = await page.locator('.inventory_item_name').count();

        for(let i=0; i <= (count-1); i++){
            await page.locator('.inventory_item_name').nth(i).click();
            await page.locator('#add-to-cart').click();
            await page.locator('#back-to-products').click();
        }
        
        expect(await page.locator('.shopping_cart_badge')).toHaveText(count.toString());
    })

    

});

