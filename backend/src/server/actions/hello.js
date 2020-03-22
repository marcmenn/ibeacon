import { getVersion } from '../../get-version.js'
import { json } from './json.js'
import wrapAsync from './wrap-async.js'

export default [json, wrapAsync(async (req, res) => {
  res.send({
    name: 'ibeacon API',
    version: getVersion(),
  })
})]
