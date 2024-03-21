import { test, expect } from '@playwright/test'

test('search for a product', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page
    .getByPlaceholder('Procurando por algo específico?')
    .fill('Camiseta evening')

  await page.getByRole('banner').getByRole('button').click()

  await page.waitForURL('/search?q=Camiseta%20evening')

  await expect(
    page.getByText('Resultados para: Camiseta evening'),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Camiseta evening' }).first(),
  ).toBeVisible()
})

test('search for a non-existent product', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page
    .getByPlaceholder('Procurando por algo específico?')
    .fill('Bolo de cenoura')

  await page.getByRole('banner').getByRole('button').click()

  await page.waitForURL('/search?q=Bolo%20de%20cenoura')

  await expect(
    page.getByText(
      'Não encontramos nenhum produto com esse nome, tente algo diferente.',
    ),
  ).toBeVisible()
})
