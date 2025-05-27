import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { approveOrderMockHandler } from './approve-order-mock'
import { cancelOrderMockHandler } from './cancel-order-mock'
import { deliverOrderMockHandler } from './deliver-order-mock'
import { dispatchOrderMockHandler } from './dispatch-order-mock'
import { getDailyRevenueInPeriodMockHandler } from './get-daily-revenue-in-period-mock'
import { getDayOrdersAmountMockHandler } from './get-day-orders-amount-mock'
import { getManagerRestaurantsMockHandler } from './get-manager-restaurants-mock'
import { getMonthCanceledOrdersAmountMockHandler } from './get-month-canceled-orders-amount-mock'
import { getMonthOrdersAmountMockHandler } from './get-month-orders-amount-mock'
import { getMonthRevenueMockHandler } from './get-month-revenue-mock'
import { getOrdersDetailMockHandler } from './get-orders-detail-mock'
import { getOrdersMockHandler } from './get-orders-mock'
import { getPopularProductsMockHandler } from './get-popular-products-mock'
import { getProfileMockHandler } from './get-profile-mock'
import { registerRestaurantsMockHandler } from './register-restaurants-mock'
import { signInMockHandler } from './sign-in-mock'
import { updateProfileMockHandler } from './update-profile-mock'

export const worker = setupWorker(
  signInMockHandler,
  registerRestaurantsMockHandler,
  getDayOrdersAmountMockHandler,
  getMonthOrdersAmountMockHandler,
  getMonthCanceledOrdersAmountMockHandler,
  getMonthRevenueMockHandler,
  getDailyRevenueInPeriodMockHandler,
  getPopularProductsMockHandler,
  getProfileMockHandler,
  updateProfileMockHandler,
  getOrdersMockHandler,
  getOrdersDetailMockHandler,
  approveOrderMockHandler,
  cancelOrderMockHandler,
  deliverOrderMockHandler,
  dispatchOrderMockHandler,
  getManagerRestaurantsMockHandler,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
