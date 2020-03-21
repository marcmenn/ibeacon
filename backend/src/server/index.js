import { Server } from './server.js'

const partArguments = () => {
  const args = {}

  for (const arg of process.argv.slice(2)) {
    const [name, value] = arg.split('=')
    args[name] = value || ''
  }

  return args
}

const bootstrap = async () => {
  const config = {}
  const args = partArguments()
  const urls = []
  const startHttp = 'http' in args
  let startHttps = 'https' in args

  if (!startHttp && !startHttps) {
    startHttps = true
  }

  if (startHttp) {
    config.portHttp = args.http || 80
    urls.push(`http://127.0.0.1:${config.portHttp}`)
  }

  if (startHttps) {
    config.portHttps = args.https || 443
    urls.push(`https://127.0.0.1:${config.portHttps}`)
  }

  const server = new Server(config)
  await server.start()

  for (const url of urls) {
    // eslint-disable-next-line no-console
    console.log(`ibeacon server listening on ${url}`)
  }
}

bootstrap()
