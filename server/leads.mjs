// API de collecte des leads Dalia — sans dépendance, partagée entre
// le serveur de dev Vite et le serveur de production (server.mjs).
//
// POST /api/leads            → enregistre une demande d'essai (JSON)
// GET  /api/leads.csv?token= → export CSV (nécessite ADMIN_TOKEN)
//
// Les leads sont ajoutés ligne par ligne dans data/leads.jsonl.
// Transmission (au moins l'une des deux, sinon les demandes ne sont pas conservées sur Vercel) :
// - GOOGLE_FORM_URL : lien prérempli d'un Google Forms relié à une feuille Google Sheets
//   (Google ajoute la ligne et envoie lui-même l'e-mail de notification) ;
// - LEADS_WEBHOOK_URL : n'importe quel webhook JSON (Zapier, Make, Google Apps Script, Slack…).

import { appendFile, mkdir, readFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Sur Vercel, seul /tmp est inscriptible (et il est vidé régulièrement : utilisez LEADS_WEBHOOK_URL).
const DATA_DIR = process.env.LEADS_DIR || (process.env.VERCEL ? '/tmp/dalia-leads' : path.join(ROOT, 'data'))
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl')
const MAX_BODY = 8 * 1024

// Anti-spam simple : 5 envois par IP et par 10 minutes.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_MAX
}

function send(res, status, payload, headers = {}) {
  const body = typeof payload === 'string' ? payload : JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': typeof payload === 'string' ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  })
  res.end(body)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(Object.assign(new Error('Payload trop volumineux'), { status: 413 }))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

const clean = (v, max = 120) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max) : ''

// Numéros français : 06 12 34 56 78, +33 6 12 34 56 78, 0033…
export function normalizePhone(raw) {
  const digits = clean(raw, 30).replace(/[\s.\-()]/g, '')
  const m = digits.match(/^(?:\+33|0033|0)([1-9]\d{8})$/)
  return m ? `0${m[1]}` : null
}

export function validateLead(input) {
  const lead = {
    nom: clean(input?.nom),
    commerce: clean(input?.commerce),
    ville: clean(input?.ville, 80),
    telephone: normalizePhone(input?.telephone),
  }
  const errors = {}
  if (lead.nom.length < 2) errors.nom = 'Indiquez votre nom.'
  if (lead.commerce.length < 2) errors.commerce = 'Indiquez le nom ou le type de votre commerce.'
  if (lead.ville.length < 2) errors.ville = 'Indiquez votre ville.'
  if (!lead.telephone) errors.telephone = 'Numéro de téléphone français invalide.'
  return { lead, errors }
}

async function forwardToWebhook(entry) {
  const url = process.env.LEADS_WEBHOOK_URL
  if (!url) return false
  try {
    // Google Apps Script répond par une redirection ; un démarrage à froid peut prendre plusieurs secondes.
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    })
    const text = await r.text()
    const host = new URL(r.url).hostname
    if (host === 'accounts.google.com' || /ServiceLogin|signin/i.test(r.url)) {
      console.error('[leads] webhook : Google demande une connexion. Redéployez le script avec « Qui a accès : Tout le monde ».')
    } else if (!r.ok) {
      console.error(`[leads] webhook en échec : HTTP ${r.status} — ${text.slice(0, 200)}`)
    } else if (!text.includes('"ok":true')) {
      console.error(`[leads] webhook : réponse inattendue du script (erreur dans le script ?) — ${text.replace(/\s+/g, ' ').slice(0, 300)}`)
    } else {
      console.log('[leads] webhook OK : demande transmise au script Google')
    }
  } catch (err) {
    console.error('[leads] webhook injoignable :', err.message)
  }
  return true
}

// Lien prérempli Google Forms (même lien pour tout le monde : il n'a rien de secret).
// Peut aussi être défini dans la variable d'environnement GOOGLE_FORM_URL.
const DEFAULT_GOOGLE_FORM_URL = ''

const plain = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()

/** 0611718368 → « 06 11 71 83 68 » (avec espaces, Google Sheets garde le 0 du début). */
const spacedPhone = (p) => (p ? p.replace(/(\d{2})(?=\d)/g, '$1 ') : '')

/**
 * Envoie la demande à un Google Forms. Dans le lien prérempli, chaque question contient le mot
 * du champ à y mettre : nom, commerce, ville, telephone (et, si vous les avez ajoutées : pertes, source).
 */
