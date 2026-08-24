import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'url-injector',
    transformIndexHtml(html) {
      const url = process.env.DEPLOY_PRIME_URL || ''
      return html.replaceAll('$THE_URL$', url)
    }
  }],
})
