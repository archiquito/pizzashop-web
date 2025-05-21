import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { OrderStatus } from './order-status'

describe('OrderStatus', () => {
  it('should display the correct status is Pending', () => {
    /* Pending */
    const wrapper = render(<OrderStatus status="pending" />)
    //wrapper.debug()
    expect(wrapper.getByText('Pendente')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-yellow-500')
  })

  it('should display the correct status is Canceled', () => {
    /* Canceled */
    const wrapper = render(<OrderStatus status="canceled" />)
    //wrapper.debug()
    expect(wrapper.getByText('Cancelado')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-red-600')
  })

  it('should display the correct status is Delivered', () => {
    /* Delivered */
    const wrapper = render(<OrderStatus status="delivered" />)
    //wrapper.debug()
    expect(wrapper.getByText('Entregue')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-green-600')
  })

  it('should display the correct status is Delivering', () => {
    /* Delivering */
    const wrapper = render(<OrderStatus status="delivering" />)
    //wrapper.debug()
    expect(wrapper.getByText('Entregando')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-green-400')
  })

  it('should display the correct status is Processing', () => {
    /* Processing */
    const wrapper = render(<OrderStatus status="processing" />)
    //wrapper.debug()
    expect(wrapper.getByText('Processando')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-blue-500')
  })
})
