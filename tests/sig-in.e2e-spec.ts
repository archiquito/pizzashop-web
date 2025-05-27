import { expect, test } from '@playwright/test'

test('should login successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page.getByRole('textbox', { name: 'Seu e-mail' }).fill('test@test.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail cadastrado.',
  )
  await expect(toast).toBeVisible()
})

test('should show error message when email is invalid', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page.getByRole('textbox', { name: 'Seu e-mail' }).fill('joe@goe.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Credenciais inválidas')
  await expect(toast).toBeVisible()
})

test('navigate to create a new restaurant', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
