import { test, expect } from '../fixtures/testFixtures.js';
import { LoginPage} from '../pages/LoginPage'


test.describe(' Products', () => {

    // test.beforeEach(async ({ page }) => {
    //     let loginPage = new LoginPage(page);
    //     await page.goto('https://www.saucedemo.com/');
    //     await loginPage.login('standard_user', 'secret_sauce');

    // });

    test('PW-014 | Verify product list is display', async ({ loggedInPage }) => {

        await expect(loggedInPage.locator('.inventory_container')).toBeVisible();
    });

    test('PW-015 | Verify number of products ', async ({ loggedInPage }) => {

        await expect(loggedInPage.locator('.inventory_item')).toHaveCount(6);
    });

    test('PW-016 | Sort products A → Z  ', async ({ loggedInPage }) => {

        await loggedInPage.locator('.product_sort_container').selectOption('az');

        const names = await loggedInPage.locator('.inventory_item_name').allTextContents();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);

    });

    test('PW-017 | Sort products Z → A  ', async ({ loggedInPage }) => {

        await loggedInPage.locator('.product_sort_container').selectOption('za');
        const names = await loggedInPage.locator('.inventory_item_name').allTextContents();
        const rev_sorted = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).toEqual(rev_sorted);
    });

    test('PW-018 | Sort products low → high  ', async ({ loggedInPage }) => {

        await loggedInPage.locator('.product_sort_container').selectOption('lohi');
        const priceTexts = await loggedInPage.locator('.inventory_item_price').allTextContents();
        const prices = priceTexts.map(p => parseFloat(p.trim().replace('$', '')));
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    test('PW-019 | Sort products high → low  ', async ({ loggedInPage }) => {

        await loggedInPage.locator('.product_sort_container').selectOption('hilo');
        const priceTexts = await loggedInPage.locator('.inventory_item_price').allTextContents();
        const prices = priceTexts.map(p => parseFloat(p.trim().replace('$', '')));
        const rev_sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(rev_sorted);
    });

    test('PW-020 | Open product details ', async ({ loggedInPage }) => {
        await loggedInPage.locator('.inventory_item_name').first().click();
        expect(loggedInPage).toHaveURL(/inventory-item/);
    });

    test('PW-021 | Verify product name/details ', async ({ loggedInPage }) => {
        await loggedInPage.locator('.inventory_item_name').first().click();
        expect(await loggedInPage.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');

        expect(await loggedInPage.locator('.inventory_details_desc')).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');

    });

    test('PW-022 | Verify product price ', async ({ loggedInPage }) => {
        await loggedInPage.locator('.inventory_item_name').first().click();
        expect(await loggedInPage.locator('.inventory_details_price')).toContainText('29.99');
    });

    test('PW-023 | Add one product to cart  ', async ({ loggedInPage }) => {
        await loggedInPage.locator('.inventory_item_name').first().click();
        await loggedInPage.locator('#add-to-cart').click();
        expect(await loggedInPage.locator('#remove')).toBeVisible();
    })

    test('PW-024 | Add multiple products  ', async ({ loggedInPage }) => {

        for(let i=1; i <= (await loggedInPage.locator('.inventory_item_name').count()-1); i++){
            await loggedInPage.locator('.inventory_item_name').nth(i).click();
            await loggedInPage.locator('#add-to-cart').click();
            expect(await loggedInPage.locator('#remove')).toBeVisible();
            await loggedInPage.locator('#back-to-products').click();

        }
    })

    test('PW-025 | Verify cart badge count   ', async ({ loggedInPage }) => {

        let count = await loggedInPage.locator('.inventory_item_name').count();

        for(let i=0; i <= (count-1); i++){
            await loggedInPage.locator('.inventory_item_name').nth(i).click();
            await loggedInPage.locator('#add-to-cart').click();
            await loggedInPage.locator('#back-to-products').click();
        }
        
        expect(await loggedInPage.locator('.shopping_cart_badge')).toHaveText(count.toString());
    })

    

});

