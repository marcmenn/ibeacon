import fs from 'fs'
import { bucket, close } from './couchbase.js'

const run = async () => {
  const ddoc = JSON.parse(fs.readFileSync('./views/build/views.json'))
  ddoc.name = 'views'
  await bucket().viewIndexes().upsertDesignDocument(ddoc)
}

run().catch((e) => {
  console.error(e)
  process.exitCode = 1
}).finally(close)
