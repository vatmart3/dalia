// Fonction Vercel : même API de leads que le serveur Node (server/leads.mjs).
// Le disque de Vercel est en lecture seule sauf /tmp, et /tmp est effacé régulièrement :
// pour garder les demandes, définissez LEADS_WEBHOOK_URL (voir docs/google-sheets-leads.gs).
import { handleLeadsApi } from '../server/leads.mjs'

export default function handler(req, res) {
  return handleLeadsApi(req, res)
}
