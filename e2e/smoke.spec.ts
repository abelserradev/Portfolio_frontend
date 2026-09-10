import { test, expect } from '@playwright/test';

test('home carga secciones principales', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Buildforge/i);
  await expect(page.locator('#servicios')).toBeVisible();
  await expect(page.locator('#misiones')).toBeAttached();
});

test('chat FAB abre el asistente', async ({ page }) => {
  await page.goto('/');
  const fab = page.getByRole('button', { name: /asistente de cotización/i });
  await fab.click();
  await expect(page.getByRole('dialog', { name: /asistente buildforge/i })).toBeVisible();
});
