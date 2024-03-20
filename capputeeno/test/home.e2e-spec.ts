import { test, expect } from '@playwright/test'

test('display all products', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('Todos os produtos')).toBeDisabled()

  await expect(
    page.getByRole('link', { name: 'Camiseta Outcast' }),
  ).toBeVisible()

  await expect(
    page.getByRole('link', { name: 'Caneca preto fosco' }),
  ).toBeVisible()
})

test('filter by category', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByText('Camisetas').click()

  await expect(page.getByText('Camisetas')).toBeDisabled()

  await expect(
    page.getByRole('link').filter({ hasText: 'Camiseta' }),
  ).toHaveCount(10)
})

test('sort by order', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByText('Novidades').click()

  await expect(page.getByText('Novidades')).toBeVisible()
  await expect(page.getByRole('link').filter({ hasText: 'R$' })).toHaveCount(10)
})

test('filter by category and sort by order', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByText('Canecas').click()
  await page.getByRole('combobox').click()
  await page.getByText('Preço: Maior - menor').click()

  await expect(page.getByText('Canecas')).toBeDisabled()
  await expect(page.getByText('Preço: Maior - menor')).toBeVisible()
  await expect(
    page.getByRole('link').filter({ hasText: 'Caneca' }),
  ).toHaveCount(10)
})

test('paginate products', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: '2' }).first().click()

  await expect(page.getByRole('button', { name: '2' }).first()).toBeDisabled()
  await expect(page.getByRole('link').filter({ hasText: 'R$' })).toHaveCount(10)

  await page.getByTestId('next-page').first().click()

  await expect(page.getByRole('button', { name: '3' }).first()).toBeDisabled()
  await expect(page.getByRole('link').filter({ hasText: 'R$' })).toHaveCount(10)

  await page.getByTestId('previous-page').first().click()

  await expect(page.getByRole('button', { name: '2' }).first()).toBeDisabled()
  await expect(page.getByRole('link').filter({ hasText: 'R$' })).toHaveCount(10)
})
