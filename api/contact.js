// Demo contact endpoint. Accepts a test message and returns a success response.
// No email is sent and nothing is stored.

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

function cleanString(value, max = 1000) {
  if (value == null) return ''
  return String(value).trim().slice(0, max)
}

export default function handler(req, res) {
  applyHeaders(res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({
      ok: false,
      message: 'Method not allowed. Send a POST request with a demo message.',
    })
    return
  }

  const payload = parseBody(req.body)
  const message = cleanString(payload.message)

  if (!message) {
    res.status(400).json({ ok: false, message: 'A message is required.' })
    return
  }

  res.status(200).json({
    ok: true,
    demo: true,
    receivedAt: new Date().toISOString(),
    message: 'Demo message received. No email was sent.',
  })
}
