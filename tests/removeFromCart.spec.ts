import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Remove from Cart', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('Remove one item from cart', async ({ page }) => {
    const products = new ProductsPage(page);
    
    // Add one product
    await products.addToCart('Sauce Labs Backpack');
    
    // Remove the same product
    await products.removeFromCart('Sauce Labs Backpack');
    
    // Go to cart and check count = 0
    await products.goToCart();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('Remove multiple items from cart', async ({ page }) => {
    const products = new ProductsPage(page);

    // Add multiple products
    const productList = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    for (const product of productList) {
      await products.addToCart(product);
    }
    
    // Remove some of them
    const removeList = ['Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    for (const product of removeList) {
      await products.removeFromCart(product);
    }

    // Go to cart
    await products.goToCart();

    // Expect cart count to equal the remaining products (only one left)
    await expect(page.locator('.cart_item')).toHaveCount(productList.length - removeList.length);

    // Check remaining product is still present
    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
  });
});
