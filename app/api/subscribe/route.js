import { checkBotId } from 'botid/server'
import { NextResponse } from 'next/server'

const APPS_SCRIPT_TIMEOUT_MS = 10_000
const APPS_SCRIPT_URL = process.env.SUBSCRIBE_APPS_SCRIPT_URL
const SHARED_SECRET = process.env.SUBSCRIBE_SHARED_SECRET
const SITE_URL = 'https://marcklingen.com'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getAllowedOrigins(request) {
  const origins = new Set([SITE_URL, request.nextUrl.origin])

  if (process.env.NODE_ENV !== 'production') {
    origins.add('http://localhost:3000')
    origins.add('http://localhost:3334')
    origins.add('http://127.0.0.1:3000')
    origins.add('http://127.0.0.1:3334')
  }

  return origins
}

function json(data, init) {
  return NextResponse.json(data, init)
}

export async function POST(request) {
  if (!APPS_SCRIPT_URL || !SHARED_SECRET) {
    console.error('Missing subscription environment variables.')

    return json(
      { ok: false, message: ERROR_MESSAGE },
      { status: 500 }
    )
  }

  const origin = request.headers.get('origin')

  if (!origin || !getAllowedOrigins(request).has(origin)) {
    return json({ ok: false, message: 'Invalid origin.' }, { status: 403 })
  }

  let verification

  try {
    verification = await checkBotId()
  } catch (error) {
    console.error('BotID verification failed:', error)

    return json({ ok: false, message: ERROR_MESSAGE }, { status: 502 })
  }

  if (verification.isBot) {
    return json({ ok: false, message: 'Access denied.' }, { status: 403 })
  }

  let body

  try {
    body = await request.json()
  } catch {
    return json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const email = body?.email?.trim().toLowerCase()
  const source = body?.source?.trim()
  const website = body?.website?.trim()

  if (website) {
    return json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, message: 'Please enter a valid email.' }, { status: 400 })
  }

  if (!source) {
    return json({ ok: false, message: 'Invalid source.' }, { status: 400 })
  }

  const submittedAt = new Date().toISOString()

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        source,
        submittedAt,
        secret: SHARED_SECRET
      }),
      signal: AbortSignal.timeout(APPS_SCRIPT_TIMEOUT_MS)
    })

    const rawBody = await response.text()
    let data = null

    try {
      data = rawBody ? JSON.parse(rawBody) : null
    } catch {
      data = null
    }

    if (!response.ok || !data?.ok) {
      console.error('Subscription upstream error:', {
        status: response.status,
        body: rawBody
      })

      return json({ ok: false, message: ERROR_MESSAGE }, { status: 502 })
    }

    return json({ ok: true })
  } catch (error) {
    console.error('Subscription request failed:', error)

    return json({ ok: false, message: ERROR_MESSAGE }, { status: 502 })
  }
}

const ERROR_MESSAGE = 'Couldn’t save your email. Please try again.'
