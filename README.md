# NYC Spring Break: Family Picks

A small survey for planning the March 2027 New York trip. Each person rates trip themes and specific things to do; the results page ranks them for the whole family.

- `index.html`, `app.js`: the survey site (GitHub Pages).
- `config.js`: holds the Google Apps Script web app URL that stores answers.
- `apps-script/Code.gs`: the script that saves answers to a Google Sheet.

## One-time setup (about 5 minutes)

1. Create a new Google Sheet (any name, e.g. "NYC Trip Picks").
2. In the Sheet: Extensions > Apps Script. Delete what's there, paste in `apps-script/Code.gs`, and save.
3. Deploy > New deployment > type **Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and approve the permission prompts.
4. Copy the web app URL (ends in `/exec`) and paste it into `config.js`.

Answers land on the **Responses** tab, one row per person. Delete a row to remove someone's answers (for example, a test).

If saving ever fails, the page falls back to letting the person text or email their answers to Ash, who can paste them in under "For Ash: add answers someone texted you".

Results: open the site and tap "See results", or go to `#results`.
