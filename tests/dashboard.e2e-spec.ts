import { expect, test } from '@playwright/test'

test('should display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByText('20', { exact: true })).toBeVisible()
  await expect(page.getByText('+5% em relação ao mês passado')).toBeVisible()
})

test('should display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByText('2.000', { exact: true })).toBeVisible()
  await expect(page.getByText('+5% em relação ao mês passado')).toBeVisible()
})

test('should display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByText('R$ 20,00', { exact: true })).toBeVisible()
  const paragraph = page.getByRole('paragraph').first()
  await expect(
    paragraph.getByText('-5% em relação ao mês passado'),
  ).toBeVisible()
})

test('should display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByText('7', { exact: true })).toBeVisible()
  await expect(
    page.getByText('-5% em relação ao mês passado').nth(1),
  ).toBeVisible()
})
