import { getVersion } from '../../get-version.js'
import { connect } from '../../database/backend/couchbase/index.js'

export default () => async (req, res) => {
  const diag = await connect().diagnostics()
  res.send({
    name: 'ibeacon API',
    version: getVersion(),
    couchbase: diag,
  })
}
