import * as http from 'http'

import * as got from 'got'

const SERVICE_PORT = process.env.SERVICE_PORT
const checkoutSvcAddr = process.env.CHECKOUT_SERVICE_ADDR
const checkoutSvcPort = process.env.CHECKOUT_SERVICE_PORT

interface IWebhook {
  checkout_sha: string,
  commits?: { author?: { name: string, email: string }, modified?: string[], added?: string[], timestamp?: string }[]
}


// function sendCheckoutService() {
//   // http.request({
//   //   host: CHECKOUT_HOST,
//   //   port: CHECKOUT_PORT,
//   //   method: 'POST'
//   // })

// }

// function xx(wh: IWebhook): void {

// }

function processWebhook(wh: IWebhook) {
}

function webhookHanlder(req: http.IncomingMessage, res: http.ServerResponse, use: (iw: IWebhook) => void) {
  const body: string[] = []
  req.on('data', (c: string) => body.push(c))
  req.on('end', () => { use(JSON.parse(body.join()) as IWebhook); res.end(); })
}

function onRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
  if (req.url === '/webhook/gitlab' && req.method === 'POST') {
    webhookHanlder(req, res, processWebhook)
    return
  }
  res.end()
}

http.createServer(onRequest).listen(SERVICE_PORT, () => console.info('webhook service start.'))