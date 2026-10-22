// Construit un aperçu statique (dist-demo/) publiable comme artefact claude.ai :
// chemins relatifs, formulaire simulé, et index.html réduit à son contenu
// (l'hébergeur ajoute lui-même doctype, <html>, <head> et <body>).
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

execSync('npx vite build --mode demo --base ./ --outDir dist-demo --emptyOutDir', { stdio: 'inherit' })

const file = 'dist-demo/index.html'
let html = readFileSync(file, 'utf8')
html = html
  .replace(/<!doctype html>/i, '')
  .replace(/<\/?html[^>]*>/gi, '')
  .replace(/<\/?head>/gi, '')
  .replace(/<\/?body>/gi, '')
  .replace(/<meta charset="UTF-8" \/>\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '')
  .replace(/<title>[\s\S]*?<\/title>/i, '<title>Frescy</title>')
  .replace(/\n\s*\n/g, '\n')
  .trim()
writeFileSync(file, html + '\n')
console.log('Aperçu prêt : dist-demo/')
