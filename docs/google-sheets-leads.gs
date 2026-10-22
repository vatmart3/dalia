/**
 * Frescy — réception des demandes d'essai par e-mail + dans une feuille Google Sheets.
 *
 * 1. Sur ordinateur, ouvrez script.google.com → « Nouveau projet ».
 *    (Ou, depuis une feuille Google Sheets : Extensions → Apps Script.)
 * 2. Collez ce fichier à la place du contenu, enregistrez.
 * 3. Choisissez la fonction « testEmail » en haut de l'éditeur → « Exécuter »
 *    (Google demande l'autorisation la 1re fois) : vous recevez un e-mail de test,
 *    et une feuille « Demandes Frescy » est créée dans votre Google Drive.
 * 4. Déployer → Nouveau déploiement → Application Web
 *    (Exécuter en tant que : moi ; Qui a accès : tout le monde).
 * 5. Copiez l'URL obtenue (…/exec) dans la variable LEADS_WEBHOOK_URL du serveur Frescy (Vercel).
 */

const NOTIFY_EMAIL = 'jeremyvatuonepro@gmail.com' // ← adresse qui reçoit les demandes d'essai

/** La feuille du projet si le script est attaché à une feuille, sinon une feuille créée une fois dans le Drive. */
function getSheet() {
  const active = SpreadsheetApp.getActiveSpreadsheet()
  if (active) return active.getSheets()[0]
  const props = PropertiesService.getScriptProperties()
  let id = props.getProperty('SHEET_ID')
  if (!id) {
    id = SpreadsheetApp.create('Demandes Frescy').getId()
    props.setProperty('SHEET_ID', id)
  }
  return SpreadsheetApp.openById(id).getSheets()[0]
}

function doPost(e) {
  const lead = JSON.parse(e.postData.contents)
  const sheet = getSheet()
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

/** À lancer depuis l'éditeur (bouton « Exécuter ») : simule une demande d'essai. */
function testEmail() {
  doPost({ postData: { contents: JSON.stringify({ date: new Date().toISOString(), nom: 'Test Frescy', commerce: 'Épicerie test', ville: 'Sète', telephone: '0600000000', pertesSemaine: 150, source: 'test' }) } })
}
