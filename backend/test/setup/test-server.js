import { Server } from '../../src/server/server'

const CONFIG = {
  portHttps: 3030,
}

const TEST_HOST = `https://127.0.0.1:${CONFIG.portHttps}`

let testServer

const getTestHost = () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  return TEST_HOST
}

const startTestServer = async () => {
  testServer = new Server(CONFIG)
  await testServer.start()
}

const stopTestServer = async () => {
  if (testServer) {
    await testServer.stop()
  }

  testServer = undefined
}

export {
  getTestHost,
  startTestServer,
  stopTestServer,
}
