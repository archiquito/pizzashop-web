import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { NavLink } from './nav-link'

describe('NavLink', () => {
  it('should render the nav link component and highlight the active link', () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
        ),
      },
    )

    expect(wrapper.getByText('Home')).toHaveAttribute('data-current', 'false')
    expect(wrapper.getByText('About')).toHaveAttribute('data-current', 'true')
  })
})