async function forwardToGoogleForm(entry) {
  const raw = process.env.GOOGLE_FORM_URL || DEFAULT_GOOGLE_FORM_URL
  if (!raw) return false
  try {
    const link = new URL(raw)
    const action = `${link.origin}${link.pathname.replace(/\/(viewform|formResponse)\/?$/, '')}/formResponse`
    const values = {
      nom: entry.nom,
      commerce: entry.commerce,
      ville: entry.ville,
      telephone: spacedPhone(entry.telephone),
      pertes: entry.pertesSemaine ?? '',
      source: entry.source,
    }
    const body = new URLSearchParams()
    for (const [key, value] of link.searchParams) {
      if (!key.startsWith('entry.')) continue
      const field = plain(value)
      if (field in values) body.append(key, String(values[field]))
      else console.warn(`[leads] Google Forms : question préremplie avec « ${value} » non reconnue (attendu : nom, commerce, ville, telephone, pertes, source)`)
    }
    if (![...body.keys()].length) {
      console.error('[leads] Google Forms : aucun champ reconnu dans GOOGLE_FORM_URL (préremplissez nom, commerce, ville, telephone).')
      return true
    }
    const r = await fetch(action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    })
    if (/accounts\.google\.com|ServiceLogin/.test(r.url)) {
      console.error('[leads] Google Forms demande une connexion : dans les paramètres du formulaire, désactivez « Limiter à 1 réponse » et la collecte des adresses e-mail.')
    } else if (!r.ok) {
      console.error(`[leads] Google Forms en échec : HTTP ${r.status}`)
    } else {
      console.log('[leads] Google Forms OK : demande ajoutée à la feuille')
    }
  } catch (err) {
    console.error('[leads] Google Forms injoignable :', err.message)
  }
  return true
}


const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`

async function exportCsv(req, res, url) {
  const token = process.env.ADMIN_TOKEN
  if (!token || url.searchParams.get('token') !== token) return send(res, 401, { error: 'Non autorisé' })
  let raw = ''
  try {
    raw = await readFile(LEADS_FILE, 'utf8')
  } catch {
    /* aucun lead pour l'instant */
  }
  const rows = raw.split('\n').filter(Boolean).map((l) => JSON.parse(l))
  const cols = ['date', 'nom', 'commerce', 'ville', 'telephone', 'pertesSemaine', 'source']
  const csv = [cols.join(';'), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(';'))].join('\n')
  send(res, 200, '﻿' + csv, {
    'Content-Type': 'text/csv; charset=utf-8',
    'Content-Disposition': 'attachment; filename="dalia-leads.csv"',
  })
}

export async function handleLeadsApi(req, res) {
  const url = new URL(req.url, 'http://localhost')
  try {
    if (req.method === 'GET' && url.pathname === '/api/leads.csv') return await exportCsv(req, res, url)
    if (url.pathname !== '/api/leads') return send(res, 404, { error: 'Introuvable' })
    if (req.method !== 'POST') return send(res, 405, { error: 'Méthode non autorisée' }, { Allow: 'POST' })

    const ip = (req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || '').trim()
    if (rateLimited(ip)) return send(res, 429, { error: 'Trop de tentatives, réessayez dans quelques minutes.' })

    let input
    try {
      input = JSON.parse(await readBody(req))
    } catch (err) {
      return send(res, err.status || 400, { error: 'Requête invalide' })
    }

    // Pot de miel : un humain ne remplit pas ce champ caché.
    if (clean(input?.site)) return send(res, 200, { ok: true })

    const { lead, errors } = validateLead(input)
    if (Object.keys(errors).length) return send(res, 422, { error: 'Formulaire incomplet', fields: errors })

    // Estimation saisie dans le calculateur (€ par semaine), si le visiteur l'a utilisé.
    const pertes = Number(input?.pertesSemaine)
    const pertesSemaine = Number.isFinite(pertes) && pertes > 0 && pertes < 100000 ? Math.round(pertes) : null
    const entry = { id: randomUUID(), date: new Date().toISOString(), ...lead, pertesSemaine, source: clean(input?.source, 40) || 'landing' }
    await mkdir(DATA_DIR, { recursive: true })
    await appendFile(LEADS_FILE, JSON.stringify(entry) + '\n', 'utf8')
    const [sentToForm, sentToWebhook] = await Promise.all([forwardToGoogleForm(entry), forwardToWebhook(entry)])
    if (!sentToForm && !sentToWebhook) {
      console.warn('[leads] Ni GOOGLE_FORM_URL ni LEADS_WEBHOOK_URL : la demande n’est transmise nulle part (ni feuille, ni e-mail).')
    }
    console.log(`[leads] nouveau lead : ${entry.commerce} (${entry.ville})`)
    return send(res, 201, { ok: true, id: entry.id })
  } catch (err) {
    console.error('[leads] erreur :', err)
    return send(res, 500, { error: 'Erreur serveur, réessayez.' })
  }
}
