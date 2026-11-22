// Demo notify-me endpoint. Accepts an email address and product name,
// returns a success response, and stores nothing.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function applyHeaders(res) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value))
}

function parseBody(body) {
  if (body && typeof body === 'object' && !Buffer.isBuffer(body)) return body
  if (typeof body !== 'string') return {}
  try {
    return JSON.parse(body)
  } catch {
    return {}
  }
}

export default function handler(req, res) {
  applyHeaders(res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed. Send a POST request.' })
    return
  }

  const payload = parseBody(req.body)
  const email = String(payload.email ?? '').trim()
  const product = String(payload.product ?? '').trim()

  if (!email || !email.includes('@')) {
    res.status(400).json({ ok: false, message: 'A valid email is required.' })
    return
  }

  res.status(200).json({
    ok: true,
    demo: true,
    product,
    receivedAt: new Date().toISOString(),
    message: 'Demo interest recorded. No email will be sent.',
  })
}
