import fs from 'fs'
import { bucket, close } from './couchbase.js'

import { VIEWS_DESIGN_DOC } from './views.js'

const run = async () => {
  const ddoc = JSON.parse(fs.readFileSync('./views/build/views.json'))
  ddoc.name = VIEWS_DESIGN_DOC
  await bucket().viewIndexes().upsertDesignDocument(ddoc)
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exitCode = 1
}).finally(close)
