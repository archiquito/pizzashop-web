import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { queryClient } from '@/lib/react-query'

import { SignIn } from './SignIn'

describe('SignIn', () => {
  it('should set default email input value if email is present on serach params', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter initialEntries={['/sign-in?email=test@test.com']}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    })
    const input = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement
    expect(input).toHaveAttribute('data-slot', 'input')
    expect(input).toHaveValue('test@test.com')
  })
})
