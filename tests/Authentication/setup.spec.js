import { test as setup, expect } from '@playwright/test';
import { login } from '../utils/login.js';
import 'dotenv/config';


setup('authentication', async ({ page }) => {
  await login(page, process.env.email, process.env.password);
  await expect(page.getByRole('heading', { name: 'BROWSE CATEGORIES' })).toBeVisible();
  await page.context().storageState({ path: 'storage-state/user.json' });
});