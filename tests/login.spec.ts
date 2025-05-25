import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('🔐 Login Feature', () => {
  test('✅ Valid login with standard user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('❌ Invalid login - wrong username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('invalid_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('❌ Invalid login - wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'wrong_password');
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('🧪 Login form validation - empty fields', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await test.step('📝 Submit empty login form', async () => {
      await page.locator('[data-test="login-button"]').click();
    });

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
