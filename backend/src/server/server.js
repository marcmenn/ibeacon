import express from 'express'

import { Database } from '../database/index.js'
import { CouchbaseDatabaseBackend } from '../database/backend/couchbase/index.js'
import { defineActions } from './actions/index.js'

export default () => {
  const databaseBackend = new CouchbaseDatabaseBackend() // TODO: replace by couchbase backend
  const database = new Database(databaseBackend)
  const context = { database }

  const app = express()

  defineActions(app, context)
  return app
}
