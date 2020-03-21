import { getVersion } from '../../get-version.js'
import { connect } from '../../database/couchbase.js'

export default () => async (req, res) => {
  const diag = await connect().diagnostics()
  const buckets = await connect().buckets().getAllBuckets()
  res.send({
    name: 'ibeacon API',
    version: getVersion(),
    couchbase: diag,
    buckets,
  })
}
