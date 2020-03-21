import http from 'http'

import createApp from './server.js'
import { connect } from '../database/couchbase.js'

connect()
const serverHttp = http.createServer(createApp())
const port = 80

serverHttp.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`cochaine listening on port ${port}`)
})
