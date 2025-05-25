import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('Complete checkout process with valid data', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addToCart('Sauce Labs Backpack');
    await products.goToCart();

    const cart = new CartPage(page);
    await cart.verifyCartItemCount(1);
    await cart.verifyCartItemName('Sauce Labs Backpack');
    await cart.clickCheckout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('Hossam', 'Shehadeh', '12345');
    await checkout.continueCheckout();
    await checkout.verifyOverviewDetails('Sauce Labs Backpack');
    await checkout.finishCheckout();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await checkout.verifyCheckoutCompleteText();
  });

  test('Checkout form validation: missing first name', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addToCart('Sauce Labs Backpack');
    await products.goToCart();

    const cart = new CartPage(page);
    await cart.clickCheckout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('', 'Shehadeh', '12345');
    await checkout.continueCheckout();

    await expect(checkout.errorMessage()).toHaveText('Error: First Name is required');
  });

  test('Checkout form validation: missing postal code', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addToCart('Sauce Labs Backpack');
    await products.goToCart();

    const cart = new CartPage(page);
    await cart.clickCheckout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('Hossam', 'Shehadeh', '');
    await checkout.continueCheckout();

    await expect(checkout.errorMessage()).toHaveText('Error: Postal Code is required');
  });
});
