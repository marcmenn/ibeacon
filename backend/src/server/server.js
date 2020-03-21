import express from 'express'

import { Database } from '../database/index.js'
import { MockDatabaseBackend } from '../database/backend/mock/index.js'
import { defineActions } from './actions/index.js'

export default () => {
  const databaseBackend = new MockDatabaseBackend() // TODO: replace by couchbase backend
  const database = new Database(databaseBackend)
  const context = { database }

  const app = express()

  defineActions(app, context)
  return app
}
