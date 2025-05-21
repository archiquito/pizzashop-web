import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './test/setup.ts',
    environment: 'happy-dom',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      { find: '@lib', replacement: path.resolve(__dirname, './src/lib') },
    ],
  },
})
