import express from 'express'

import { defineActions } from './actions'

class Server {
  constructor(config) {
    this.config = config
  }

  async start() {
    if (!this.http) {
      const { port = 3000 } = this.config
      const app = express()

      defineActions(app)

      return new Promise((resolve) => {
        this.http = app.listen(port, resolve)
      })
    }

    return undefined
  }

  async stop() {
    if (this.http) {
      return new Promise((resolve) => {
        this.http.close(resolve)
      })
    }

    return undefined
  }
}

export {
  Server,
}
