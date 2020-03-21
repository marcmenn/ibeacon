import { Server } from '../../src/server/server.js'

const CONFIG = {
  portHttp: 3030,
  // portHttps: 3030,
}

let testHost

const getTestHost = () => testHost

const withTestServer = (config = CONFIG) => {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  let testServer

  // eslint-disable-next-line no-undef
  before(async () => {
    testServer = new Server(config)
    const { urls } = await testServer.start()
    // eslint-disable-next-line prefer-destructuring
    testHost = urls[0]
  })

  // eslint-disable-next-line no-undef
  after(async () => {
    if (testServer) {
      await testServer.stop()
    }

    testServer = undefined
  })
}

export {
  getTestHost,
  withTestServer,
}
