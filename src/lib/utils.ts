import { type ClassValue, clsx } from 'clsx'
import { formatDistanceToNow, type Locale } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDistance(createdAt: string, locale: Locale) {
  const distance = formatDistanceToNow(new Date(createdAt), {
    locale,
    addSuffix: true,
  })

  return distance
}
