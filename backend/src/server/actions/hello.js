import { getVersion } from '../../get-version.js'

export default (req, res) => {
  res.send({
    name: 'ibeacon API',
    version: getVersion(),
  })
}
