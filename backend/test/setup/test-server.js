import { Server } from '../../src/server'

const CONFIG = {
  port: 3001,
}

const TEST_HOST = `http://127.0.0.1:${CONFIG.port}`

let testServer

const getTestHost = () => TEST_HOST

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
