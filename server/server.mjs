// Serveur de production : sert le build Vite (dist/) + l'API de leads.
// Usage : npm run build && npm start   (PORT=3000 par défaut)

import http from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleLeadsApi } from './leads.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const PORT = Number(process.env.PORT) || 3000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
}

async function serveStatic(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost')
  let file = path.normalize(path.join(DIST, decodeURIComponent(pathname)))
  if (!file.startsWith(DIST)) {
    res.writeHead(403).end()
    return
  }
  try {
    const s = await stat(file)
    if (s.isDirectory()) file = path.join(file, 'index.html')
    await stat(file)
  } catch {
    file = path.join(DIST, 'index.html') // one-page : tout retombe sur l'accueil
  }
  const ext = path.extname(file)
  const immutable = file.includes(`${path.sep}assets${path.sep}`)
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=300',
    ...SECURITY_HEADERS,
  })
  createReadStream(file).pipe(res)
}

http
  .createServer((req, res) => {
    if (req.url?.startsWith('/api/')) return handleLeadsApi(req, res)
    if (req.method !== 'GET' && req.method !== 'HEAD') return res.writeHead(405).end()
    serveStatic(req, res)
  })
  .listen(PORT, () => console.log(`Dalia → http://localhost:${PORT}`))
