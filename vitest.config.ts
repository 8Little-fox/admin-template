import { defaultExclude, defineConfig } from 'vitest/config'
import { alias } from './alias'

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    alias,
  },
  test: {
    environment: 'jsdom',
    testTimeout: 30_000,
    name: 'unit',
    setupFiles: ['./test/setup.ts'],
    exclude: [...defaultExclude, '**/svelte-scoped/**'],
  },
})
