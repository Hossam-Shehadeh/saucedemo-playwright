import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {
  test('Complete checkout process', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    const products = new ProductsPage(page);
    await products.addToCart('Sauce Labs Backpack');
    await products.goToCart();

    const cart = new CartPage(page);
    await cart.clickCheckout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('John', 'Doe', '12345');
    await checkout.finishCheckout();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});