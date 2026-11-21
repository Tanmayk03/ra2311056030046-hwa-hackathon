// Demo order endpoint. Accepts a test order and returns a reference.
// No payment is taken and nothing is stored.

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

function cleanString(value, fallback = '', max = 200) {
  if (value == null) return fallback
  return String(value).trim().slice(0, max)
}

function cleanItems(value) {
  if (!Array.isArray(value)) return []
  return value.slice(0, 50).map((item, index) => {
    const raw = item && typeof item === 'object' ? item : {}
    const quantity = Number(raw.quantity)
    return {
      id: cleanString(raw.id, `item-${index + 1}`, 80),
      name: cleanString(raw.name, 'Placeholder item', 160),
      quantity: Number.isFinite(quantity) ? Math.min(99, Math.max(1, Math.floor(quantity))) : 1,
      price: raw.price == null ? null : raw.price,
    }
  })
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
      message: 'Method not allowed. Send a POST request to place a demo order.',
    })
    return
  }

  const payload = parseBody(req.body)
  const customer = payload.customer && typeof payload.customer === 'object' ? payload.customer : {}
  const items = cleanItems(payload.items)
  const orderId = `HWA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`

  res.status(201).json({
    ok: true,
    demo: true,
    orderId,
    reference: orderId,
    receivedAt: new Date().toISOString(),
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    customer: { name: cleanString(customer.name, '', 120) },
    note: cleanString(payload.note, '', 1000),
    items,
    message: 'Demo order received. No payment was processed.',
  })
}
