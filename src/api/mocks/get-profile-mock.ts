import { http, HttpResponse } from 'msw'

import type { GetProfileResponse } from '../get-profile'

export const getProfileMockHandler = http.get<never, never, GetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      role: 'manager',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    })
  },
)
