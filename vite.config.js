import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import orderHandler from './api/order.js'
import contactHandler from './api/contact.js'
import notifyHandler from './api/notify.js'

// Vercel serves the files in /api in production. This small plugin mirrors
// that behaviour in `npm run dev` so the demo forms can be tested locally.
function demoApi() {
  const handlers = {
    order: orderHandler,
    contact: contactHandler,
    notify: notifyHandler,
  }

  return {
    name: 'hwa-demo-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/(order|contact|notify)(?:\?|$)/)
        if (!match) {
          next()
          return
        }

        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        req.body = Buffer.concat(chunks).toString('utf8')

        // Vercel adds these helpers to its serverless responses.
        res.status = (statusCode) => {
          res.statusCode = statusCode
          return res
        }
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
          return res
        }

        handlers[match[1]](req, res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), demoApi()],
})
