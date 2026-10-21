// Fonction Vercel : même API de leads que le serveur Node (server/leads.mjs).
// Le disque de Vercel est en lecture seule sauf /tmp, et /tmp est effacé régulièrement :
// pour garder les demandes, définissez LEADS_WEBHOOK_URL (voir docs/google-sheets-leads.gs).
process.env.LEADS_DIR ||= '/tmp/dalia-leads'

const { handleLeadsApi } = await import('../server/leads.mjs')

export default function handler(req, res) {
  return handleLeadsApi(req, res)
}
