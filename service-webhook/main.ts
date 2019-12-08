import * as http from 'http'

const SERVICE_PORT = process.env.SERVICE_PORT
const CHECKOUT_HOST = process.env.CHECKOUT_HOST
const CHECKOUT_PORT = process.env.CHECKOUT_PORT

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
  console.info(wh.checkout_sha)
}

function webhookHanlder(req: http.IncomingMessage, res: http.ServerResponse, use: (body) => void) {
  const body = []
  req.on('data', (c: string) => body.push(c))
  req.on('end', () => { use(JSON.parse(body.join())); res.end(); })
}

function onRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
  if (req.url === '/webhook' && req.method === 'POST') {
    webhookHanlder(req, res, processWebhook)
    return
  }
  res.end()
}

http.createServer(onRequest).listen(SERVICE_PORT, () => console.info('webhook service start.'))