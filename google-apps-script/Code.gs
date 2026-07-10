/**
 * bundl waitlist → Google Sheet
 *
 * Receives POST requests from the website's waitlist form and appends each
 * signup as a row in the bound spreadsheet.
 *
 * Setup:
 *   1. In your Google Sheet: Extensions → Apps Script.
 *   2. Delete any boilerplate, paste this whole file, Save.
 *   3. Deploy → New deployment → type "Web app".
 *        - Execute as:    Me
 *        - Who has access: Anyone
 *      Deploy, authorize, and copy the Web app URL (ends in /exec).
 *   4. Send that /exec URL to wire into the site.
 *
 * To change the code later, redeploy with "Manage deployments → Edit → New version".
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Signups') || ss.getSheets()[0];

    var data = JSON.parse(e.postData.contents);

    // Write a header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['timestamp', 'email', 'role']);
    }

    sheet.appendRow([new Date(), data.email || '', data.role || 'buyer']);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
