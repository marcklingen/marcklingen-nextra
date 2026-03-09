# Google Sheet Subscription Setup

This site expects a Google Apps Script web app that accepts a JSON `POST` request and appends rows to a Google Sheet.

## 1. Create the spreadsheet

Create a Google Sheet named `Blog Subscribers`.

Rename the first tab to `Subscribers`.

Add this header row in row 1:

```text
email | source | submitted_at
```

## 2. Create the bound Apps Script

From the sheet, open `Extensions` -> `Apps Script`.

Replace the default script with:

```javascript
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function jsonResponse(payload, status) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
  try {
    const properties = PropertiesService.getScriptProperties()
    const secret = properties.getProperty('SUBSCRIBE_SHARED_SECRET')
    const sheetName = properties.getProperty('SUBSCRIBERS_SHEET_NAME') || 'Subscribers'

    if (!secret) {
      return jsonResponse({ ok: false, error: 'Missing script secret.' }, 500)
    }

    const payload = JSON.parse(e.postData.contents || '{}')
    const email = String(payload.email || '').trim().toLowerCase()
    const source = String(payload.source || '').trim()
    const submittedAt = String(payload.submittedAt || '').trim()
    const providedSecret = String(payload.secret || '')

    if (providedSecret !== secret) {
      return jsonResponse({ ok: false, error: 'Unauthorized.' }, 403)
    }

    if (!email || !EMAIL_PATTERN.test(email)) {
      return jsonResponse({ ok: false, error: 'Invalid email.' }, 400)
    }

    if (!source) {
      return jsonResponse({ ok: false, error: 'Invalid source.' }, 400)
    }

    if (!submittedAt) {
      return jsonResponse({ ok: false, error: 'Missing timestamp.' }, 400)
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)

    if (!sheet) {
      return jsonResponse({ ok: false, error: 'Sheet not found.' }, 500)
    }

    sheet.appendRow([email, source, submittedAt])

    return jsonResponse({ ok: true })
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) })
  }
}
```

## 3. Add script properties

In Apps Script, open `Project Settings` -> `Script properties`.

Add:

```text
SUBSCRIBE_SHARED_SECRET = <a long random string>
SUBSCRIBERS_SHEET_NAME = Subscribers
```

You can generate the secret locally with:

```bash
openssl rand -hex 32
```

## 4. Deploy the web app

Use `Deploy` -> `New deployment`.

Choose:

- Type: `Web app`
- Execute as: `Me`
- Who has access: `Anyone`

Authorize the deployment when prompted, then copy the final `/exec` URL.

Use the `/exec` URL in Vercel. Do not use the `/dev` test URL.

## 5. Add Vercel environment variables

Set these in your Vercel project:

```text
SUBSCRIBE_APPS_SCRIPT_URL=<your Apps Script /exec URL>
SUBSCRIBE_SHARED_SECRET=<the same secret stored in Apps Script>
```

Redeploy after adding the variables.

## 6. Manual verification

Test a request from your terminal:

```bash
curl -X POST "$SUBSCRIBE_APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","source":"/posts","submittedAt":"2026-03-09T12:00:00.000Z","secret":"YOUR_SECRET"}'
```

Expected response:

```json
{"ok":true}
```

Then confirm a new row was added to the `Subscribers` sheet.
