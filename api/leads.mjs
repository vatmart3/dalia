// Fonction Vercel : même API de leads que le serveur Node (server/leads.mjs).
// Le disque de Vercel est en lecture seule sauf /tmp, et /tmp est effacé régulièrement :
// les demandes partent par e-mail (RESEND_API_KEY) et dans le Google Forms (voir README).
import { handleLeadsApi } from '../server/leads.mjs'

export default function handler(req, res) {
  return handleLeadsApi(req, res)
}
