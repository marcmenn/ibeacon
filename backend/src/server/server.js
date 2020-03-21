import express from 'express'
import http from 'http'
import https from 'https'

import { defineActions } from './actions'
import { getHttpsCertificate } from './https-certificate'

class Server {
  constructor(config) {
    this.config = config
  }

  async start() {
    if (!this.http) {
      const {
        httpsCert,
        httpsKey,
        portHttp,
        portHttps,
      } = this.config
      const app = express()

      defineActions(app)

      if (portHttp) {
        this.serverHttp = http.createServer(app)
        await new Promise((resolve) => this.serverHttp.listen(portHttp, resolve))
      }

      if (portHttps) {
        const defaultOptions = getHttpsCertificate()
        const httpsOptions = {
          cert: httpsCert || defaultOptions.cert,
          key: httpsKey || defaultOptions.key,
        }

        this.serverHttps = https.createServer(httpsOptions, app)
        await new Promise((resolve) => this.serverHttps.listen(portHttps, resolve))
      }
    }
  }

  async stop() {
    if (this.serverHttp) {
      await new Promise((resolve) => {
        this.serverHttp.close(resolve)
      })
    }
    if (this.serverHttps) {
      await new Promise((resolve) => {
        this.serverHttps.close(resolve)
      })
    }
  }
}

export {
  Server,
}
