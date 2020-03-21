import express from 'express'

import { defineActions } from './actions/index.js'

export default () => {
  const app = express()

  defineActions(app)
  return app
}
