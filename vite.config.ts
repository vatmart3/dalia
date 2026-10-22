import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-expect-error — module JS partagé avec le serveur de production
import { handleLeadsApi } from './server/leads.mjs'

// En dev, on branche la même API de leads que le serveur de production.
function leadsApi(): Plugin {
  return {
    name: 'frescy-leads-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/leads')) {
          handleLeadsApi(req, res)
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), leadsApi()],
  build: {
    target: 'es2020',
    // La 3D (three, R3F, drei) est chargée à la demande par les scènes lazy.
    chunkSizeWarningLimit: 1200,
  },
})
