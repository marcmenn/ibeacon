import { bucket, close } from './couchbase.js'
import { VIEWS_DESIGN_DOC } from './views.js'

const { stdin } = process
const inputChunks = []

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', (chunk) => {
  inputChunks.push(chunk)
})

stdin.on('end', () => {
  const inputJSON = inputChunks.join()
  const ddoc = JSON.parse(inputJSON)
  ddoc.name = VIEWS_DESIGN_DOC

  const promise = bucket().viewIndexes().upsertDesignDocument(ddoc)

  promise.catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exitCode = 1
  }).finally(close)
})
