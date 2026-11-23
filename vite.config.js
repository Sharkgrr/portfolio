
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  server: { proxy: { '/api': 'http://127.0.0.1:4111' } },
  preview: { proxy: { '/api': 'http://127.0.0.1:4111' } },
})
