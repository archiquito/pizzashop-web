import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Pagination } from './pagination'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  it('should render the pagination component', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    )
    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to change next the page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const clickNextButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(clickNextButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to change previous the page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const clickNextButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(clickNextButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(4)
  })

  it('should be able to change last page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const clickNextButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(clickNextButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })
})
