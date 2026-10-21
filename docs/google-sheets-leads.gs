/**
 * Dalia — réception des demandes d'essai dans Google Sheets + e-mail.
 *
 * 1. Créez une feuille Google Sheets, puis Extensions → Apps Script.
 * 2. Collez ce fichier, remplacez NOTIFY_EMAIL, enregistrez.
 * 3. Déployer → Nouveau déploiement → Application Web
 *    (Exécuter en tant que : vous ; Accès : tout le monde).
 * 4. Copiez l'URL obtenue dans la variable LEADS_WEBHOOK_URL du serveur Dalia.
 */

const NOTIFY_EMAIL = 'bonjour@dalia.fr' // ← votre adresse

function doPost(e) {
  const lead = JSON.parse(e.postData.contents)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Nom', 'Commerce', 'Ville', 'Téléphone', 'Pertes estimées (€/sem.)', 'Source'])
  }
  sheet.appendRow([new Date(lead.date), lead.nom, lead.commerce, lead.ville, lead.telephone, lead.pertesSemaine || '', lead.source])

  const pertes = lead.pertesSemaine ? `\nPertes estimées : ${lead.pertesSemaine} € / semaine` : ''
  MailApp.sendEmail(
    NOTIFY_EMAIL,
    `Nouvelle demande d'essai : ${lead.commerce} (${lead.ville})`,
    `${lead.nom}\n${lead.commerce}, ${lead.ville}\nTéléphone : ${lead.telephone}${pertes}\n\nÀ rappeler rapidement !`,
  )
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)
}
