import { test, expect } from '@playwright/test'

test('add product to cart', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Camiseta' }).first().click()

  await page.waitForLoadState('networkidle')

  await expect(page.getByText('Camiseta').first()).toBeVisible()

  await page.getByRole('button', { name: 'ADICIONAR AO CARRINHO' }).click()

  const toast = page.getByText('adicionado com sucesso')

  await expect(toast).toBeVisible()
  await expect(page.getByRole('link', { name: '1' })).toBeVisible()
})

test('update cart product', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Camiseta' }).first().click()

  await page.waitForLoadState('networkidle')

  await expect(page.getByText('Camiseta').first()).toBeVisible()

  await page.getByRole('button', { name: 'ADICIONAR AO CARRINHO' }).click()

  await expect(page.getByText('adicionado com sucesso')).toBeVisible()
  await expect(page.getByRole('link', { name: '1' })).toBeVisible()

  await page.getByRole('link', { name: '1' }).click()

  await page.waitForURL('/cart')

  await expect(page.getByText('SEU CARRINHO')).toBeVisible()
  await expect(page.getByText('Camiseta').first()).toBeVisible()

  await page.getByRole('combobox').click()
  await page.getByLabel('2').click()

  await expect(page.getByText('Total(2 produtos)')).toBeVisible()
  await expect(page.getByText('Produto atualizado!')).toBeVisible()
})

test('remove cart product', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Caneca' }).first().click()

  await page.waitForLoadState('networkidle')

  await expect(page.getByText('Caneca').first()).toBeVisible()

  await page.getByRole('button', { name: 'ADICIONAR AO CARRINHO' }).click()

  await expect(page.getByText('adicionado com sucesso')).toBeVisible()
  await expect(page.getByRole('link', { name: '1' })).toBeVisible()

  await page.getByRole('link', { name: '1' }).click()

  await page.waitForURL('/cart')

  await expect(page.getByText('SEU CARRINHO')).toBeVisible()
  await expect(page.getByText('Caneca').first()).toBeVisible()

  await page.getByTestId('remove-btn').click()

  await expect(page.getByText('Total(0 produtos) R$ 0,00')).toBeVisible()
  await expect(page.getByText('Produto removido!')).toBeVisible()
})

test('buying a product', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Caneca' }).first().click()

  await page.waitForLoadState('networkidle')

  await expect(page.getByText('Caneca').first()).toBeVisible()

  await page.getByRole('button', { name: 'ADICIONAR AO CARRINHO' }).click()

  await expect(page.getByText('adicionado com sucesso')).toBeVisible()
  await expect(page.getByRole('link', { name: '1' })).toBeVisible()

  await page.getByRole('link', { name: '1' }).click()

  await page.waitForURL('/cart')

  await expect(page.getByText('SEU CARRINHO')).toBeVisible()
  await expect(page.getByText('Total(1 produtos)')).toBeVisible()
  await expect(page.getByText('Caneca').first()).toBeVisible()

  await page.getByRole('button', { name: 'Finalizar a compra' }).click()

  await expect(
    page.getByRole('heading', { name: 'Obrigado por comprar na Capputeno!' }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Entendido' }).click()

  await page.waitForURL('/')

  await expect(page.getByRole('link', { name: '1' })).not.toBeVisible()
})
