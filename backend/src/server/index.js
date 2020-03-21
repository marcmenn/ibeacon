import { Server } from './server'

const config = {
  port: 3000,
}

const bootstrap = async () => {
  const server = new Server(config)
  await server.start()

  // eslint-disable-next-line no-console
  console.log(`ibeacon server listening on http://127.0.0.1:${config.port}`)
}

bootstrap()
