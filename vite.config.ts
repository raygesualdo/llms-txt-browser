import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const commitSha = process.env.COMMIT_REF || execSync('git rev-parse HEAD').toString().trim()

export default defineConfig({
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha),
  },
  plugins: [react(), tailwindcss(), {
    name: 'url-injector',
    transformIndexHtml(html) {
      const url = process.env.DEPLOY_PRIME_URL || ''
      return html.replaceAll('$THE_URL$', url)
    }
  }],
})
