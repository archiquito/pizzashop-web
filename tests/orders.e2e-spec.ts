import { expect, test } from '@playwright/test'

test('should list orders successfully', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await expect(
    page.getByRole('cell', { name: 'John Doe 1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'John Doe 10', exact: true }),
  ).toBeVisible()
})

test('should paginate orders successfully', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Próxima página' }).click()
  await expect(
    page.getByRole('cell', { name: 'John Doe 11', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'John Doe 20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()
  await expect(
    page.getByRole('cell', { name: 'John Doe 21', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'John Doe 30', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()
  await expect(
    page.getByRole('cell', { name: 'John Doe 11', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'John Doe 20', exact: true }),
  ).toBeVisible()
})

test('should filter orders by id successfully', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('textbox', { name: 'Id do pedido' }).fill('order-1')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()
  await expect(
    page.getByRole('cell', { name: 'order-1', exact: true }),
  ).toBeVisible()
})

test('should filter orders by name successfully', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page
    .getByRole('textbox', { name: 'Nome do cliente' })
    .fill('John Doe 1')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()
  await expect(
    page.getByRole('cell', { name: 'John Doe 1', exact: true }),
  ).toBeVisible()
})

test('should filter orders by status successfully', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('combobox').click()
  await page.getByRole('option', { name: 'Pendente' }).click()
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()
  await page.waitForTimeout(500)
  const tableRows = page.getByRole('cell', { name: 'Pendente' })
  await expect(tableRows).toHaveCount(6)
})
