import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  test('Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });
});
