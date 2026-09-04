import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: './' removed — it breaks React Router on Render (causes 404 on page refresh)
})
