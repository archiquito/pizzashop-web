import { expect, test } from '@playwright/test'

test('should update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Pizza Shop' }).click()

  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByRole('textbox', { name: 'Nome' }).fill('Pizza Chiq')
  await page
    .getByRole('textbox', { name: 'Descrição' })
    .fill('Pizza Chiq description')
  await page.getByRole('button', { name: 'Salvar' }).click()

  const toast = page.getByText('Perfil atualizado com sucesso!')
  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Cancelar' }).click()

  await expect(page.getByRole('button', { name: 'Pizza Chiq' })).toBeVisible()
})
