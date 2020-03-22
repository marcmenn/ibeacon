import { getVersion } from '../../get-version.js'
import wrapAsync from './wrap-async.js'

export default wrapAsync(async (req, res) => {
  res.send({
    name: 'ibeacon API',
    version: getVersion(),
  })
})
