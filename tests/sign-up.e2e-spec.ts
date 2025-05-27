import { expect, test } from '@playwright/test'

test('should sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Pizza Shop')
  await page.getByRole('textbox', { name: 'Seu e-mail' }).fill('test@test.com')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
  await page.getByRole('textbox', { name: 'Telefone' }).fill('123456')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Conta cadastrada com sucesso!')
  await expect(toast).toBeVisible()
})

test('should show error message when error occurs', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page
    .getByRole('textbox', { name: 'Nome do estabelecimento' })
    .fill('Invalid Name')
  await page.getByRole('textbox', { name: 'Seu e-mail' }).fill('test@test.com')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
  await page.getByRole('textbox', { name: 'Telefone' }).fill('123456')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar conta!')
  await expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
