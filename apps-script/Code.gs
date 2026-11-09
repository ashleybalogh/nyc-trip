/**
 * NYC Spring Break: Family Picks — answer store.
 *
 * Paste this whole file into Extensions > Apps Script in a new Google Sheet,
 * then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Copy the web app URL into config.js in the site.
 *
 * Each person's answers live on one row of the "Responses" tab, keyed by
 * lowercase name. Saving again with the same name replaces that row.
 * To remove a test answer, just delete its row in the sheet.
 */

const SHEET_NAME = 'Responses';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['key', 'name', 'updated', 'answers']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// GET: return everyone's answers.
function doGet(e) {
  const rows = sheet_().getDataRange().getValues().slice(1);
  const responses = [];
  rows.forEach(function (r) {
    if (!r[3]) return;
    try { responses.push(JSON.parse(r[3])); } catch (err) {}
  });
  return json_({ ok: true, responses: responses });
}

// POST: save (or replace) one person's answers.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const r = JSON.parse(e.postData.contents);
    if (!r || !r.name || !String(r.name).trim()) throw new Error('Missing name');
    const name = String(r.name).trim().slice(0, 40);
    const key = name.toLowerCase();
    r.name = name;
    r.at = new Date().toISOString();
    const body = JSON.stringify(r);
    if (body.length > 45000) throw new Error('Answers too long');

    const sh = sheet_();
    const keys = sh.getRange(1, 1, Math.max(sh.getLastRow(), 1), 1).getValues();
    let row = -1;
    for (let i = 1; i < keys.length; i++) {
      if (keys[i][0] === key) { row = i + 1; break; }
    }
    const data = [key, name, r.at, body];
    if (row > 0) sh.getRange(row, 1, 1, 4).setValues([data]);
    else sh.appendRow(data);
    return json_({ ok: true, name: name });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}
