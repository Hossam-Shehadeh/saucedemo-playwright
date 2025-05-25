import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('Add multiple items and verify cart count', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addToCart('Sauce Labs Backpack');
    await products.addToCart('Sauce Labs Bolt T-Shirt');

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');
  });

  test('Navigate to cart and validate all items', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addToCart('Sauce Labs Backpack');
    await products.addToCart('Sauce Labs Bike Light');
    await products.goToCart();

    const items = page.locator('.cart_item');
    await expect(items).toHaveCount(2);
  });
});
