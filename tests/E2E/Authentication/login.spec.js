import { test, expect } from '../../fixtures/testFixtures.js';
import { loginCredentials } from '../../../test-data/loginCredentials.js';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });
  test('invalid email', async ({ page, loginPage }) => {
    await loginPage.loginWithInvalidEmailValidPassword(
      loginCredentials.invalidEmail,
      loginCredentials.validPassword,
    );

    await expect(page.getByText('Invalid email or password').last()).toBeVisible();
  });

  test('invalid password', async ({ page, loginPage }) => {
    await loginPage.loginWithValidEmailInvalidPassword(
      loginCredentials.validEmail,
      loginCredentials.invalidPassword,
    );

    await expect(page.getByText('Invalid email or password').last()).toBeVisible();
  });

  test('invalid email and password', async ({ page, loginPage }) => {
    await loginPage.loginWithInvalidEmailInvalidPassword(
      loginCredentials.invalidEmail,
      loginCredentials.invalidPassword,
    );

    await expect(page.getByText('Invalid email or password').last()).toBeVisible();
  });
});
