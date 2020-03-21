import mocha from 'mocha'
import { connect, close } from '../src/database/backend/couchbase/index.js'

const { after, before } = mocha

after(close)
before(connect)
