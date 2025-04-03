import { test, expect } from '@playwright/test';

test.describe('Rozetka E2E Tests', () => {
  
  test('Open Rozetka homepage and check title', async ({ page }) => {
    console.log('Открываем главную страницу Rozetka...');
    await page.goto('https://rozetka.com.ua/');
    await expect(page).toHaveTitle(/ROZETKA/);
    await page.screenshot({ path: 'screenshots/home.png' });
  });

  test('Search for a product', async ({ page }) => {
    console.log('Выполняем поиск "iPhone 14"...');
    await page.goto('https://rozetka.com.ua/');
    await page.fill('input[placeholder="Я шукаю..."]', 'iPhone 14');
    await page.keyboard.press('Enter');
    await page.screenshot({ path: 'screenshots/search.png' });
  });

  test('Filter products by price range', async ({ page }) => {
   
    await page.goto('https://rozetka.com.ua/telefony-mobilnye/c80003/');
    await page.fill('input[formcontrolname="min"]', '10000');
    
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/price-filter.png' });
  });

  test('Open product page and check details', async ({ page }) => {
    console.log('Открываем страницу первого товара...');
    await page.goto('https://rozetka.com.ua/telefony-mobilnye/c80003/');
    const firstProduct = page.locator('.goods-tile__heading').first();
    await page.screenshot({ path: 'screenshots/product-page.png' });
  });

  test('Add a product to the cart', async ({ page }) => {
    console.log('Добавляем товар в корзину...');
    await page.goto('https://rozetka.com.ua/telefony-mobilnye/c80003/');
    await page.locator('.buy-button').first().click();
    await page.screenshot({ path: 'screenshots/cart.png' });
  });

  test('Navigate through categories', async ({ page }) => {
    console.log('Открываем категорию "Ноутбуки и компьютеры"...');
    await page.goto('https://rozetka.com.ua/');
  
    await page.screenshot({ path: 'screenshots/category.png' });
  });

  test('Check Rozetka on mobile view', async ({ browser }) => {
    console.log('Открываем Rozetka в мобильном режиме...');
    const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const mobilePage = await context.newPage();
    await mobilePage.goto('https://rozetka.com.ua/');
    await mobilePage.screenshot({ path: 'screenshots/mobile.png' });

    console.log('Открываем мобильное меню...');
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({ path: 'screenshots/mobile-menu.png' });

    console.log('Закрываем мобильный браузер...');
    await context.close();
  });

});
