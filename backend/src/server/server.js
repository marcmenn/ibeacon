import express from 'express'
import http from 'http'
import https from 'https'

import { defineActions } from './actions/index.js'
import { getHttpsCertificate } from './https-certificate/index.js'

class Server {
  constructor(config) {
    this.config = config
    this.urls = []
  }

  async start() {
    if (!this.serverHttp && !this.serverHttps) {
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
        this.urls.push(`http://127.0.0.1:${portHttp}`)
      }

      if (portHttps) {
        const defaultOptions = getHttpsCertificate()
        const httpsOptions = {
          cert: httpsCert || defaultOptions.cert,
          key: httpsKey || defaultOptions.key,
        }

        this.serverHttps = https.createServer(httpsOptions, app)
        await new Promise((resolve) => this.serverHttps.listen(portHttps, resolve))
        this.urls.push(`https://127.0.0.1:${portHttps}`)
      }
    }

    return {
      urls: this.urls.slice(),
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

    this.urls = []
  }
}

export {
  Server,
}
