import fs from 'fs'
import { bucket, close } from './couchbase.js'

const VIEW_DESIGN_DOC = 'views'

const run = async () => {
  const ddoc = JSON.parse(fs.readFileSync('./views/build/views.json'))
  ddoc.name = VIEW_DESIGN_DOC
  await bucket().viewIndexes().upsertDesignDocument(ddoc)
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exitCode = 1
}).finally(close)
